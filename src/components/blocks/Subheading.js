import React from 'react'

const Subheading = ({text, key}) => (
  <section className="block subheading section" key={key}>
    <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">
      {text}
    </h5>
  </section>
)

export default Subheading