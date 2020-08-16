import React from 'react'
import PropTypes from 'prop-types'
import ScrollRevealTween from '../hooks/ScrollRevealTween'

import Roadmap from '../components/Roadmap'

const RoadmapSection = ({ roadmap }) => (
  <section className="section roadmap has-background-primary">
    <div className="container">
      <div className="columns">
        <ScrollRevealTween>
          <div className="column is-12">
            <h5 className="subtitle white-text has-text-weight-bold is-uppercase is-7">{roadmap.pretitle}</h5>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{roadmap.title}</h1>
          </div>
        </ScrollRevealTween>
      </div>
    </div>
    <Roadmap active={roadmap.active} items={roadmap.items} />
  </section>
)

RoadmapSection.propTypes = {
  roadmap: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    active: PropTypes.number,
    items: PropTypes.array,
  })
}

export default RoadmapSection