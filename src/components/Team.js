import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import {IconLinkedIn} from './Icons'
import Draggable from '../hooks/Draggable'
import isTouchDevice from '../hooks/isTouchDevice'
import { TweenLite, Power1 } from 'gsap/all'
import PreviewCompatibleFile from '../components/PreviewCompatibleFile'
import Cursor from '../components/Cursor'

const ITEM_WIDTH = 382
const ITEM_WIDTH_TABLET = 280

class Team extends React.Component {
  
  constructor(props) {
    super(props);
    var layout = []
    const nrOfItems = props.employees.length
    for (var i = 0; i < nrOfItems; i++) {
      layout.push({itemOpacity: 1, imageOpacity: 1, active: false})
    }
    
    this.state = {
      itemWidth: ITEM_WIDTH,
      position: 0,
      nrOfItems: nrOfItems, 
      layout: layout,
      activeItemId: 0,
      oldActiveItemId: 0,
      hideCursor: false
    };
  }
  
  onWindowResize = () => {
    if (window.innerWidth <= 768) {
      this.setState({itemWidth: ITEM_WIDTH_TABLET})
    } else {
      this.setState({itemWidth: ITEM_WIDTH})
    } 
    
    this.updateItems(this.state.position)
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize()
    
    const {itemWidth, nrOfItems} = this.state
    var sw = this.emRef.getBoundingClientRect().width
    var startPos = 0
    this.updateItems(startPos)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  handleClick = (offset) => {
    const {position, itemWidth, nrOfItems, activeItemId} = this.state
    var iol = this.itemsRef.offsetLeft
    var pos = -iol - position + offset
    var targetItemId = Math.floor(pos / itemWidth)
    targetItemId = Math.max(Math.min(targetItemId, (nrOfItems - 1)), 0)
    var target = -(targetItemId * itemWidth)
    
    var obj = {position: this.state.position}
    var dist = Math.abs(activeItemId - targetItemId)
    TweenLite.to(obj, (dist * 0.5), {position:target, ease: Power1.easeInOut, onUpdate:(el) => {
      this.updateItems(obj.position)
    }});
  }
  
  handleStart = () => {
    const {activeItemId} = this.state
    this.state.oldActiveItemId = activeItemId
  }
  
  handleDrag = (position) => {
    this.updateItems(position)
  }
  
  handleStop = (dir) => {
    const {itemWidth, nrOfItems, activeItemId, oldActiveItemId} = this.state
    var emw = this.emRef.getBoundingClientRect().width
    var targetItemId = activeItemId
    if (activeItemId === oldActiveItemId) {
      targetItemId = Math.max(Math.min((dir + activeItemId), (nrOfItems - 1)), 0)
    }
    var target = (targetItemId * itemWidth)
    var position = -target
    
    var obj = {position: this.state.position}
    TweenLite.to(obj, 0.5, {position:position, ease: Power1.easeInOut, onUpdate:(el) => {
      this.updateItems(obj.position)
    }});
  }
  
  updateItems = (position) => {
    if (!this.emRef) return
    const {itemWidth, nrOfItems, layout} = this.state
    var emw = this.emRef.getBoundingClientRect().width
    var activeItemId = null
    var scroll = position
    
    for (var i = 0; i < nrOfItems; i++) {
      var center = -((i * itemWidth))
      var dist = Math.abs(scroll - center)
      var pos = (scroll - center) / itemWidth
      if (pos < 0) {
        layout[i].itemOpacity = pos + 1
      } else {
        layout[i].itemOpacity = 1
      }
      
      if (dist < (itemWidth / 2)) {
        activeItemId = i
        var norm = (itemWidth / 2) - dist
        var scale = norm / (itemWidth / 2)
        if (scroll - center > 0) scale =  1
        layout[i].active = true
        layout[i].imageOpacity = scale
      } else {
        layout[i].active = false
        layout[i].imageOpacity = (activeItemId === null) ? 0 : 1
      }
    }
    if (activeItemId === null) {
      if (position > 0) {
        activeItemId = 0
        layout[0].active = true
        layout[0].itemOpacity = 1
        layout[0].imageOpacity = 1
      } else {
        var index = (nrOfItems - 1)
        activeItemId = index
        layout[index].active = true
        layout[index].itemOpacity = 1
        layout[index].imageOpacity = 1
      }
    }
    this.setState({position: position, layout: layout, activeItemId: activeItemId})
  }
  
  itemClick = (index) => {
    const {itemWidth} = this.state
    var emw = this.emRef.getBoundingClientRect().width
    var obj = {position: this.state.position}
    var target = -((index * itemWidth) + (itemWidth / 2)) + (emw / 2)
    TweenLite.to(obj, 0.5, {position:target, onUpdate:(el) => {
      this.updateItems(obj.position)
    }});
  }
  
  render() {
    const {employees} = this.props
    const {position, layout, hideCursor} = this.state  
    return (
      <div className="employees" ref={el => this.emRef = el}>
        {!isTouchDevice() && this.emRef && (<Cursor parent={this.emRef} hide={hideCursor} />)}
        <div className="images">
          {employees.map((employee, index) => (
            <div key={v4()} className="employee-image" style={{
              backgroundImage: `url(${PreviewCompatibleFile(employee.image)})`,
              opacity: layout[index].imageOpacity,
              zIndex: -index
              }} 
            />
          ))}
        </div>
        <div className="items-wrapper">
          <Draggable
              position={position}
              onClick={this.handleClick}
              onStart={this.handleStart}
              onDrag={this.handleDrag}
              onStop={this.handleStop}>
            <div className="items" ref={el => this.itemsRef = el}>
              {employees.map((employee, index) => (
                <div key={v4()} className="item" ref={el => this['item' + index] = el} style={{
                  opacity: layout[index].itemOpacity,
                }}>
                  <div className="item-content" id={"item" + index}>
                    <h3 className="title is-size-6 is-size-4-tablet is-size-4-desktop is-family-secondary white-text has-text-weight-bold pb-2">
                      {employee.name}
                    </h3>
                    <h5 className="subtitle is-size-7 is-size-6-tablet blue-300-text has-text-weight-bold">
                      {employee.function}
                    </h5>
                    <p className="white-text">{employee.text}</p>
                    <a 
                      href={employee.linkedin} 
                      onMouseDown={e => e.stopPropagation()} 
                      onTouchStart={e => e.stopPropagation()} 
                      onMouseEnter={() => this.setState({hideCursor: true})}
                      onMouseOut={() => this.setState({hideCursor: false})}
                      target="_blank" 
                      className="button-secondary is-white"
                    >
                      <span className="icon">
                        <IconLinkedIn />
                      </span>
                      <span>{'VIEW PROFILE'}</span>
                    </a>
                    <div className="gradient-box" />
                  </div>
                </div>
              ))}
            </div>
          </Draggable>
        </div>
      </div> 
    )
  }
}

Team.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      function: PropTypes.string,
      text: PropTypes.string,
      linkedin: PropTypes.string,
      image: PropTypes.object,
    })
  ),
}

export default Team
