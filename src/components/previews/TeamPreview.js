/* eslint-disable react/no-direct-mutation-state */

import React from 'react'
import PropTypes from 'prop-types'
import showdown from 'showdown'
import Slider from 'react-slick'
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import {IconLinkedIn} from '../Icons'

const converter = new showdown.Converter()
converter.setOption('simpleLineBreaks', true)

class TeamPreview extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  render() {
    const {employees} = this.props
    const settings = {
      dots: true,
      centerMode: true,
      slidesToScroll: 1,
      variableWidth: true,
      infinite: false
    };
    
    return (
      <Slider {...settings}>
        {employees.map((employee, index) => (
          <div key={index} style={{width: '400px'}} className="p-2">
            <div className="is-flex has-background-primary p-2">
              <div>
                <PreviewCompatibleImage imageInfo={{ image: employee.image }}/>
              </div>
              <div className="ml-4">
                <h3 className="title is-size-6 is-size-4-tablet is-size-4-desktop is-family-secondary white-text has-text-weight-bold pb-2">
                  {employee.name}
                </h3>
                <h5 className="subtitle is-size-7 is-size-6-tablet blue-300-text has-text-weight-bold">
                  {employee.function}
                </h5>
                <p className="white-text pb-2">{employee.text}</p>
                <a 
                  href={employee.linkedin} 
                  target="_blank" 
                  className="button-secondary is-white" 
                  rel="noreferrer"
                >
                  <span className="icon">
                    <IconLinkedIn />
                  </span>
                  <span>{'VIEW PROFILE'}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    )
  }
}

TeamPreview.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      function: PropTypes.string,
      text: PropTypes.string,
      linkedin: PropTypes.string,
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
  ),
}

export default TeamPreview