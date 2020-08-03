import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import {IconArrow} from '../img/icons/Icons'

const Vacancies = ({ vacancies }) => (
  <div className="vacancies">
    <div className="tile is-parent is-vertical">
    {vacancies.map((vacancy) => {
      return (
        <div key={v4()} className="vacancy-card tile is-child pb-3">
          <p className="blue-text has-text-weight-bold">
            {vacancy.vacancy_title}
          </p>
          <p className="blue-text py-5">
            {vacancy.vacancy_description_short}
          </p>
          <button className="button-secondary is-grey">
            <span>{'VIEW VACANCY'}</span>
            <span className="icon">
              <IconArrow />
            </span>
          </button>
        </div>
      )
    }
    )}
    </div>
  </div>
)

Vacancies.propTypes = {
  vacancies: PropTypes.arrayOf(
    PropTypes.shape({
      vacancy_title: PropTypes.string,
      vacancy_description_short: PropTypes.string,
      vacancy_description_full: PropTypes.string,
    })
  ),
}

export default Vacancies
