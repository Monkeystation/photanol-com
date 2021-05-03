import React from 'react'

const Heading = ({text, key}) => (
  <section className="block heading section" key={key}>
    <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">
      {text}
    </h1>
  </section>
)

export default Heading