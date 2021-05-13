import React from 'react'
import PropTypes from 'prop-types'

const Subheading = ({text}) => (
  <section className="block subheading section">
    <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">
      {text}
    </h5>
  </section>
)

Subheading.propTypes = {
  text: PropTypes.string
}

export default Subheading