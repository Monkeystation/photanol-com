import React, {useState} from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'

const MissionSection = ({ mission }) => {
  const [showMissionVideoModal, setShowMissionVideoModal] = useState(false)
  const [missionVideoPlayer, setMissionVideoPlayer] = useState(null)
  
  const onMissionYoutubeReady = (event) => {
    setMissionVideoPlayer(event.target)
  }
  
  const onMissionVideoModalOpen = () => {
    setShowMissionVideoModal(true)
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("is-clipped")
  }
  
  const onMissionVideoModalClose = () => {
    if (missionVideoPlayer) missionVideoPlayer.stopVideo()
    setShowMissionVideoModal(false)
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("is-clipped")
  }
  
  return (
    <section className="section mission">
      <div className="container">
        <div className="columns">
          <div className="column is-12-mobile is-10-tablet">      
            <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{mission.pretitle}</h5>
            <h1 className="title is-family-secondary has-text-weight-bold is-size-4-mobile is-size-3-tablet is-size-2-desktop is-size-1-fullhd">{mission.title}</h1>
            {/* <button className="button-primary" onClick={onMissionVideoModalOpen}>
              <span className="icon">
                <IconPlay />
              </span>
              <span>{mission.video_item.label}</span>
            </button>*/}
          </div>
        </div>
      </div>
      <div className={`modal ${showMissionVideoModal ? 'is-active' : ''}`}>
        <div className="modal-background" onClick={onMissionVideoModalClose}></div>
        <div className="modal-content is-full">
          <figure className="image is-16by9">
            <YouTube className="has-ratio" videoId={mission.video_item.link} onReady={onMissionYoutubeReady} />
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
  })
}

export default MissionSection
/*

import React from 'react'
import PropTypes from 'prop-types'

const Mission = ({ mission }) => (
  
)

MissionSection.propTypes = {

}

export default Mission

*/