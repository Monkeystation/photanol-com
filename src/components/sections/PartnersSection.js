import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import ScrollAnimation from 'react-animate-on-scroll'

import PreviewCompatibleFile from '../PreviewCompatibleFile'

const PartnersSection = ({ partners, preview }) => (
  <section className="section partners">
    <div className="columns">
        <div className="column is-12 is-8-fullhd is-offset-2-fullhd">
          <ScrollAnimation animateIn='fadeInUp' animateOnce={true} initiallyVisible={preview}>
            <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{partners.pretitle}</h5>
          </ScrollAnimation>
          <ScrollAnimation animateIn='fadeInUp' delay={200} animateOnce={true} initiallyVisible={preview}>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{partners.title}</h1>
          </ScrollAnimation>
        </div>
      </div>
      <div className="columns">
        <div className="column is-10-fullhd is-offset-2-fullhd">
          <div className="logos is-flex">
            {partners.logos.map((logo) => (
              <a href={logo.link} key={v4()} className="partner-logo" target="_blank" rel="noreferrer">
                <img src={PreviewCompatibleFile(logo.image)} alt='' loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </div>
  </section>
)

PartnersSection.propTypes = {
  partners: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    logos: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.object,
        link: PropTypes.string,
      })
    ),
    side_logo_image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    pside_logo_link: PropTypes.string,
  }),
  preview: PropTypes.bool
}

export default PartnersSection