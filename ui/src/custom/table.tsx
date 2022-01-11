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
  cols?: S
  rows?: S
}

export const
  View = bond(({ name, state, changed }: Model<State>) => {

    const
      render = () => {
        const { rows, cols } = state

        const rowsHtml = []
        for(const r in rows as any){
          const row = rows[r]
          const colsHtml = []
          for(const c in cols as any){
            const col=cols[c]
            const entry = row[col.name]
            let rowHtml = null
            if(entry!=null){
              rowHtml = (entry.formatted!=null)?entry.formatted:entry.value
            }
            colsHtml.push(
              <td className={(col.className?(col.className+" "):"")+(entry.className?entry.className:"")}>
              {rowHtml}
              </td>
            )
          }
          rowsHtml.push(<tr>{colsHtml}</tr>)
        }
        const tableHtml = (<table><tbody>{rowsHtml}</tbody></table>)

        const bodyDiv = (
          <div className='rie-wave-card-content rie-wave-card-content-table'>
          {tableHtml}
          </div>
        )

        return base_render(name, state, changed, bodyDiv)
      }

    return { render, changed }
  })

cards.register('table', View, { effect: CardEffect.Transparent })
