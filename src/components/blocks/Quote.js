import React from 'react'
import PropTypes from 'prop-types'

const Quote = ({quote}) => (
  <section className="quote section">
    <div className="columns">
      <div className="column">
        <h1 className="title is-family-secondary has-text-weight-bold is-size-4-mobile is-size-3-tablet is-size-2-desktop is-size-1-fullhd">
          {quote}
        </h1>
      </div>
    </div>
  </section>
)

Quote.propTypes = {
  quote: PropTypes.string, 
  citation: PropTypes.string
}

export default Quote