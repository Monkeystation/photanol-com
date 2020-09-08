import React, {useState, useEffect} from 'react'
import { Reveal, Tween } from 'react-gsap'

// Hook
export default function ScrollRevealTween({children, fade = true, reverse = false}) {

  const from = {
    transform: `translate3d(0, ${(reverse) ? '-50px' : '50px'}, 0)`,
    opacity: (fade) ? 0 : 1
  }
  
  return (
    <Reveal repeat>
      <Tween from={from} duration={1} ease={"power1.out"}>
        {children}
      </Tween>
    </Reveal>
  )
}