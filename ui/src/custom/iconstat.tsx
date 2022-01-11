import React from 'react'
import { CardEffect, cards } from '../layout'
import { bond } from '../ui'
import { Model, S } from 'h2o-wave'

interface State {
  /** The class name. */
  cardClass?: S
  /** The title. */
  title?: S
  /** The subtitle, displayed below the title. Supports Markdown. */
  subtitle?: S

  /** SVG contents of an icon */
  icon?:S
  /** main value to display */
  value?: S
  /** trend value to display */
  trend?: number
}

export const
  View = bond(({ name, state, changed }: Model<State>) => {

    const
      render = () => {
        const
          { cardClass, title, subtitle, icon, value, trend } = state,
          titleDiv = title?(<div className='rie-wave-title'>{title}</div>):null,
          subtitleDiv = subtitle?(<div className='rie-wave-subtitle'>{subtitle}</div>):null,
          headerDiv = (title || subtitle)?(<div className='rie-wave-card-header'>{titleDiv}{subtitleDiv}</div>):null,
          iconDiv = icon?(<div className='rie-wave-stat-icon' dangerouslySetInnerHTML={{ __html: icon }}></div>):null,
          valueDiv = value?(<div className='rie-wave-stat-value'>{value}</div>):null,
          trendDiv = (trend != null && trend != undefined)?(<div className={'rie-wave-stat-trend '+(trend>0?'rie-wave-stat-trend-inc':(trend<0?'rie-wave-stat-trend-dec':'rie-wave-stat-trend-sta'))}>{trend*100}%</div>):null,
          bodyDiv = (valueDiv || trendDiv)?(<div className={'rie-wave-card-body'}>{valueDiv}{trendDiv}</div>):null

          return (
            <div data-test={name} className={'rie-wave-card rie-wave-stat-card'+(cardClass?(' '+cardClass):'')+(headerDiv?'':' rie-wave-card-no-header')}>
              <div className={'rie-wave-card-left'}>
                {iconDiv}
              </div>
              <div className={'rie-wave-card-right'}>
                {headerDiv}
                {bodyDiv}
              </div>
            </div>
          )
      }

    return { render, changed }
  })

cards.register('iconstat', View, { effect: CardEffect.Transparent })
