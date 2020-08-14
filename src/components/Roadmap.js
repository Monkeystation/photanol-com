import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import PreviewCompatibleImage from './PreviewCompatibleImage'
//import Draggable from 'react-draggable'
import { TweenLite } from 'gsap/all'
import Draggable from '../hooks/Draggable'
import isTouchDevice from '../hooks/isTouchDevice'
import PreviewCompatibleFile from '../components/PreviewCompatibleFile'
import Cursor from '../components/Cursor'

const ITEM_WIDTH = 300
const ACTIVE_ITEM_WIDTH = 600
const ACTIVE_ITEM_SCALE = 2

class Roadmap extends React.Component {
  
  constructor(props) {
    super(props);
    var layout = []
    const nrOfItems = props.items.length
    for (var i = 0; i < nrOfItems; i++) {
      layout.push({width: ITEM_WIDTH, scale: 1, fade: 0, active: false, text: false})
    }
    
    this.state = {
      position: 0,
      nrOfItems: nrOfItems, 
      layout: layout,
      activeItemId: 0,
      oldActiveItemId: 0
    };
  }
  
  componentDidMount() {
    const {active} = this.props
    const {nrOfItems} = this.state
    var sw = this.tlRef.getBoundingClientRect().width
    var startPos = (sw / 2) - ((active - 1) * ITEM_WIDTH) - (ACTIVE_ITEM_WIDTH / 2)
    this.updateItems(startPos)
  }

  componentWillUnmount() {
  }
  
  handleClick = (offset) => {
    const {position} = this.state
  }
  
  handleStart = () => {
    const {activeItemId} = this.state
    this.setState({oldActiveItemId: activeItemId})
  }
  
  handleDrag = (position) => {
    this.updateItems(position)
  }
  
  handleStop = (dir) => {
    const {nrOfItems, activeItemId, oldActiveItemId} = this.state
    var tlw = this.tlRef.getBoundingClientRect().width
    var targetItemId = activeItemId
    if (activeItemId === oldActiveItemId) {
      targetItemId = Math.max(Math.min((dir + activeItemId), (nrOfItems - 1)), 0)
    }
    var target = (targetItemId * ITEM_WIDTH) + (ACTIVE_ITEM_WIDTH / 2)
    var position = -target + (tlw / 2)
    
    var obj = {position: this.state.position}
    TweenLite.to(obj, 0.5, {position:position, onUpdate:(el) => {
      this.updateItems(obj.position)
    }});
  }
  
  updateItems = (position) => {
    if (!this.tlRef) return
    const {nrOfItems, layout} = this.state
    var tlw = this.tlRef.getBoundingClientRect().width
    var activeItemId = null
    var scroll = position - (tlw / 2)
    
    for (var i = 0; i < nrOfItems; i++) {
      var center = -((i * ITEM_WIDTH) + (ACTIVE_ITEM_WIDTH / 2))
      var dist = Math.abs(scroll - center)
      if (dist < (ITEM_WIDTH / 2)) {
        activeItemId = i
        var norm = (ITEM_WIDTH / 2) - dist
        var scale = norm / (ITEM_WIDTH / 2)
        layout[i].width = ITEM_WIDTH + (scale * (ACTIVE_ITEM_WIDTH - ITEM_WIDTH)) + 'px'
        layout[i].scale = 1 + scale
        layout[i].active = true
        if (scale > .7) {
          layout[i].text = true
          layout[i].fade = (scale - .7) / .3
        } else {
          layout[i].text = false
          layout[i].fade = 0
        }
      } else {
        layout[i].width = ITEM_WIDTH + 'px'
        layout[i].scale = 1
        layout[i].active = false
        layout[i].text = false
        layout[i].fade = 0
      }
    }
    if (activeItemId === null) {
      activeItemId = (position > 0) ? 0 : (nrOfItems - 1)
    }
    this.setState({position: position, layout: layout, activeItemId: activeItemId})
  }
  
  itemClick = (index) => {
    var tlw = this.tlRef.getBoundingClientRect().width
    var obj = {position: this.state.position}
    var target = -((index * ITEM_WIDTH) + (ACTIVE_ITEM_WIDTH / 2)) + (tlw / 2)
    TweenLite.to(obj, 0.5, {position:target, onUpdate:(el) => {
      this.updateItems(obj.position)
    }});
  }
  
  render() {
    const {items} = this.props
    const {position, layout} = this.state        
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
            <div className="items">
              {items.map((item, index) => {
                var imageSize = (100 * layout[index].scale)
                return (
                  <div key={v4()} className="item" style={{width: layout[index].width}} id={"item" + index} ref={el => this['item' + index] = el} onClick={() => this.itemClick(index)}>
                    <div className="item-elements">
                      <div className="item-element-top">
                        <h4 className="white-text has-text-centered has-text-weight-bold item-title">
                          {item.title}
                        </h4>
                      </div>             
                      <div className="item-element-center item-images">
                        <img 
                          className="item-icon" 
                          style={{ width: imageSize, height: imageSize }} 
                          ref={el => this['itemImage' + index] = el} 
                          src={PreviewCompatibleFile(item.icon)} 
                        />
                        <img className="item-image" 
                          style={{
                            width: imageSize, height: imageSize,
                            opacity: layout[index].fade,              
                            }} 
                            ref={el => this['itemImage' + index] = el} 
                            src={PreviewCompatibleFile(item.image)}
                          />
                      </div>
                      <div className="item-element-bottom">
                        <h2 className="blue-300-text has-text-weight-bold has-text-centered item-year">
                          {item.year}
                        </h2>
                      </div>
                    </div>
                    <div className="item-text" style={{
                      display: (layout[index].text) ? 'block' : 'none',
                      opacity: layout[index].fade,
                      }}  ref={el => this['itemText' + index] = el}>
                      <p className="white-text">{item.text}</p>
                    </div>
                  </div>
                )}
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
      icon: PropTypes.object,
      image: PropTypes.object,
    })
  ),
}

export default Roadmap