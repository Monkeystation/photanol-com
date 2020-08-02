import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import Img from "gatsby-image"

const Team = ({ employees }) => (
  <div className="employees">
    <Img className="employee-image" fluid={employees[0].employee_image.childImageSharp.fluid} alt="" />
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
          <button className="button">
            <span className="icon">
              <i className="fab fa-github"></i>
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
