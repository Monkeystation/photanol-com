import React  from 'react'

class Draggable extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      dragging: false,
      rel: {x: null, y: null}, 
      startPos: props.position,
    };
  }
  
  componentDidMount() {
    this.draggable.addEventListener("touchstart", this.handleTouchStart, {passive: false})
    this.draggable.addEventListener("mousedown", this.handleTouchStart)
  }
  
  componentWillUnmount() {
    this.draggable.removeEventListener("touchstart", this.handleTouchStart, {passive: false})
    this.draggable.removeEventListener("mousedown", this.handleTouchStart)
    document.removeEventListener("touchend", this.handleTouchEnd)
    document.removeEventListener("mouseup", this.handleTouchEnd)
  }
  
  handleTouchStart = (e) => {
    //console.log('handleTouchStart', e.cancelable)
    const {position} = this.props
    var evt = (e.type === 'touchstart') ? e.changedTouches[0] : e
    
    this.setState({rel: { x: evt.clientX, y: evt.clientY}, startPos: position})
    document.addEventListener("touchmove", this.handleTouchMove, {passive: false})
    document.addEventListener("mousemove", this.handleTouchMove, {passive: false})
    document.addEventListener("touchend", this.handleTouchEnd)
    document.addEventListener("mouseup", this.handleTouchEnd)
    this.props.onStart()
  }

  handleTouchMove = (e) => {
    const {rel, dragging, startPos} = this.state
    var evt = (e.type === 'touchmove') ? e.changedTouches[0] : e
    if (!dragging && Math.abs(evt.clientX - rel.x) < Math.abs(evt.clientY - rel.y)) {
      document.removeEventListener("touchmove", this.handleTouchMove, {passive: false})
      document.removeEventListener("mousemove", this.handleTouchMove, {passive: false})
      return
    }
    if (e.cancelable) e.preventDefault()
    var xPos = startPos + (evt.clientX - rel.x)
    this.props.onDrag(xPos)
    this.setState({dragging: true})
  }

  handleTouchEnd = (e) => {
    const {dragging, rel} = this.state
    const {position} = this.props
    if (dragging && e.cancelable) e.preventDefault()
    document.removeEventListener("touchmove", this.handleTouchMove, {passive: false})
    document.removeEventListener("mousemove", this.handleTouchMove, {passive: false})
    document.removeEventListener("touchend", this.handleTouchEnd)
    document.removeEventListener("mouseup", this.handleTouchEnd)
    
    var evt = (e.type === 'touchend') ? e.changedTouches[0] : e
    var dif = (evt.clientX - rel.x)
    if (Math.abs(dif) < 5) {
      this.props.onClick(e.offsetX)
    } else {
      const dir = (dif > 0) ? -1 : (dif < 0) ? 1 : 0
      this.props.onStop(dir)
    }
    this.setState({dragging: false})
  }
  
  render() {
    const {children, position} = this.props
    return (
      <div ref={el => this.draggable = el} style={{width: '100%', height: '100%', cursor: 'grab'}}>
        {React.cloneElement(children, { 
          style: {transform: `translateX(${position}px)`}
        })}
      </div>
    )
  }
}

export default Draggable