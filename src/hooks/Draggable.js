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
    this.addEventListeners(true, false, false)
  }
  
  componentWillUnmount() {
    this.removeEventListeners()
  }
  
  handleTouchStart = (e) => {
    //console.log('handleTouchStart')
    const {position} = this.props
    var evt = (e.type === 'touchstart') ? e.changedTouches[0] : e
    
    this.setState({rel: { x: evt.clientX, y: evt.clientY}, startPos: position})
    this.addEventListeners(false, true, true)
    this.props.onStart()
  }

  handleTouchMove = (e) => {
    //console.log('handleTouchMove')
    const {rel, dragging, startPos} = this.state
    var evt = (e.type === 'touchmove') ? e.changedTouches[0] : e
    if (!dragging && Math.abs(evt.clientX - rel.x) < Math.abs(evt.clientY - rel.y)) {
      this.removeEventListeners(false, true, true)
      return
    }
    if (e.cancelable) e.preventDefault()
    var xPos = startPos + (evt.clientX - rel.x)
    this.props.onDrag(xPos)
    this.setState({dragging: true})
  }

  handleTouchEnd = (e) => {
    //console.log('handleTouchEnd', this.state)
    const {dragging, rel} = this.state
    const {position} = this.props
    if (dragging && e.cancelable) e.preventDefault()
    this.removeEventListeners(false, true, true)
    
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
  
  addEventListeners(start = true, move = true, end = true) {
    if (start) {
      this.draggable.addEventListener("touchstart", this.handleTouchStart, {passive: true})
      this.draggable.addEventListener("mousedown", this.handleTouchStart)
    }
    if (move) {
      document.addEventListener("touchmove", this.handleTouchMove, {passive: true})
      document.addEventListener("mousemove", this.handleTouchMove, {passive: true})
    }
    if (end) {
      document.addEventListener("touchend", this.handleTouchEnd)
      document.addEventListener("mouseup", this.handleTouchEnd)
    }
  }
  
  removeEventListeners(start = true, move = true, end = true) {
    if (start) {
      this.draggable.removeEventListener("touchstart", this.handleTouchStart, {passive: false})
      this.draggable.removeEventListener("mousedown", this.handleTouchStart)
    }
    if (move) {
      document.removeEventListener("touchmove", this.handleTouchMove, {passive: true})
      document.removeEventListener("mousemove", this.handleTouchMove, {passive: true})
    }
    if (end) {
      document.removeEventListener("touchend", this.handleTouchEnd)
      document.removeEventListener("mouseup", this.handleTouchEnd)
    }
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