import React from 'react'
import { Reveal, Tween } from 'react-gsap'

// Hook
export default function ScrollRevealTween({children}) {
    
  return (
    <Reveal repeat>
      <Tween from={{ opacity: 0, transform: 'translate3d(0, 100px, 0)' }} duration={.5} ease={"power1.out"}>
        {children}
      </Tween>
    </Reveal>
  )
}