import React from 'react'
import PropTypes from 'prop-types'
import ScrollRevealTween from '../hooks/ScrollRevealTween'

const SolutionSection = ({ solution }) => (
  <section className="section solution" id="product">
    <div className="containert">
      <div className="columns">
        <ScrollRevealTween>
          <div className="column is-12 is-8-fullhd is-offset-2-fullhd">
            <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{solution.pretitle}</h5>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{solution.title}</h1>
          </div>
        </ScrollRevealTween>
      </div>
      <div className="columns">
        <div className="column is-12 is-10-desktop is-offset-1-desktop is-8-widescreen is-offset-2-widescreen">
          <img src="/img/animation-placeholder.jpg" width='100%' alt="Animation" />
        </div>
      </div>
    </div>
  </section>
)

SolutionSection.propTypes = {
  solution: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    animation: PropTypes.object,
  })
}

export default SolutionSection