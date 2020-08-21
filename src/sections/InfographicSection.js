import React from 'react'
import PropTypes from 'prop-types'
import ScrollRevealTween from '../hooks/ScrollRevealTween'

const InfographicSection = ({ infographic }) => (
  <section className="section infographic">
    <div className="container">
      <div className="columns">
        <div className="column is-12 is-10-widescreen is-offset-1-widescreen is-8-fullhd is-offset-2-fullhd" >
          <ScrollRevealTween>
            <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{infographic.pretitle}</h5>
          </ScrollRevealTween>
        </div>
      </div>
      <div className="columns">
        <div className="column is-12 is-10-desktop is-offset-1-desktop is-8-widescreen is-offset-2-widescreen">
          <img src="/img/infographic-placeholder.jpg" width='100%' />
        </div>
      </div>
    </div>
  </section>
)

InfographicSection.propTypes = {
  infographic: PropTypes.shape({
    pretitle: PropTypes.string,
    items: PropTypes.object,
  })
}

export default InfographicSection