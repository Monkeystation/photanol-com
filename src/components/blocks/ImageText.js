import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import ScrollAnimation from 'react-animate-on-scroll'
import HTMLContent from '../HTMLContent'

const ImageText = ({file, alt, align, preheading, heading, paragraph, preview}) => (
  <section className="paragraphimage section">
    <div className="columns">
      {!align && 
        <div className="column is-4 is-6-desktop is-7-widescreen">
          <PreviewCompatibleImage imageInfo={{
            image: file, 
            alt: alt,
            imgStyle: {objectFit: 'contain'}
          }} />
        </div>
      }
      <div className="column">
        {(preheading || heading) &&
          <ScrollAnimation className="pb-5" animateIn='fadeInUp' animateOnce={true} initiallyVisible={preview}>      
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
          </ScrollAnimation>
        }
        {paragraph && 
          <ScrollAnimation animateIn='fadeInUp' animateOnce={true} initiallyVisible={preview}>
            <HTMLContent className="blue-text" content={paragraph} />
          </ScrollAnimation>
        }
      </div>
      {align && 
        <div className={`column is-4 is-6-desktop is-7-widescreen ${heading ? "padded" : ""}`}>
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
  paragraph: PropTypes.string,
  preview: PropTypes.bool
}

export default ImageText