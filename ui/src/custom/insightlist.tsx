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

  insights?: S
}

const field_closed_icon = (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.4572 8.55579C11.7435 8.26947 11.7435 7.74737 11.4572 7.46105L8.42565 4.42947C8.12249 4.12632 7.63407 4.12632 7.33091 4.42947C7.02775 4.73263 7.02775 5.22105 7.33091 5.52421L9.8067 8L7.33091 10.4758C7.17933 10.6274 7.09512 10.8295 7.09512 11.0316C7.09512 11.2337 7.17933 11.4358 7.33091 11.5874C7.63407 11.8905 8.12249 11.8905 8.42565 11.5874L11.4572 8.55579Z"
      fill="#B7B5DE"
    />
    <path
      d="M16.9478 8C16.9478 3.58737 13.3604 0 8.94775 0C4.53512 0 0.947754 3.58737 0.947754 8C0.947754 12.4126 4.53512 16 8.94775 16C13.3604 16 16.9478 12.4126 16.9478 8ZM2.49723 8C2.49723 4.44632 5.39407 1.54947 8.94775 1.54947C12.5014 1.54947 15.3983 4.44632 15.3983 8C15.3983 11.5537 12.5014 14.4505 8.94775 14.4505C5.39407 14.4505 2.49723 11.5537 2.49723 8Z"
      fill="#B7B5DE"
    />
  </svg>
)

const field_open_icon = (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.39196 10.5095C8.67828 10.7958 9.20039 10.7958 9.4867 10.5095L12.5183 7.47789C12.8214 7.17474 12.8214 6.68632 12.5183 6.38316C12.2151 6.08 11.7267 6.08 11.4235 6.38316L8.94775 8.85895L6.47196 6.38316C6.32039 6.23158 6.11828 6.14737 5.91617 6.14737C5.71407 6.14737 5.51196 6.23158 5.36039 6.38316C5.05723 6.68632 5.05723 7.17474 5.36039 7.47789L8.39196 10.5095Z"
      fill="#B7B5DE"
    />
    <path
      d="M8.94775 16C13.3604 16 16.9478 12.4126 16.9478 8C16.9478 3.58737 13.3604 0 8.94775 0C4.53512 0 0.947754 3.58737 0.947754 8C0.947754 12.4126 4.53512 16 8.94775 16ZM8.94775 1.54947C12.5014 1.54947 15.3983 4.44632 15.3983 8C15.3983 11.5537 12.5014 14.4505 8.94775 14.4505C5.39407 14.4505 2.49723 11.5537 2.49723 8C2.49723 4.44632 5.39407 1.54947 8.94775 1.54947Z"
      fill="#B7B5DE"
    />
  </svg>
)

