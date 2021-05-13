import React from 'react'
import PropTypes from 'prop-types'

const Paragraph = ({heading, subheading, paragraph}) => (
  <section className="block paragraph section">
    <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">
      {heading}
    </h1>
    <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">
      {subheading}
    </h5>
    <p className="blue-text py-3">
      {paragraph}
    </p>
  </section>
)

Paragraph.propTypes = {
  heading: PropTypes.string, 
  subheading: PropTypes.string, 
  paragraph: PropTypes.string
}

export default Paragraph