import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

import ScrollRevealTween from '../hooks/ScrollRevealTween'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import PreviewCompatibleFile from '../components/PreviewCompatibleFile'

const PartnersSection = ({ partners }) => (
  <section className="section partners">
    <div className="container">
      <div className="columns">
        <ScrollRevealTween>
          <div className="column is-12 is-8-fullhd is-offset-2-fullhd">
            <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{partners.pretitle}</h5>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{partners.title}</h1>
          </div>
        </ScrollRevealTween>
      </div>
      <div className="columns">
        <div className="column is-8-fullhd is-offset-2-fullhd">
          <div className="columns">
            <div className="column is-three-quarters-tablet">
              <div className="logos is-flex">
                {partners.logos.map((logo) => (
                  <a href={logo.link} key={v4()} className="partner-logo" target="_blank">
                    <img src={PreviewCompatibleFile(logo.image)} alt='' />
                  </a>
                ))}
              </div>
            </div>
            <div className="column side-image-column">
              <a className="side-image" href={partners.side_logo.link} target="_blank">
                <PreviewCompatibleImage imageInfo={{
                  image: partners.side_logo.image, 
                  alt: '',
                  style: {maxHeight: '100%'},
                  imgStyle: {objectFit: 'contain'}
                }} />
              </a>
            </div>
          </div>
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
  })
}

export default PartnersSection