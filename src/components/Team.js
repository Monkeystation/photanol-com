import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import {IconLinkedIn} from './Icons'
import Draggable from 'react-draggable'
import { TweenLite } from 'gsap/all'

const ITEM_WIDTH = 382

class Team extends React.Component {
  
  constructor(props) {
    super(props);
    var layout = []
    const nrOfItems = props.employees.length
    for (var i = 0; i < nrOfItems; i++) {
      layout.push({width: ITEM_WIDTH, itemOpacity: 1, imageOpacity: 0, active: false})
    }
    
    this.state = {
      position: 0,
      nrOfItems: nrOfItems, 
      layout: layout,
      tweenTarget: 0
    };
  }
  
  componentDidMount() {
    const {nrOfItems} = this.state
    var sw = this.emRef.getBoundingClientRect().width
    var startPos = (sw / 2) - (ITEM_WIDTH / 2)
    this.updateItems(startPos)
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
    const {nrOfItems, activeItemId} = this.state
    var emw = this.emRef.getBoundingClientRect().width
    var target = (activeItemId * ITEM_WIDTH) + (ITEM_WIDTH / 2)
    var position = -target + (emw / 2)
    
    var obj = {position: this.state.position}
    TweenLite.to(obj, 0.3, {position:position, onUpdate:(el) => {
      this.updateItems(obj.position)
    }});
  }
  
  updateItems = (position) => {
    if (!this.emRef) return
    const {nrOfItems, layout} = this.state
    var emw = this.emRef.getBoundingClientRect().width
    var activeItemId = null
    var scroll = position - (emw / 2)
    
    for (var i = 0; i < nrOfItems; i++) {
      var center = -((i * ITEM_WIDTH) + (ITEM_WIDTH / 2))
      var dist = Math.abs(scroll - center)
      var pos = (scroll - center) / ITEM_WIDTH
      if (pos < 0) {
        layout[i].itemOpacity = pos + 1
      } else {
        layout[i].itemOpacity = 1
      }
      
      if (dist < (ITEM_WIDTH / 2)) {
        activeItemId = i
        var norm = (ITEM_WIDTH / 2) - dist
        var scale = norm / (ITEM_WIDTH / 2)
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
    var emw = this.emRef.getBoundingClientRect().width
    var obj = {position: this.state.position}
    var target = -((index * ITEM_WIDTH) + (ITEM_WIDTH / 2)) + (emw / 2)
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
          <PreviewCompatibleImage 
            key={v4()}
            className='employee-image'
            imageInfo={{image: employee.employee_image, alt: '', style:{
            opacity: layout[index].imageOpacity}}}
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
                  <h3 className="is-size-3 is-family-secondary white-text has-text-weight-bold">
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
