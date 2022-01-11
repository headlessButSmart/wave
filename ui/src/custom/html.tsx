import React from 'react'
import { CardEffect, cards } from '../layout'
import { bond } from '../ui'
import { Model, S } from 'h2o-wave'

import {base_render} from './base'

interface State {
  /** The class name. */
  cardClass?: S
  /** The title. */
  title?: S
  /** The subtitle, displayed below the title. */
  subtitle?: S
  content?: S
}

export const
  View = bond(({ name, state, changed }: Model<State>) => {

    const
      render = () => {
        const
          { content } = state,
          bodyDiv = content?(<div className='rie-wave-card-content rie-wave-card-content-html' dangerouslySetInnerHTML={{ __html: content }}></div>):null

        return base_render(name, state, changed, bodyDiv)
      }

    return { render, changed }
  })

cards.register('html', View, { effect: CardEffect.Transparent })
