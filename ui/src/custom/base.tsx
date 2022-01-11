import React from 'react'

export const base_render = (name, state, changed, contentDiv) => {
  const
    { cardClass, title, subtitle } = state,
    titleDiv = title?(<div className='rie-wave-title'>{title}</div>):null,
    subtitleDiv = subtitle?(<div className='rie-wave-subtitle'>{subtitle}</div>):null,
    headerDiv = (title || subtitle)?(<div className='rie-wave-card-header'>{titleDiv}{subtitleDiv}</div>):null,
    bodyDiv = contentDiv?(<div className={'rie-wave-card-body'}>{contentDiv}</div>):null

  return (
    <div data-test={name} className={'rie-wave-card'+(cardClass?(' '+cardClass):'')+(headerDiv?'':' rie-wave-card-no-header')}>
      {headerDiv}
      {bodyDiv}
    </div>
  )
}
