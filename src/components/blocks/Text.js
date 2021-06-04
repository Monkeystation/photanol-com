import React from 'react'
import PropTypes from 'prop-types'

const Text = ({preheading, heading, paragraph}) => (
  <section className="text section">
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
    <p className="blue-text py-3">
      {paragraph}
    </p>
  </section>
)

Text.propTypes = {
  preheading: PropTypes.string,
  heading:  PropTypes.string,
  paragraph: PropTypes.string
}

export default Text