import React from 'react'
import PropTypes from 'prop-types'

const Quote = ({quote}) => (
  <section className="block quote section">
    <h1 className="title is-family-secondary has-text-weight-bold is-size-4-mobile is-size-3-tablet is-size-2-desktop is-size-1-fullhd">
      {quote}
    </h1>
  </section>
)

Quote.propTypes = {
  quote: PropTypes.string, 
  citation: PropTypes.string
}

export default Quote