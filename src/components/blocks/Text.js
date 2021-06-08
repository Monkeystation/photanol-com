import React from 'react'
import PropTypes from 'prop-types'
import HTMLContent from '../HTMLContent'
import ScrollAnimation from 'react-animate-on-scroll'

const Text = ({preheading, heading, paragraph, preview}) => (
  <section className="text section">
    <div className="columns">
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
    </div>
  </section>
)

Text.propTypes = {
  preheading: PropTypes.string,
  heading:  PropTypes.string,
  paragraph: PropTypes.string,
  preview: PropTypes.bool
}

export default Text