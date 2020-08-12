import React from 'react'
import { Reveal, Tween } from 'react-gsap'

// Hook
export default function ScrollRevealTween({children}) {
    
  return (
    <Reveal repeat>
      <Tween from={{ opacity: 0, paddingTop:100 }} duration={.5} ease={"power1.inOut"}>
        {children}
      </Tween>
    </Reveal>
  )
}