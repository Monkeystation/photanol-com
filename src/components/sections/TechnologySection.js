/* eslint-env browser */
import React, {useState, useEffect, useCallback, useRef} from 'react'
import PropTypes from 'prop-types'
import ScrollAnimation from 'react-animate-on-scroll'
import {IconPlay} from '../Icons'
import ReactGA from 'react-ga'
import HTMLContent from '../HTMLContent'

const TechnologySection = ({ technology, preview }) => {
  const [showBrandVideoModal, setShowBrandVideoModal] = useState(false)
  const [hasVideo] = useState(true)
  const videoRef = useRef(null)
  
  const onBrandVideoModalOpen = () => {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("is-clipped")
    setShowBrandVideoModal(true)
    ReactGA.modalview('/technology/brand-video')
  }
  
  const onBrandVideoModalClose = () => {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("is-clipped")
    setShowBrandVideoModal(false)
    videoRef.current.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
  }
  
  useEffect(() => {
    //setTimeout(() => setHasVideo(true), 5000)
  }, [])
  
  const VideoElement = useCallback(() => {
    if (!hasVideo) return (null)
    return (
      <iframe ref={videoRef} title="Youtube Player" className="has-ratio" id="ytplayer" type="text/html" width="500" height="208" src={'https://www.youtube-nocookie.com/embed/' + technology.video_item.link + '?enablejsapi=1&version=3&&rel=0&playerapiid=ytplayer'} frameBorder="0" allowFullScreen></iframe> 
    )
  }, [hasVideo])
  
  return (
    <section className="section technology" id="technology">
      <div className="columns">
          <div className="column is-12 is-8-fullhd is-offset-2-fullhd">
            <ScrollAnimation animateIn='fadeInUp' animateOnce={true} initiallyVisible={preview}>
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{technology.pretitle}</h5>
            </ScrollAnimation>
            <ScrollAnimation animateIn='fadeInUp' delay={200} animateOnce={true} initiallyVisible={preview}>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{technology.title}</h1>
            </ScrollAnimation>
          </div>
        </div>
        <div className="columns">
          <div className="column is-12 is-8-widescreen is-offset-2-fullhd text-columns">
            <HTMLContent className="blue-text technology-text" content={technology.text} />
            <button className="button-primary mt-4" onClick={onBrandVideoModalOpen}>
              <span className="icon">
                <IconPlay />
              </span>
              <span>{technology.video_item.label}</span>
            </button>
          </div>
          <div className={`modal ${showBrandVideoModal ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={onBrandVideoModalClose}></div>
            <div className="modal-content is-full">
              <figure className="image is-cinemascope">
                <VideoElement />
              </figure>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onBrandVideoModalClose}></button>
          </div>
        </div>
    </section>
  )
}

TechnologySection.propTypes = {
  technology: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    video_item: PropTypes.object,
  }),
  preview: PropTypes.bool
}

export default TechnologySection