import React from 'react'
import PropTypes from 'prop-types'
import ScrollAnimation from 'react-animate-on-scroll'
import Roadmap from '../Roadmap'
import RoadmapPreview from '../previews/RoadmapPreview'
import { Controller, Scene } from 'react-scrollmagic'

const RoadmapSection = ({ roadmap, preview }) => {
  var active = Math.max(1, roadmap.active - 1)
  return (
    <section className="section roadmap has-background-primary">
      <div className="columns">
          <div className="column is-8-fullhd is-offset-2-fullhd">
            <ScrollAnimation animateIn='fadeInUp' animateOnce={true} initiallyVisible={preview} initiallyVisible={preview}>
              <h5 className="subtitle white-text has-text-weight-bold is-uppercase is-7">{roadmap.pretitle}</h5>
            </ScrollAnimation>
            <ScrollAnimation animateIn='fadeInUp' delay={200} animateOnce={true} initiallyVisible={preview} initiallyVisible={preview}>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{roadmap.title}</h1>
            </ScrollAnimation>
          </div>
        </div>
      {preview 
        ? <RoadmapPreview active={active} items={roadmap.items} />  
        : <Controller>
          <Scene triggerElement=".timeline" indicators={false}>
            {(progress, event) => {
              if (progress === 1 && event.type === 'start') {
                active = roadmap.active
              }
              return <Roadmap active={active} items={roadmap.items} />  
            }}
          </Scene>
        </Controller>
      }
    </section>
  )
}

RoadmapSection.propTypes = {
  roadmap: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    active: PropTypes.number,
    items: PropTypes.array,
  }),
  preview: PropTypes.bool
}

export default RoadmapSection