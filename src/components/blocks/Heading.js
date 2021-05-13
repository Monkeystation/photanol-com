import React from 'react'
import PropTypes from 'prop-types'

const Heading = ({text}) => (
  <section className="block heading section">
    <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">
      {text}
    </h1>
  </section>
)

Heading.propTypes = {
  text: PropTypes.string
}

export default Heading