import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

const ImageText = ({file, alt, align, preheading, heading, paragraph}) => (
  <section className="paragraphimage section">
    <div className="columns">
      {!align && 
        <div className="column is-4 is-6-desktop is-7-widescreen">
          <PreviewCompatibleImage imageInfo={{
            image: file, 
            alt: alt,
            style: {maxHeight: '100%'},
            imgStyle: {objectFit: 'contain'}
          }} />
        </div>
      }
      <div className="column">
        {preheading &&
          <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">
            {preheading}
          </h5>
        }
        {heading &&
          <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">
            {heading}
          </h1>
        }
        <p className="blue-text py-3">
          {paragraph}
        </p>
      </div>
      {align && 
        <div className="column is-4 is-6-desktop is-7-widescreen">
          <PreviewCompatibleImage imageInfo={{
            image: file, 
            alt: alt,
            style: {maxHeight: '100%'},
            imgStyle: {objectFit: 'contain'}
          }} />
        </div>
      }
    </div>
  </section>
)

ImageText.propTypes = {
  file: PropTypes.object, 
  alt: PropTypes.string, 
  align: PropTypes.bool,
  preheading: PropTypes.string,
  heading:  PropTypes.string,
  paragraph: PropTypes.string
}

export default ImageText