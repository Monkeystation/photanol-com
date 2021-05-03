import React from 'react'
import PreviewCompatibleImage from '../PreviewCompatibleImage'

const Image = ({file, alt, key}) => (
  <section className="block image" key={key}>
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

export default Image