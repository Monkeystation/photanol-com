import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import Img from "gatsby-image"
import PreviewCompatibleImage from './PreviewCompatibleImage'
import {IconLinkedIn} from './Icons'

const Team = ({ employees }) => {
  const employee_image = employees[0].employee_image
  return (
    <div className="employees">
      <PreviewCompatibleImage 
        className='employee-image'
        imageInfo={{image: employee_image, alt: ''}} 
      />
      <div className="tile is-parent">
      {employees.map((employee) => {

        return (
          <div key={v4()} className="employee-card tile is-child is-4 has-background-primary">
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
      }
      )}
      </div>
    </div>
  )
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
