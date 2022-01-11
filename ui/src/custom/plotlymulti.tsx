import React from 'react'
import Plot from 'react-plotly.js'

import { CardEffect, cards } from '../layout'
import { bond } from '../ui'
import { Model, S } from 'h2o-wave'

import {base_render} from './base'

interface State {
  /** The class name. */
  cardClass?: S
  /** The title. */
  title?: S
  /** The subtitle, displayed below the title. Supports Markdown. */
  subtitle?: S
  figures?: Array<S>
  configs?: Array<S>
  annotations?: Array<S>
}

export const
  View = bond(({ name, state, changed }: Model<State>) => {

    const
      render = () => {
        const
          { figures, configs, annotations } = state

        const figureDivs=[]
        for(let i=0;i<figures.length;i++){
          const figure = figures[i],
            config = configs?configs[i]:null,
            annotation = annotations?annotations[i]:null,
            figureObj = figure?JSON.parse(figure):null,
            configObj = config?JSON.parse(config):null,
            annotationDiv = annotation?(<div className='rie-wave-plotly-annotation' style={ {width:'50%', height:'100%', float:'left'} } dangerouslySetInnerHTML={{ __html: annotation }} />):null

          figureDivs.push((
            <div className='rie-wave-plotly-row' style={ {width:'100%', height:''+(100/figures.length)+'%'} }>
              <Plot
                config={configObj}
                data={figureObj.data}
                layout={ {...figureObj.layout, autosize:true, height:null, width:null } }
                style={ {width:(annotation?'50%':'100%'), height:'100%', float:'left'} } useResizeHandler={true}
              />
              {annotationDiv}
            </div>
          ))

        }

          const bodyDiv = (figureDivs.length>0)?(
            <div className='rie-wave-card-content rie-wave-card-rows-content'>
            {figureDivs}
            </div>
          ):null

          return base_render(name, state, changed, bodyDiv)
      }
    return { render, changed }
  })

cards.register('plotlymulti', View, { effect: CardEffect.Transparent })
