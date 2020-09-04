import React from 'react'
import { withPrefix } from 'gatsby'

const LogoPhotanol = () => {

  return (
    <video id="logo-photanol" playsInline autoPlay muted>
      <source src={`${withPrefix('/')}img/logo-animation.mp4`} type="video/mp4" />
    </video>
  )
}

export default LogoPhotanol
