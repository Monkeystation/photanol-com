import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import {IconArrow} from './Icons'
import showdown from 'showdown'

const converter = new showdown.Converter()
converter.setOption('simpleLineBreaks', true)

const Vacancies = ({ vacancies }) => {
  const [showVacancyModal, setShowVacancyModal] = useState(false)
  const [vacancyData, setVacancyData] = useState({})
  const modalContent = useRef(null)
  
  const onVacancyButtonClick = (vacancy) => {
    setVacancyData(vacancy)
    setShowVacancyModal(true)
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("is-clipped")
  }
  
  const onVacancyModalClose = () => {
    setShowVacancyModal(false)
    var element = document.getElementsByTagName("html")[0];
    element.classList.remove("is-clipped")
  }
  
  useEffect(() => {
    modalContent.current.scrollTo(0, 0)
  }, [vacancyData])
  
  return (
    <div className="vacancies">
      <div className="tile is-parent is-vertical">
      {vacancies.map((vacancy) => {
        return (
          <div key={v4()} className="vacancy-card tile is-child pb-3">
            <p className="blue-text has-text-weight-bold">
              {vacancy.title}
            </p>
            <p className="blue-text py-3">
              {vacancy.description_short}
            </p>
            <button className="button-secondary is-grey" onClick={() => onVacancyButtonClick(vacancy)}>
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
      <div className={`modal ${showVacancyModal ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={onVacancyModalClose}></div>
        <div className="modal-content" ref={modalContent}>
          <div className="box">
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-4">{vacancyData.title}</h1>
            <div className="vacancy-body blue-text" dangerouslySetInnerHTML={{__html: converter.makeHtml(vacancyData.description_full)}}></div>
          </div>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={onVacancyModalClose}></button>
      </div>
    </div>
  )
}

Vacancies.propTypes = {
  vacancies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description_short: PropTypes.string,
      description_full: PropTypes.string,
    })
  ),
}

export default Vacancies
