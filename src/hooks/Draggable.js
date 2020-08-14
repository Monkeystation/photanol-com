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
    this.draggable.addEventListener("touchend", this.handleTouchEnd)
    this.draggable.addEventListener("mouseup", this.handleTouchEnd)
  }
  
  componentWillUnmount() {
    this.draggable.removeEventListener("touchstart", this.handleTouchStart, {passive: false})
    this.draggable.removeEventListener("mousedown", this.handleTouchStart)
    this.draggable.removeEventListener("touchend", this.handleTouchEnd)
    this.draggable.removeEventListener("mouseup", this.handleTouchEnd)
  }
  
  handleTouchStart = (e) => {
    //console.log('handleTouchStart', e.cancelable)
    const {position} = this.props
    var evt = (e.type === 'touchstart') ? e.changedTouches[0] : e
    
    this.setState({rel: { x: evt.clientX, y: evt.clientY}, startPos: position})
    this.draggable.addEventListener("touchmove", this.handleTouchMove, {passive: false})
    this.draggable.addEventListener("mousemove", this.handleTouchMove, {passive: false})
    this.props.onStart()
  }

  handleTouchMove = (e) => {
    const {rel, dragging, startPos} = this.state
    var evt = (e.type === 'touchmove') ? e.changedTouches[0] : e
    if (!dragging && Math.abs(evt.clientX - rel.x) < Math.abs(evt.clientY - rel.y)) {
      this.draggable.removeEventListener("touchmove", this.handleTouchMove, {passive: false})
      this.draggable.removeEventListener("mousemove", this.handleTouchMove, {passive: false})
      return
    }
    if (e.cancelable) e.preventDefault()
    var xPos = startPos + (evt.clientX - rel.x)
    this.setState({dragging: true})
    this.props.onDrag(xPos)
  }

  handleTouchEnd = (e) => {
    const {dragging, rel} = this.state
    var evt = (e.type === 'touchend') ? e.changedTouches[0] : e
    if (dragging && e.cancelable) e.preventDefault()
    var dif = (evt.clientX - rel.x)
    const dir = (dif > 0) ? -1 : (dif < 0) ? 1 : 0
    this.draggable.removeEventListener("touchmove", this.handleTouchMove, {passive: false})
    this.draggable.removeEventListener("mousemove", this.handleTouchMove, {passive: false})
    this.setState({dragging: false})
    this.props.onStop(dir)
  }
  
  render() {
    const {children, position} = this.props
    return (
      <div ref={el => this.draggable = el} style={{width: '100%', height: '100%'}}>
        {React.cloneElement(children, { 
          style: {transform: `translateX(${position}px)`}
        })}
      </div>
    )
  }
}

export default Draggable



/*

const ChildComponentWithRef = React.forwardRef((props, ref) =>
      React.cloneElement(children, {
        ...props,
        style: {transform: 'translateX(' + position + 'px)'},
        ref
      })
    );
    
    
export default function Draggable({position, onStart, onDrag, onStop, children}) {
  const draggable = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [rel, setRel] = useState({x: null, y: null})
  const [pos, setPos] = useState({x: 0, y: 0})

  useEffect(() => {
    const handleTouchStart = (e) => {
      var e = e.changedTouches[0]
      setRel({ x: e.clientX, y: e.clientY})
    }

    const handleTouchMove = (e) => {
      var evt = e.changedTouches[0]
      if (Math.abs(evt.clientX - rel.x) < Math.abs(evt.clientY - rel.y)) return
      e.preventDefault()
      var xPos = position.x + (evt.clientX - rel.x)
      setPos({x: xPos, y: 0})
      onDrag(e, {x: xPos, y: 0})
    }

    const handleTouchEnd = (e) => {
      console.log(rel);
    }
    console.log('add touch listeners');
    draggable.current.addEventListener("touchstart", handleTouchStart, {passive: true})
    draggable.current.addEventListener("touchmove", handleTouchMove)
    draggable.current.addEventListener("touchend", handleTouchEnd)

    return () => {
      draggable.current.removeEventListener("touchstart", handleTouchStart, {passive: true})
      draggable.current.removeEventListener("touchmove", handleTouchMove)
      draggable.current.removeEventListener("touchend", handleTouchEnd)
    }
  }, [rel, position, pos]);

  return (
    <div ref={draggable} style={{transform: `translateX(${pos.x}px)`}}>
     {children}
    </div>
  );
}
*/