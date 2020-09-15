import React from 'react'
import { withPrefix } from 'gatsby'

const LogoPhotanol = () => {
  
  return (
    <object id="logo-photanol" data={`${withPrefix('/')}img/logo-ani-web.svg`} type="image/svg+xml" />
  )
  
  /*
  return (
    <video id="logo-photanol" playsInline autoPlay muted>
      <source src={`${withPrefix('/')}img/logo-animation.mp4`} type="video/mp4" />
    </video>
  )
  */
}

export default LogoPhotanol
