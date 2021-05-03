import React from 'react'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

const ParagraphImage = ({file, alt, text, key}) => (
  <section className="block paragraphimage section" key={key}>
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

export default ParagraphImage