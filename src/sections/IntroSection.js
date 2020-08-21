import React from 'react'
import PropTypes from 'prop-types'
import { Controller, Scene } from 'react-scrollmagic'
import { Tween } from 'react-gsap'
import PreviewCompatibleFile from '../components/PreviewCompatibleFile'
import showdown from 'showdown'

const converter = new showdown.Converter()
converter.setOption('simpleLineBreaks', true)

const IntroSection = ({ intro }) => (
  <Controller globalSceneOptions={{ triggerHook: 'onLeave' }}>
    <Scene pin duration={380} offset={-80} indicators={false}>
      {(progress) => (
        <section className="intro">
          <div className="video-panel hero-video">
            <video poster={PreviewCompatibleFile(intro.video.poster)} playsInline autoPlay muted loop>
              <source src={PreviewCompatibleFile(intro.video.file)} type="video/mp4" />
            </video>
          </div>
          <Tween
            paused
            from={{ clipPath: 'inset(0 0 0% 0)' }}
            to={{ clipPath: 'inset(0 0 100% 0)' }}
            totalProgress={progress * 1.5}
            ease={"linear"}
          >
          <section className="text-panel-wrapper">
            <div className="text-panel">
              <div className="container text">
                <h5 className="subtitle green-text has-text-weight-bold is-uppercase is-7">{intro.pretitle}</h5>
                <h1 className="title blue-text has-text-weight-bold is-size-5-mobile is-size-4-tablet is-size-3-desktop is-size-2-fullhd" dangerouslySetInnerHTML={{__html: converter.makeHtml(intro.title)}}></h1>
              </div>
            </div>
          </section>
          </Tween>
        </section>
      )} 
    </Scene>
  </Controller>
)

IntroSection.propTypes = {
  intro: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.shape({
      file: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      poster: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
  })
}

export default IntroSection