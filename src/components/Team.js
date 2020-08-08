import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import {IconLinkedIn} from './Icons'
import Draggable from 'react-draggable'
import { TweenLite } from 'gsap/all'

const ITEM_WIDTH = 382
const ITEM_WIDTH_TABLET = 280

class Team extends React.Component {
  
  constructor(props) {
    super(props);
    var layout = []
    const nrOfItems = props.employees.length
    for (var i = 0; i < nrOfItems; i++) {
      layout.push({itemOpacity: 1, imageOpacity: 0, active: false})
    }
    
    this.state = {
      itemWidth: ITEM_WIDTH,
      position: 0,
      nrOfItems: nrOfItems, 
      layout: layout,
      tweenTarget: 0
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
    var startPos = (sw / 2) - (itemWidth / 2)
    this.updateItems(startPos)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  
  handleStart = (e, data) => {
    console.log('handleStart', e, data)
  }
  
  handleDrag = (e, data) => {
    var scroll = data.x
    this.updateItems(scroll)
  }
  
  handleStop = (e, data) => {
    console.log('handleStop', e, data)
    const {itemWidth, nrOfItems, activeItemId} = this.state
    var emw = this.emRef.getBoundingClientRect().width
    var target = (activeItemId * itemWidth) + (itemWidth / 2)
    var position = -target + (emw / 2)
    
    var obj = {position: this.state.position}
    TweenLite.to(obj, 0.3, {position:position, onUpdate:(el) => {
      this.updateItems(obj.position)
    }});
  }
  
  updateItems = (position) => {
    if (!this.emRef) return
    const {itemWidth, nrOfItems, layout} = this.state
    var emw = this.emRef.getBoundingClientRect().width
    var activeItemId = null
    var scroll = position - (emw / 2)
    
    for (var i = 0; i < nrOfItems; i++) {
      var center = -((i * itemWidth) + (itemWidth / 2))
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
        layout[i].active = true
        layout[i].imageOpacity = scale
      } else {
        layout[i].active = false
        layout[i].imageOpacity = 0
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
    const {position, layout, tweenTarget} = this.state  
    return (
      <div className="employees" ref={el => this.emRef = el}>
      <div className="images">
        {employees.map((employee, index) => (
          <div key={v4()} className="employee-image" style={{
            backgroundImage: `url(${employee.employee_image.publicURL})`,
            opacity: layout[index].imageOpacity}} 
          />
        ))}
      </div>
      <div className="items-wrapper">
        <Draggable
            axis="x"
            position={{x: position, y: 0}}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
          <div className="items" ref={el => this.itemsRef = el}>
            {employees.map((employee, index) => (
              <div key={v4()} className="item" ref={el => this['item' + index] = el} style={{
                opacity: layout[index].itemOpacity,
              }}>
                <div className="item-content" id={"item" + index} onClick={() => this.itemClick(index)}>
                  <h3 className="is-size-4 is-size-3-desktop is-family-secondary white-text has-text-weight-bold">
                    {employee.employee_name}
                  </h3>
                  <h5 className="is-size-5 blue-300-text has-text-weight-bold pb-3">
                    {employee.employee_function}
                  </h5>
                  <p className="white-text pt-5">{employee.employee_text}</p>
                  <button className="button-secondary is-white">
                    <span className="icon">
                      <IconLinkedIn />
                    </span>
                    <span>{'VIEW PROFILE'}</span>
                  </button>
                </div>
              </div>
            )
          )}
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
      employee_name: PropTypes.string,
      employee_function: PropTypes.string,
      employee_text: PropTypes.string,
      employee_linkedin: PropTypes.string,
      employee_image: PropTypes.object,
    })
  ),
}

export default Team
