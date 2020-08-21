import React, {useState} from 'react'
import YouTube from 'react-youtube'
import PropTypes from 'prop-types'
import showdown from 'showdown'
import ScrollRevealTween from '../hooks/ScrollRevealTween'
import {IconPlay} from '../components/Icons'


const converter = new showdown.Converter()
converter.setOption('simpleLineBreaks', true)

const TechnologySection = ({ technology }) => {
  const [showBrandVideoModal, setShowBrandVideoModal] = useState(false)
  const [brandVideoPlayer, setBrandVideoPlayer] = useState(null)
  
  const onBrandYoutubeReady = (event) => {
    setBrandVideoPlayer(event.target)
  }
  
  const onBrandVideoModalOpen = () => {
    setShowBrandVideoModal(true)
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("is-clipped")
  }
  
  const onBrandVideoModalClose = () => {
    if (brandVideoPlayer) brandVideoPlayer.stopVideo()
    setShowBrandVideoModal(false)
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("is-clipped")
  }
  
  return (
    <section className="section technology" id="technology">
      <div className="container">
        <div className="columns">
          <ScrollRevealTween>
            <div className="column is-12 is-8-fullhd is-offset-2-fullhd">
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{technology.pretitle}</h5>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{technology.title}</h1>
            </div>
          </ScrollRevealTween>
        </div>
        <div className="columns">
          <div className="column is-12 is-8-widescreen is-offset-2-fullhd text-columns">
            <article className="blue-text technology-text" dangerouslySetInnerHTML={{__html: converter.makeHtml(technology.text)}}></article>
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
              <figure className="image is-16by9">
                <YouTube className="has-ratio" videoId={technology.video_item.link} onReady={onBrandYoutubeReady} />
              </figure>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onBrandVideoModalClose}></button>
          </div>
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
  })
}

export default TechnologySection