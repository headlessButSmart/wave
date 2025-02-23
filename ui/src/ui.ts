// Copyright 2020 H2O.ai, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { B, box, boxed, ChangeSet, connect, disconnect, Dict, Disposable, on, Rec, S, U, Wave, WaveEvent, WaveEventType } from 'h2o-wave'
import * as React from 'react'

//
// React Component + Dataflow
//

interface Renderable {
  render(): JSX.Element
  init?(): void
  update?(): void
  updateProps?(prevProps, newProps): void
  dispose?(): void
}

export function bond<TProps, TState extends Renderable>(ctor: (props: TProps & { setState: any, getState: any }) => TState) {
  return class extends React.Component<TProps> {
    private readonly model: TState
    private readonly arrows: Disposable[]
    constructor(props: TProps) {
      super(props)

      //State access
      const getState = (name) => self.state[name]
      const setState = (name, value) => self.setState({ [name]: value })

      const
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        self = this,
        //Allow state access to model
        model = ctor({ ...props, getState, setState }),
        //model = ctor(props),
        arrows: Disposable[] = []

      Object.keys(model).forEach(k => {
        if (k === 'render' || k === 'dispose' || k === 'init' || k === 'update') return
        const v = (model as any)[k]
        if (boxed(v)) arrows.push(on(v, _ => self.setState({})))
      })

      this.model = model
      this.arrows = arrows
      this.state = {}
    }
    componentDidMount() {
      //Allow props in init
      if (this.model.init) this.model.init()
    }
    componentDidUpdate(prevProps) {
      if (this.model.update) this.model.update()
      if (this.model.updateProps) this.model.updateProps(prevProps, this.props)
    }
    componentWillUnmount() {
      if (this.model.dispose) this.model.dispose()
      for (const a of this.arrows) a.dispose()
    }
    render() {
      return this.model.render()
    }
  }
}

let _wave: Wave | null = null

const
  args: Rec = {},
  clearRec = (a: Rec) => {
    for (const k in a) delete a[k]
  },
  baseURL = (!(typeof document === 'undefined') ? document.getElementsByTagName('body')[0].getAttribute('data-base-url') : null) ?? '/',
  socketURL = baseURL + '_s/',
  uploadURL = baseURL + '_f/',
  authURL = baseURL + '_auth/login'

export const
  contentB = box<WaveEvent | null>(null),
  argsB = box<any>({}),
  busyB = box<B>(false),
  config = {
    username: '',
    editable: false,
  },
  jump = (key: any, value: any) => {
    if (value.startsWith('#')) {
      window.location.hash = value.substr(1)
      return
    }
    if (key) {
      wave.args[key] = value
    } else {
      wave.args[value] = true
    }
    wave.push()
  },
  debounce = (timeout: U, f: (...args: any[]) => void) => {
    let t: number | null = null
    return (...args: any[]) => {
      if (t) window.clearTimeout(t)
      t = window.setTimeout(() => { f(...args); t = null }, timeout)
    }
  },
  throttle = (timeout: U, f: (...args: any[]) => void) => {
    let wait = false
    return (...args: any[]) => {
      if (wait) return
      f(...args)
      wait = true
      window.setTimeout(() => { wait = false }, timeout)
    }
  },
  //Allow passing of custom server and route
  listen = (server:S, path: S, route:S, producer:S, data) => {
    _wave = connect(server, path, route, producer, data, e => {
      switch (e.t) {
        case WaveEventType.Page:
        case WaveEventType.Error:
        case WaveEventType.Exception:
        case WaveEventType.Disconnect:
          contentB(e)
          break
        case WaveEventType.Reset:
          window.location.reload()
          break
        case WaveEventType.Config:
          config.username = e.username
          config.editable = e.editable
          break
        case WaveEventType.Data:
          busyB(false)
          break
      }
    })
  },
  stop = () => {
    if (!_wave) return
    disconnect()
  },
  push = () => {
    if (!_wave) return

    // Unconditionally set location hash so that the app doesn't have to track changes.
    const h = window.location.hash
    if (h?.length > 1) args['#'] = h.substr(1)

    const d: Dict<any> = { ...args } // shallow clone
    clearRec(args) // clear
    _wave.push(d) // push clone
    busyB(true)
    argsB(d)
  },
  wave = { // Public API
    baseURL,
    socketURL,
    uploadURL,
    authURL,
    args,
    debounce,
    throttle,
    push,
    stop,
    fork: (): ChangeSet => {
      if (!_wave) throw new Error('not initialized')
      return _wave.fork()
    },
    emit: (source: S, name: S, data: any) => {
      const
        event: Dict<any> = {},
        events: Dict<any> = {}
      event[name] = data
      events[source] = event
      args[''] = events // '' is special-cased in clients
      push()
    }
  };

if(!(typeof window === 'undefined')) (window as any).wave = wave
