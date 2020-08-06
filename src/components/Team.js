import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import {IconLinkedIn} from './Icons'
import Draggable from 'react-draggable'
import { TweenLite } from 'gsap/all'

const ITEM_WIDTH = 300

class Team extends React.Component {
  
  constructor(props) {
    super(props);
    var layout = []
    const nrOfItems = props.employees.length
    for (var i = 0; i < nrOfItems; i++) {
      layout.push({width: ITEM_WIDTH, scale: 1, fade: 0, active: false, text: false})
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
  
  updateItems = (position) => {
    
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
    const employee_image = employees[0].employee_image
    return (
      <div className="employees" ref={el => this.emRef = el}>
      <PreviewCompatibleImage 
        className='employee-image'
        imageInfo={{image: employee_image, alt: ''}} 
      />
      <div className="items-wrapper">
        <Draggable
            axis="x"
            position={{x: position, y: 0}}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
          <div className="items" ref={el => this.itemsRef = el}>
          {employees.map((employee, index) => (
              <div key={v4()} className="item" id={"item" + index} ref={el => this['item' + index] = el} onClick={() => this.itemClick(index)}>
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
