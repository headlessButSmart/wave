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

const section_closed_icon = (
  <svg
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.3765 0H4.51935C2.54788 0.00234375 0.950281 1.59994 0.947937 3.57141V16.4285C0.950281 18.4 2.54788 19.9976 4.51935 20H17.3765C19.348 19.9976 20.9456 18.4 20.9479 16.4285V3.57141C20.9456 1.59994 19.348 0.00234375 17.3765 0ZM19.5193 16.4285C19.5193 17.612 18.5599 18.5714 17.3765 18.5714H4.51935C3.33588 18.5714 2.37649 17.612 2.37649 16.4285V3.57141C2.37649 2.38794 3.33588 1.42856 4.51935 1.42856H17.3765C18.5599 1.42856 19.5193 2.38794 19.5193 3.57141V16.4285Z"
      fill="#B7B5DE"
    />
    <path
      d="M14.519 9.28568H11.6618V6.42853C11.6618 6.03403 11.342 5.71423 10.9475 5.71423C10.553 5.71423 10.2332 6.03403 10.2332 6.42853V9.28568H7.3761C6.9816 9.28568 6.6618 9.60548 6.6618 9.99998C6.6618 10.3945 6.9816 10.7142 7.3761 10.7142H10.2333V13.5714C10.2333 13.9659 10.5531 14.2857 10.9476 14.2857C11.3421 14.2857 11.6618 13.9658 11.6618 13.5714V10.7142H14.519C14.9135 10.7142 15.2333 10.3944 15.2333 9.99994C15.2333 9.60543 14.9134 9.28568 14.519 9.28568Z"
      fill="#B7B5DE"
    />
  </svg>
)

const section_open_icon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.2761 -0.05H3.72401C1.64299 -0.05 -0.049939 1.64297 -0.049939 3.72398V16.2761C-0.049939 18.357 1.64299 20.05 3.72401 20.05H16.2761C18.3571 20.05 20.0501 18.357 20.0501 16.2761V3.72398C20.0501 1.64297 18.3571 -0.05 16.2761 -0.05ZM18.7782 16.2761C18.7782 17.6556 17.6557 18.7781 16.2761 18.7781H3.72401C2.34439 18.7781 1.22194 17.6556 1.22194 16.2761V3.72398C1.22194 2.34437 2.34439 1.22187 3.72401 1.22187H16.2761C17.6557 1.22187 18.7782 2.34437 18.7782 3.72398V16.2761Z"
      fill="#B7B5DE"
      stroke="#B7B5DE"
      strokeWidth="0.1"
    />
    <path
      d="M15.4361 9.36406H4.56391C4.22308 9.36406 3.95 9.65062 3.95 10C3.95 10.3494 4.22308 10.6359 4.56391 10.6359H15.4361C15.7769 10.6359 16.05 10.3494 16.05 10C16.05 9.65062 15.777 9.36406 15.4361 9.36406Z"
      fill="#B7B5DE"
      stroke="#B7B5DE"
      strokeWidth="0.1"
    />
  </svg>
)


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
              {!hidden ? section_open_icon : section_closed_icon}
            </div>
          </div>
        )
      }

    return { render, changed }
  }
)

cards.register("sectionheader", View, { effect: CardEffect.Transparent })
