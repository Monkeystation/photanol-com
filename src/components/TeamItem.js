import React from 'react'
import PropTypes from 'prop-types'
import {IconLinkedIn} from './Icons'

class TeamItem extends React.PureComponent {
  render() {
    const {opacity, index, employee, hideCursor, showCursor} = this.props
    return (
      <div className="item" style={{opacity: opacity}}>
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
            onMouseEnter={hideCursor}
            onMouseOut={showCursor}
            target="_blank" 
            className="button-secondary is-white" 
            rel="noreferrer"
          >
            <span className="icon">
              <IconLinkedIn />
            </span>
            <span>{'VIEW PROFILE'}</span>
          </a>
          <div className="gradient-box" />
        </div>
      </div>
    )  
  }
}

TeamItem.propTypes = {
  opacity: PropTypes.number,
  index: PropTypes.number,
  employee: PropTypes.shape({
    name: PropTypes.string,
    function: PropTypes.string,
    text: PropTypes.string,
    linkedin: PropTypes.string,
    image: PropTypes.object,
  }),
  hideCursor: PropTypes.func,
  showCursor: PropTypes.func,
}

export default TeamItem