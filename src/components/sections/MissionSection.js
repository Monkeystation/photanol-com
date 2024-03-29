/* eslint-env browser */
import React, {useState, useEffect, useCallback, useRef} from 'react'
import PropTypes from 'prop-types'
import ScrollAnimation from 'react-animate-on-scroll'


const MissionSection = ({ mission, preview }) => {
  const [showMissionVideoModal, setShowMissionVideoModal] = useState(false)
  const [hasVideo] = useState(null)
  const videoRef = useRef(null)
  
  // const onMissionVideoModalOpen = () => {
  //   var html = document.getElementsByTagName("html")[0];
  //   html.classList.add("is-clipped")
  //   setShowMissionVideoModal(true)
  //   ReactGA.modalview('/mission/mission-video')
  // }
  
  const onMissionVideoModalClose = () => {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("is-clipped")
    setShowMissionVideoModal(false)
    videoRef.current.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
  }
  
  useEffect(() => {
    //setTimeout(() => setHasVideo(true), 5000)
  }, [])
  
  const VideoElement = useCallback(() => {
    if (!hasVideo) return (null)
    return (
      <iframe ref={videoRef} title="Youtube Player" className="has-ratio" id="ytplayer" type="text/html" width="640" height="360" src={'https://www.youtube-nocookie.com/embed/' + mission.video_item.link + '?enablejsapi=1&version=3&playerapiid=ytplayer'} frameBorder="0" allowFullScreen></iframe> 
    )
  }, [hasVideo])
  
  return (
    <section className="section is-large mission">
      <div className="columns">
        <div className="column is-12-mobile is-10-tablet is-12-desktop is-10-widescreen is-9-fullhd">
          <ScrollAnimation animateIn='fadeInUp' animateOnce={true} initiallyVisible={preview}>
            <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{mission.pretitle}</h5>
          </ScrollAnimation>
          <ScrollAnimation animateIn='fadeInUp' delay={200} animateOnce={true} initiallyVisible={preview}>
            <h1 className="title is-family-secondary has-text-weight-bold is-size-4-mobile is-size-3-tablet is-size-2-desktop is-size-1-fullhd">{mission.title}</h1>
          </ScrollAnimation>
        </div>
      </div>
      <div>
        <div className="columns">
          {/*<button className="button-primary" onClick={onMissionVideoModalOpen}>
            <span className="icon">
              <IconPlay />
            </span>
            <span>{mission.video_item.label}</span>
          </button>*/}
        </div>
      </div>
      <div className={`modal ${showMissionVideoModal ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={onMissionVideoModalClose}></div>
        <div className="modal-content is-full">
          <figure className="image is-16by9">
            <VideoElement />
          </figure>
        </div>
        <button className="modal-close is-large" aria-label="close" onClick={onMissionVideoModalClose}></button>
      </div>
    </section>
  )
}

MissionSection.propTypes = {
  mission: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    video_item: PropTypes.object,
  }),
  preview: PropTypes.bool
}

export default MissionSection