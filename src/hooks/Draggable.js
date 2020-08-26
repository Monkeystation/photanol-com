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
    this.draggable.addEventListener("mousedown", this.handleTouchStart, {passive: true})
    this.draggable.addEventListener("touchstart", this.handleTouchStart, {passive: true})
  }
  
  componentWillUnmount() {
    this.draggable.removeEventListener("mousedown", this.handleTouchStart, {passive: true})
    this.draggable.removeEventListener("touchstart", this.handleTouchStart, {passive: true})
  }
  
  handleTouchStart = (e) => {
    //console.log('handleTouchStart', e)
    const {position} = this.props
    var evt = (e.type === 'touchstart') ? e.changedTouches[0] : e
    
    this.setState({rel: { x: evt.clientX, y: evt.clientY}, startPos: position})
    this.addEventListeners()
    this.props.onStart()
  }

  handleTouchMove = (e) => {
    //console.log('handleTouchMove')
    const {rel, dragging, startPos} = this.state
    var evt = (e.type === 'touchmove') ? e.changedTouches[0] : e
    if (!dragging && Math.abs(evt.clientX - rel.x) < Math.abs(evt.clientY - rel.y)) {
      this.removeEventListeners()
      return
    }
    var xPos = startPos + (evt.clientX - rel.x)
    this.props.onDrag(xPos)
    this.setState({dragging: true})
  }

  handleTouchEnd = (e) => {
    //console.log('handleTouchEnd', e)
    const {rel} = this.state
    e.preventDefault()
    //if (dragging && e.cancelable) e.preventDefault()
    this.removeEventListeners()
    
    var evt = (e.type === 'touchend') ? e.changedTouches[0] : e
    var dif = (evt.clientX - rel.x)
    if (Math.abs(dif) < 25) {
      this.props.onClick(evt.clientX)
    } else {
      const dir = (dif > 0) ? -1 : (dif < 0) ? 1 : 0
      this.props.onStop(dir)
    }
    this.setState({dragging: false})
  }
  
  addEventListeners() {
    document.addEventListener("touchmove", this.handleTouchMove, {passive: true})
    document.addEventListener("mousemove", this.handleTouchMove, {passive: true})
    document.addEventListener("touchend", this.handleTouchEnd)
    document.addEventListener("mouseup", this.handleTouchEnd)
  }
  
  removeEventListeners() {
    document.removeEventListener("touchmove", this.handleTouchMove, {passive: true})
    document.removeEventListener("mousemove", this.handleTouchMove, {passive: true})
    document.removeEventListener("touchend", this.handleTouchEnd)
    document.removeEventListener("mouseup", this.handleTouchEnd)
  }
  
  render() {
    const {children, position} = this.props
    return (
      <div 
        ref={el => this.draggable = el} 
        //onTouchStart={this.handleTouchStart} 
        //onMouseDown={this.handleTouchStart} 
        style={{width: '100%', height: '100%', cursor: 'grab'}}
      >
        {React.cloneElement(children, { 
          style: {transform: `translateX(${position}px)`}
        })}
      </div>
    )
  }
}

export default Draggable