import React from "react"

import { CardEffect, cards } from "../layout"
import { bond } from '../ui'
import { Model, S } from 'h2o-wave'

interface State {
  /** The class name. */
  cardClass?: S
  /** The recommendation content. */
  content?: S
}

const icon = (
  <svg width="17" height="24" viewBox="0 0 17 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.50009 0C3.81314 0 0 3.69397 0 8.23444C0 9.30615 0.236077 11.985 2.64505 14.1947C3.92844 15.3873 4.66446 17.0577 4.66446 18.7778C4.66446 19.166 4.98956 19.4813 5.39027 19.4813H11.6135C12.0144 19.4813 12.3393 19.1664 12.3393 18.7782C12.3393 17.0594 13.0755 15.3898 14.3567 14.1995C16.0614 12.6282 17 10.5099 17 8.23444C17.0002 3.69397 13.187 0 8.50009 0ZM13.3541 13.1825C11.9624 14.4754 11.0977 16.2283 10.9213 18.0751H9.50697L11.5209 12.2223C11.5946 12.0081 11.5576 11.7722 11.4211 11.5889C11.2848 11.4055 11.0656 11.2969 10.8323 11.2969H6.16787C5.93443 11.2969 5.71537 11.4055 5.5789 11.5889C5.44262 11.7722 5.40539 12.0079 5.4791 12.2223L7.49303 18.0751H6.08262C5.90646 16.2272 5.04135 14.4728 3.64643 13.1768C2.23111 11.8784 1.45162 10.1232 1.45162 8.23444C1.45162 4.46942 4.61361 1.40625 8.50009 1.40625C12.3866 1.40625 15.5486 4.46942 15.5486 8.23444C15.5486 10.121 14.7698 11.8777 13.3541 13.1825ZM8.50009 16.5546L7.17474 12.7031H9.82526L8.50009 16.5546Z" fill="#33CCA1"/>
    <path d="M10.8324 20.3344H6.16789C5.767 20.3344 5.44208 20.6492 5.44208 21.0375C5.44208 21.4259 5.767 21.7407 6.16789 21.7407H10.8324C11.2332 21.7407 11.5582 21.4259 11.5582 21.0375C11.5582 20.6492 11.2332 20.3344 10.8324 20.3344Z" fill="#33CCA1"/>
    <path d="M10.0549 22.5938H6.94506C6.54435 22.5938 6.21925 22.9085 6.21925 23.2969C6.21925 23.6852 6.54435 24 6.94506 24H10.0549C10.4558 24 10.7807 23.6852 10.7807 23.2969C10.7807 22.9085 10.4558 22.5938 10.0549 22.5938Z" fill="#33CCA1"/>
  </svg>
)

export const
  View = bond(({ name, state, changed }: Model<State>) => {

    const
      render = () => {
        const
          { cardClass, content } = state,
          bodyDiv = content?(<div className='rie-wave-card-content' dangerouslySetInnerHTML={{ __html: content }}></div>):null

        if(bodyDiv==null) return null

        return (
          <div data-test={name} className={'rie-wave-card rie-wave-card-recommendation rie-wave-card-no-header'+(cardClass?(' '+cardClass):'')}>
            <div className={'rie-wave-card-recommendation-icon'}>{icon}</div>
            {bodyDiv}
          </div>
        )
      }

    return { render, changed }
  })

cards.register('recommendation', View, { effect: CardEffect.Transparent })
