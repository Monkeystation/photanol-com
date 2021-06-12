import React from 'react'
import PropTypes from 'prop-types'
import ScrollAnimation from 'react-animate-on-scroll'

const Quote = ({quote, citation, preview}) => (
  <section className="quote section">
    <div className="columns">
      <div className="column">
        <ScrollAnimation animateIn='fadeInUp' animateOnce={true} initiallyVisible={preview}>
          <h1 className="title is-family-secondary has-text-weight-bold is-size-4-mobile is-size-3-tablet is-size-2-desktop is-size-1-fullhd">
            {quote}
          </h1>
          {citation &&
            <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7 pt-3">
              — {citation}
            </h5>
          }
        </ScrollAnimation>
      </div>
    </div>
  </section>
)

Quote.propTypes = {
  quote: PropTypes.string, 
  citation: PropTypes.string,
  preview: PropTypes.bool
}

export default Quote