const category_closed_icon = (
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

const category_open_icon = (
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
    const handleClick = (level, index) => {
        const hidden = !!getState("hidden_" + level + "_" + index)
        setState("hidden_" + level + "_" + index, !hidden)
      },
      render = () => {
        const { cardClass, title, subtitle, insights } = state,
          titleDiv = title ? (
            <div className="rie-wave-title">{title}</div>
          ) : null,
          subtitleDiv = subtitle ? (
            <div className="rie-wave-subtitle">{subtitle}</div>
          ) : null,
          headerDiv =
            title || subtitle ? (
              <div className="rie-wave-card-header">
                {titleDiv}
                {subtitleDiv}
              </div>
            ) : null

        //TODO: filtering
        const categoryDivs = []
        if(insights){
          for (const c in insights as any) {
          const group = insights[c]
          const fields = group["fields"]
          const hiddenGroup = getState("hidden_category_" + c) || !fields
          let bodyGroup = null
          if (!hiddenGroup) {
            const fieldDivs = []
            for (const f in fields) {
              const field = fields[f]
              const findings = field["findings"]
              const hiddenField =
                getState("hidden_field_" + c + "_" + f) || !findings
              let bodyField = null
              let markers = [] //TODO: count
              if (!hiddenField) {
                const findingDivs : JSX.Element[] = []
                const findingTypes = {}
                for (const fi in findings) {
                  const finding = findings[fi]
                  const details = finding["details"]
                  const hiddenFinding =
                    getState("hidden_finding_" + c + "_" + f + "_" + fi) ||
                    !details

                  console.log(c + "_" + f + "_" + fi)
                  console.log(details)
                  console.log(hiddenFinding)

                  let bodyFinding = null

                  if (!hiddenFinding) {
                    let d = 0
                    const detailDivs = details.map((detail) => (
                      <div className="rie-wave-insight-detail-content" key={d++}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: detail["content"],
                          }}
                        />
                      </div>
                    ))
                    bodyFinding = (
                      <div className="rie-wave-insight-finding-body">
                        {detailDivs}
                      </div>
                    )
                  }

                  const detailLink =
                    details != null ? (
                      <div
                        className="rie-wave-insight-finding-link"
                        onClick={() =>
                          handleClick("finding", c + "_" + f + "_" + fi)
                        }
                      >
                        {hiddenFinding ? "View Details" : "Hide Details"}
                      </div>
                    ) : null
                  const findingType = finding["type"].toLowerCase()
                  findingTypes[findingType] = 1
                  const findingDiv = (
                    <div className="rie-wave-insight-finding">
                      <div className="rie-wave-insight-header rie-wave-insight-finding-header">
                        <div
                          className={
                            "rie-wave-insight-finding-marker rie-wave-insight-finding-marker-" +
                            findingType
                          }
                        >
                          ●
                        </div>
                        <div
                          className="rie-wave-insight-finding-content"
                          dangerouslySetInnerHTML={{
                            __html: finding["content"],
                          }}
                        />
                        {detailLink}
                        <div
                          className={
                            "rie-wave-insight-finding-icon rie-wave-insight-finding-icon-" +
                            findingType
                          }
                        ></div>
                      </div>
                      {bodyFinding}
                    </div>
                  )
                  findingDivs.push( findingDiv )
                }
                bodyField = (
                  <div className="rie-wave-insight-field-body">
                    {findingDivs}
                  </div>
                )
                let d = 0
                markers = Object.keys(findingTypes).map((findingType) => (
                  <div
                    className={
                      "rie-wave-insight-finding-marker rie-wave-insight-finding-marker-" +
                      findingType
                    }
                    key={d++}
                  >
                    ●
                  </div>
                ))
              }
              fieldDivs.push(
                <div className="rie-wave-insight-field">
                  <div className="rie-wave-insight-header rie-wave-insight-field-header">
                    <div
                      className="rie-wave-insight-field-button"
                      onClick={() => handleClick("field", c + "_" + f)}
                    >
                      {!hiddenField ? field_open_icon : field_closed_icon}
                    </div>
                    <div className="rie-wave-insight-field-title">
                      {field["name"]}
                    </div>
                    <div className="rie-wave-insight-field-marker">
                      {markers}
                    </div>
                    <div className="rie-wave-insight-field-value">
                      { (field["score"] * 100).toFixed(1) }%
                    </div>
                  </div>
                  {bodyField}
                </div>
              )
            }
            bodyGroup = (
              <div className="rie-wave-insight-category-body">{fieldDivs}</div>
            )
          }
          categoryDivs.push(
            <div className="rie-wave-insight-category">
              <div className="rie-wave-insight-header rie-wave-insight-category-header">
                <div className="rie-wave-insight-category-title">
                  {group["category"]}
                </div>
                <div
                  className="rie-wave-insight-category-button"
                  onClick={() => handleClick("category", c)}
                >
                  {!hiddenGroup ? category_open_icon : category_closed_icon}
                </div>
              </div>
              {bodyGroup}
            </div>
          )
        }
        }

        const bodyDiv = (
          <div className={"rie-wave-card-body"}>{categoryDivs}</div>
        )

        return (
          <div
            data-test={name}
            className={
              "rie-wave-card rie-wave-card-insight" +
              (cardClass ? " " + cardClass : "") +
              (headerDiv ? "" : " rie-wave-card-no-header")
            }
          >
            {headerDiv}
            {bodyDiv}
          </div>
        )
      }

    return { render, changed }
  }
)

cards.register("insightlist", View, { effect: CardEffect.Transparent })
