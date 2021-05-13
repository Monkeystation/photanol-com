import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

const ParagraphImage = ({file, alt, text}) => (
  <section className="block paragraphimage section">
    <div className="columns">
            <div className="column">
              <PreviewCompatibleImage imageInfo={{
                image: file, 
                alt: alt,
                style: {maxHeight: '100%'},
                imgStyle: {objectFit: 'contain'}
              }} />
            </div>
            <div className="column">
              <p className="blue-text py-3">{text}</p>
            </div>
          </div>
  </section>
)

ParagraphImage.propTypes = {
  file: PropTypes.object, 
  alt: PropTypes.string, 
  text: PropTypes.string
}

export default ParagraphImage