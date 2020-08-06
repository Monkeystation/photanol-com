import React from 'react'
import { v4 } from 'uuid'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Draggable from 'react-draggable'

const ITEM_WIDTH = 300
const ACTIVE_ITEM_WIDTH = 600
const ACTIVE_ITEM_SCALE = 2

class Timeline extends React.Component {
  timer = null
  
  constructor(props) {
    super(props);
    console.log(props.items[0])
    this.state = {
      nrOfItems: props.items.length, 
      activeItemWidth: 0, 
      activeItemScale: 2, 
      timelineWidth: 0, 
    };
    
  }
  
  componentDidMount() {
    const {nrOfItems} = this.state
    var sw = this.tlRef.getBoundingClientRect().width
    var width = ((nrOfItems - 1) * ITEM_WIDTH) + sw
    this.itemsRef.style.width = width + 'px'
    setTimeout(() => this.onScroll(), 100)
    this.onScroll()
  }

  componentWillUnmount() {
  }
  
  onScroll = () => {
    const {nrOfItems} = this.state
    var sw = this.tlRef.getBoundingClientRect().width
    var scroll = this.tlRef.scrollLeft
    
    for (var i = 0; i < nrOfItems; i++) {
      var rect = this['item' + i].getBoundingClientRect()
      var center = rect.x + (rect.width / 2)
      var offset = Math.abs(center - (sw / 2))
      console.log(offset, (ITEM_WIDTH / 2))
      if (offset < (ITEM_WIDTH / 2)) {
        var norm = (ITEM_WIDTH / 2) - offset
        var scale = norm / (ITEM_WIDTH / 2)
        this['item' + i].style.width = ITEM_WIDTH + (scale * (ACTIVE_ITEM_WIDTH - ITEM_WIDTH)) + 'px'
        this['itemImage' + i].style.zoom = 1 + scale
        this['itemText' + i].style.display = (scale > .6) ? 'block' : 'none'
        break;
      } else {
        this['item' + i].style.width = ITEM_WIDTH + 'px'
        this['itemImage' + i].style.zoom = 1
        this['itemText' + i].style.display = 'none'
      }
    }
    
    if(this.timer !== null) clearTimeout(this.timer)
    this.timer = setTimeout(() => this.onScrollStop(), 150)
    
  }
  
  onScrollStop = () => {
    console.log(this.state)
    const {nrOfItems} = this.state
    var sw = this.tlRef.getBoundingClientRect().width
    
    for (var i = 0; i < nrOfItems; i++) {
      var rect = this['item' + i].getBoundingClientRect()
      var center = rect.x + (rect.width / 2)
      var offset = Math.abs(center - (sw / 2))
      if (offset < (ITEM_WIDTH / 2)) {
        console.log('scroll')
        this.tlRef.scrollTo(-(center - (sw / 2)), 0)
        break;
      }
    }
  }
  
  /*
  <PreviewCompatibleImage 
                ref={el => this['itemImage' + index] = el}
                className="item-image"
                imageInfo={{image: item.roadmap_item_icon, alt: '', className: 'item-image'}} 
              />
              */
  render() {
    const {items} = this.props
    
    return (
      <div className="timeline" onScroll={this.onScroll} ref={el => this.tlRef = el}>
        <Draggable
          axis="x">
        <div className="items" ref={el => this.itemsRef = el}>
          {items.map((item, index) => (
            <div key={v4()} className="item" ref={el => this['item' + index] = el}>
              <div className="item-elements">
                <h4 className="white-text has-text-centered has-text-weight-bold item-title">
                  {item.roadmap_item_title}
                </h4>
                <img className="item-image" ref={el => this['itemImage' + index] = el} src={item.roadmap_item_icon.publicURL} />
                <h2 className="blue-300-text has-text-weight-bold has-text-centered item-year">
                  {item.roadmap_item_year}
                </h2>
              </div>
              <div className="item-text" ref={el => this['itemText' + index] = el}>
                <p className="white-text">{item.roadmap_item_text}</p>
              </div>
            </div>
          ))}
        </div>
        </Draggable>
      </div>
    )
  }
}

export default Timeline