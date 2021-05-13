/* eslint-env browser */
import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import showdown from 'showdown'
import ReactGA from 'react-ga'
import ScrollAnimation from 'react-animate-on-scroll'

import {IconArrow} from '../Icons'

const converter = new showdown.Converter()
converter.setOption('simpleLineBreaks', true)

const VacanciesSection = ({ vacancies }) => {
  const [showVacancyModal, setShowVacancyModal] = useState(false)
  const [vacancyData, setVacancyData] = useState({})
  const modalContent = useRef(null)
  
  const onVacancyButtonClick = (vacancy) => {
    setVacancyData(vacancy)
    setShowVacancyModal(true)
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("is-clipped")
    window.location.hash = toSeoUrl(vacancy.title)
    ReactGA.modalview('/jobs/' + vacancy.title)
  }
  
  const onVacancyModalClose = () => {
    setShowVacancyModal(false)
    var element = document.getElementsByTagName("html")[0];
    element.classList.remove("is-clipped")
  }
  
  useEffect(() => {
    modalContent.current.scrollTo(0, 0)
  }, [vacancyData])
  
  useEffect(() => {
    vacancies.list.map((vacancy) => {
      var deeplink = toSeoUrl(vacancy.title)
      if(window.location.hash) {
        if (window.location.hash.includes(deeplink)) {
          setTimeout(() => {onVacancyButtonClick(vacancy)}, 500)
        }
      }
    })
  }, [])
  
  const toSeoUrl = (url) => {
    return url.toString()             // Convert to string
      .normalize('NFD')               // Change diacritics
      .replace(/[\u0300-\u036f]/g,'') // Remove illegal characters
      .replace(/\s+/g,'-')            // Change whitespace to dashes
      .toLowerCase()                  // Change to lowercase
      .replace(/&/g,'-and-')          // Replace ampersand
      .replace(/[^a-z0-9-]/g,'')     // Remove anything that is not a letter, number or dash
      .replace(/-+/g,'-')             // Remove duplicate dashes
      .replace(/^-*/,'')              // Remove starting dashes
      .replace(/-*$/,'');             // Remove trailing dashes
}
  
  const Vacancies = () => {
    if (vacancies.list.length == 0) {
      return (<div className="blue-text" dangerouslySetInnerHTML={{__html: converter.makeHtml(vacancies.novacancies)}}></div>)
    }
    return (
      <div className="tile is-parent is-vertical">
      {vacancies.list.map((vacancy) => {
        var deeplink = toSeoUrl(vacancy.title)
        return (
          <div key={v4()} className="vacancy-card tile is-child pb-3" id={deeplink}>
            <ScrollAnimation animateIn='fadeInUp' delay={200} animateOnce={true}>
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
              </ScrollAnimation>
          </div>
        )
      }
      )}
      </div>
    )
  }
  
  
  return (
    <section className="section vacancies-wrapper" id="jobs">
      <div className="content">
        <ScrollAnimation animateIn='fadeInUp' animateOnce={true}>
          <h5 className="subtitle green-text has-text-weight-bold is-uppercase is-7">{'VACANCIES'}</h5>
        </ScrollAnimation>
        <div className="vacancies">
          <Vacancies />
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
      </div>
    </section>
  )
}

VacanciesSection.propTypes = {
  vacancies: PropTypes.shape({
    novacancies: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        description_short: PropTypes.string,
        description_full: PropTypes.string,
      })
    ),
  }),
  preview: PropTypes.bool
}

export default VacanciesSection
