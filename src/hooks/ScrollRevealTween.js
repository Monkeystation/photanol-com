import React, {useState, useEffect} from 'react'
import { Reveal, Tween } from 'react-gsap'
import ScrollAnimation from 'react-animate-on-scroll'

// Hook
export default function ScrollRevealTween({children, fade = true, reverse = false}) {

  const from = {
    transform: `translate3d(0, ${(reverse) ? '-50px' : '50px'}, 0)`,
    opacity: (fade) ? 0 : 1
  }
  
  return (
    <ScrollAnimation animateIn={(reverse) ? 'fadeInDown' : 'fadeInUp'} animateOnce={true}>
      {children}
    </ScrollAnimation>
  )
}