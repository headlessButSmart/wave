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
  figure?: S
  config?: S
  annotation?: S
  annotationOn?: S
}

export const
  View = bond(({ name, state, changed }: Model<State>) => {

    const
      render = () => {
        const
          { figure, config, annotation, annotationOn } = state,
          figureObj = figure?JSON.parse(figure):null,
          configObj = config?JSON.parse(config):null,
          annotationDiv = annotation?(
            <div className='rie-wave-plotly-annotation' dangerouslySetInnerHTML={{ __html: annotation }} />
          ):null,
          bodyDiv = figure?(
            <div className={'rie-wave-card-content rie-wave-plotly-'+(annotation?('annotated rie-wave-plotly-annotation-'+(annotationOn || 'right')):'single')}>
              <div className='rie-wave-plotly-plot'>
                <Plot
                  config={configObj}
                  data={figureObj.data}
                  layout={ {...figureObj.layout, autosize:true, height:null, width:null } }
                  style={{ width:'100%', height:'100%' }}
                  useResizeHandler={true}
                />
              </div>
              {annotationDiv}
            </div>
          ):null

          return base_render(name, state, changed, bodyDiv)
      }
    return { render, changed }
  })

cards.register('plotly', View, { effect: CardEffect.Transparent })
