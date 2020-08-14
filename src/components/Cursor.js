import React, {useState, useEffect} from 'react'
import {IconArrow} from '../components/Icons'

// Hook
export default function Cursor({parent}) {
  const [position, setPosition] = useState({
    left: undefined,
    top: undefined,
  })
  const [display, setDisplay] = useState('none')
  const [opacity, setOpacity] = useState(0)
  const [scale, setScale] = useState(0)
  
  useEffect(() => {
    function handleMove(e) {
      setOpacity(1)
      setScale(1)
      setPosition({
        left: e.pageX - parent.offsetLeft,
        top: e.pageY - parent.offsetTop,
      });
    }
    
    function handleLeave(e) {
      setOpacity(0)
      setScale(0)
    }
    
    parent.addEventListener("mousemove", handleMove)
    parent.addEventListener("mouseleave", handleLeave)
    window.addEventListener("wheel", handleLeave)
    
    return () => {
      parent.removeEventListener("mousemove", handleMove)
      parent.removeEventListener("mouseleave", handleLeave)
      window.removeEventListener("wheel", handleLeave)
    }
  }, []);

  return (
    <div className="cursor" style={{
      left: position.left, 
      top: position.top,
      opacity: opacity,
      transform: `scale(${scale}) translate(-50%, -50%)`
    }}>
      <IconArrow />
      <span>Swipe</span>
    </div>
  );
}