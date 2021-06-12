/* eslint-env browser */
import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {IconArrow} from '../components/Icons'

// Hook
export default function Cursor({parent, hide}) {
  const [position, setPosition] = useState({
    left: undefined,
    top: undefined,
  })
  const [opacity, setOpacity] = useState(0)
  const [scale, setScale] = useState(0)
  
  useEffect(() => {
    function handleMove(e) {
      if (hide) {
        setOpacity(0)
        setScale(0)
        return
      }
      setOpacity(1)
      setScale(1)
      setPosition({
        left: e.pageX - parent.offsetLeft,
        top: e.pageY - parent.offsetTop,
      });
    }
    
    function handleLeave() {
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
  }, [parent, hide]);
  
  
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

Cursor.propTypes = {
  parent: PropTypes.object,
  hide: PropTypes.bool
}