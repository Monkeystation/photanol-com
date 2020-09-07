import React from 'react'
import PropTypes from 'prop-types'
import ScrollRevealTween from '../hooks/ScrollRevealTween'

const InfographicSection = ({ infographic }) => (
  <section className="section infographic">
    <div className="containert">
      <div className="columns">
        <div className="column is-12 is-10-widescreen is-offset-1-widescreen is-8-fullhd is-offset-2-fullhd" >
          <ScrollRevealTween>
            <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{infographic.pretitle}</h5>
          </ScrollRevealTween>
        </div>
      </div>
      <div className="columns">
        <div className="column is-12 is-10-desktop is-offset-1-desktop is-8-widescreen is-offset-2-widescreen">
          <img src="/img/infographic-placeholder-01.jpg" width='100%' alt="Infographic" />
          <p className="blue-text has-text-weight-bold">The Photanol process takes place in tubes powered by sunlight, absorbing CO2, producing just oxygen as a by-product.</p>
          <img src="/img/infographic-placeholder-02.jpg" width='100%' alt="Infographic" />
          <p className="blue-text has-text-weight-bold">Our solution uses the photosynthesis superpower of cyanobacteria.</p>
          <img src="/img/infographic-placeholder-03.jpg" width='100%' alt="Infographic" />
          <p className="blue-text has-text-weight-bold">The cyanobacteria is adapted to absorb more CO2, its metabolic pathways enhanced to produce a desired strain.</p>
          <img src="/img/infographic-placeholder-04.jpg" width='100%' alt="Infographic" />
          <p className="blue-text has-text-weight-bold">Photanol’s platform technology makes it possible to make any carbon compound and has the power to transform every industry to circular.</p>
          <img src="/img/infographic-placeholder-05.jpg" width='100%' alt="Infographic" />
          <p className="blue-text has-text-weight-bold">Our renewable chemistry is used to create biodegradable plastic, sustainable beauty and healthcare products and detergents. Even biofuel.</p>
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