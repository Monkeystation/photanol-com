import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import ScrollAnimation from 'react-animate-on-scroll'

const Image = ({file, alt, preview}) => (
  <section className="image wide-section">
    <div className="columns">
      <div className="column">
        <PreviewCompatibleImage 
          className="has-ratio"
          imageInfo={{
            image: file, 
            alt: alt,
            style: {maxHeight: '100%'},
            imgStyle: {objectFit: 'contain'}
          }} 
        />
      </div>
    </div>
  </section>
)

Image.propTypes = {
  file: PropTypes.object, 
  alt: PropTypes.string,
  preview: PropTypes.bool
}

export default Image