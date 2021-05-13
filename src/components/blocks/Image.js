import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

const Image = ({file, alt}) => (
  <section className="block image">
    <PreviewCompatibleImage 
      className="has-ratio"
      imageInfo={{
        image: file, 
        alt: alt,
        style: {maxHeight: '100%'},
        imgStyle: {objectFit: 'contain'}
      }} 
    />
  </section>
)

Image.propTypes = {
  file: PropTypes.object, 
  alt: PropTypes.string
}

export default Image