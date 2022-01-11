import React from "react"

import { CardEffect, cards } from "../layout"
import { bond } from '../ui'
import { Model, S } from 'h2o-wave'

interface State {
  /** The class name. */
  cardClass?: S
  /** The title. */
  title?: S
  /** The subtitle, displayed below the title. */
  subtitle?: S
  zones?: S
}

export const View = bond(
  ({
    name,
    state,
    changed,
    getState,
    setState,
  }: Model<State> & { getState: any; setState: any }) => {
    const handleClick = () => {
        const { zones } = state
        const hidden = !!getState("hidden")
        if (zones) {
          for (const z in zones as any) {
            const zoneDOM: any = document.querySelector(
              'div[data-test="' + zones[z] + '"]'
            )
            //!hidden, since this is the old state, not updated yet
            zoneDOM.style.display = !hidden ? "none" : "flex"
          }
        }
        setState("hidden", !hidden)
      },
      render = () => {
        const { cardClass, title } = state
        const hidden = !!getState("hidden")
        return (
          <div
            data-test={name}
            className={
              "rie-wave-card rie-wave-card-section-header" +
              (cardClass ? " " + cardClass : "")
            }
          >
            <div className="rie-wave-section-header-title">{title}</div>
            <div
              className="rie-wave-section-header-button"
              onClick={handleClick}
            >
              {!hidden ? "—" : "+"}
            </div>
          </div>
        )
      }

    return { render, changed }
  }
)

cards.register("sectionheader", View, { effect: CardEffect.Transparent })
