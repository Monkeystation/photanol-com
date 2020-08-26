import React, {useState} from 'react'
import PropTypes from 'prop-types'

const MissionSection = ({ mission }) => {
  const [showMissionVideoModal, setShowMissionVideoModal] = useState(false)
  const [missionVideoUrl, setMissionVideoUrl] = useState(null)
  
  const onMissionVideoModalOpen = () => {
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("is-clipped")
    setMissionVideoUrl('https://www.youtube-nocookie.com/embed/' + mission.video_item.link)
    setShowMissionVideoModal(true)
  }
  
  const onMissionVideoModalClose = () => {
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("is-clipped")
    setTimeout(() => {setMissionVideoUrl(null)}, 500)
    setShowMissionVideoModal(false)
  }
  
  return (
    <section className="section mission">
      <div className="containert">
        <div className="columns">
          <div className="column is-12-mobile is-10-tablet is-12-desktop is-10-widescreen is-9-fullhd">      
            <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{mission.pretitle}</h5>
            <h1 className="title is-family-secondary has-text-weight-bold is-size-4-mobile is-size-3-tablet is-size-2-desktop is-size-1-fullhd">{mission.title}</h1>
            {/*<button className="button-primary" onClick={onMissionVideoModalOpen}>
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
            <iframe className="has-ratio" id="ytplayer" type="text/html" width="640" height="360" 
              src={missionVideoUrl} frameBorder="0"></iframe>
            {/*<YouTube className="has-ratio" videoId={mission.video_item.link} onReady={onMissionYoutubeReady} />*/}
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