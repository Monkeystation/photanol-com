/* eslint-disable react/no-direct-mutation-state */
import React from 'react'
import PropTypes from 'prop-types'
import { TweenLite, Power1 } from 'gsap/all'
import Draggable from '../hooks/Draggable'
import isTouchDevice from '../hooks/isTouchDevice'
import Cursor from '../components/Cursor'
import RoadmapItem from './RoadmapItem'
import ReactGA from 'react-ga'

const ITEM_WIDTH = 300
const ACTIVE_ITEM_WIDTH = 600
const ITEM_WIDTH_MOBILE = 300
const ACTIVE_ITEM_WIDTH_MOBILE = 320

class Roadmap extends React.Component {
  
  constructor(props) {
    super(props);
    var layout = []
    const nrOfItems = props.items.length
    for (var i = 0; i < nrOfItems; i++) {
      layout.push({width: ITEM_WIDTH, scale: 1, fade: 0, active: false, text: false})
    }
    
    this.state = {
      isMobile: false,
      itemWidth: ITEM_WIDTH,
      activeItemWidth: ACTIVE_ITEM_WIDTH,
      position: 0,
      nrOfItems: nrOfItems, 
      layout: layout,
      activeItemId: 0,
      oldActiveItemId: 0
    };
  }
  
  onWindowResize = () => {
    if (window.innerWidth < 768) {
      this.state.isMobile = true
      this.state.itemWidth = ITEM_WIDTH_MOBILE
      this.state.activeItemWidth = ACTIVE_ITEM_WIDTH_MOBILE
    } else {
      this.state.isMobile = false
      this.state.itemWidth = ITEM_WIDTH
      this.state.activeItemWidth = ACTIVE_ITEM_WIDTH
    } 
    this.updateItems(this.state.position)
  }
  
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize);
    this.onWindowResize()
    
    const {active} = this.props
    const {itemWidth, activeItemWidth} = this.state
    var sw = this.tlRef.getBoundingClientRect().width
    var startPos = (sw / 2) - ((active - 1) * itemWidth) - (activeItemWidth / 2)
    this.updateItems(startPos)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active) {
      this.animateIn()
    }
  }

  animateIn() {
    const {active} = this.props
    const {itemWidth, activeItemWidth} = this.state
    var sw = this.tlRef.getBoundingClientRect().width
    var target = (sw / 2) - ((active - 1) * itemWidth) - (activeItemWidth / 2)
    var obj = {position: this.state.position}
    TweenLite.to(obj, 1, {position:target, ease: Power1.easeInOut, onUpdate:() => {
      this.updateItems(obj.position)
    }});
  }
  
  handleClick = (offset) => {
    const {itemWidth, activeItemWidth, position, nrOfItems, activeItemId} = this.state
    var iol = this.itemsRef.offsetLeft
    var click = -iol - position + offset
    var pos = 0
    var targetItemId = nrOfItems - 1
    for (var i = 0; i < nrOfItems; i++) {
      if  (i == activeItemId) pos += activeItemWidth
      else pos += itemWidth
      if (click < pos) {
        targetItemId = i
        break
      }
    }
    
    var tlw = this.tlRef.getBoundingClientRect().width
    var target = -((targetItemId * itemWidth) + (activeItemWidth / 2)) + (tlw / 2)
    
    var obj = {position: this.state.position}
    var dist = Math.abs(activeItemId - targetItemId)
    TweenLite.to(obj, (dist * 1), {position:target, ease: Power1.easeInOut, onUpdate:() => {
      this.updateItems(obj.position)
    }})
    
    const {items} = this.props
    ReactGA.event({ category: 'roadmap', action: 'view', label: items[targetItemId].title})
  }
  
  handleStart = () => {
    const {activeItemId} = this.state
    this.setState({oldActiveItemId: activeItemId})
  }
  
  handleDrag = (position) => {
    this.updateItems(position)
  }
  
  handleStop = (dir) => {
    const {itemWidth, activeItemWidth, nrOfItems, activeItemId, oldActiveItemId} = this.state
    var tlw = this.tlRef.getBoundingClientRect().width
    var targetItemId = activeItemId
    if (activeItemId === oldActiveItemId) {
      targetItemId = Math.max(Math.min((dir + activeItemId), (nrOfItems - 1)), 0)
    }
    var target = (targetItemId * itemWidth) + (activeItemWidth / 2)
    var position = -target + (tlw / 2)
    
    var obj = {position: this.state.position}
    TweenLite.to(obj, 0.5, {position:position, onUpdate:() => {
      this.updateItems(obj.position)
    }});
    
    const {items} = this.props
    ReactGA.event({ category: 'roadmap', action: 'view', label: items[targetItemId].title})
  }
  
  updateItems = (position) => {
    if (!this.tlRef) return
    const {isMobile, itemWidth, activeItemWidth, nrOfItems, layout} = this.state
    var tlw = this.tlRef.getBoundingClientRect().width
    var activeItemId = null
    var scroll = position - (tlw / 2)
    
    for (var i = 0; i < nrOfItems; i++) {
      var center = -((i * itemWidth) + (activeItemWidth / 2))
      var dist = Math.abs(scroll - center)
      if (dist < (itemWidth / 2)) {
        activeItemId = i
        var norm = (itemWidth / 2) - dist
        var scale = norm / (itemWidth / 2)
        layout[i].width = itemWidth + (scale * (activeItemWidth - itemWidth)) + 'px'
        layout[i].scale = 1 + scale
        layout[i].active = true
        layout[i].fade = (isMobile) ? ((scale * .8)  + .2) : ((scale - .7) / .3)
        layout[i].text = (scale > .7)
      } else {
        layout[i].width = itemWidth + 'px'
        layout[i].scale = 1
        layout[i].active = false
        layout[i].text = false
        layout[i].fade = (isMobile) ? 0.2 : 0
      }
    }
    if (activeItemId === null) {
      activeItemId = (position > 0) ? 0 : (nrOfItems - 1)
    }
    this.setState({position: position, layout: layout, activeItemId: activeItemId})
  }
  
  render() {
    const {items} = this.props
    const {isMobile, position, layout} = this.state   
    
    return (
      <div className="timeline" ref={el => this.tlRef = el}>
        {!isTouchDevice() && this.tlRef && (<Cursor parent={this.tlRef} />)}
        <div className="line" />
        <Draggable
          position={position}
          onClick={this.handleClick}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleStop}>
          <div className="items" ref={el => this.itemsRef = el}>
            {items.map((item, index) => 
              <RoadmapItem 
                isMobile={isMobile}
                key={index}
                index={index}
                width={layout[index].width}
                imageSize={100 * layout[index].scale}
                showText={layout[index].text}
                opacity={layout[index].fade}
                title={item.title}
                icon={item.icon} 
                image={item.image} 
                year={item.year} 
                text={item.text}
              />
            )} 
          </div>
        </Draggable>
      </div>
    )
  }
}

Roadmap.propTypes = {
  active: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
  ),
}

export default Roadmap