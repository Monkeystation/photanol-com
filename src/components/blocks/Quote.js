import React from 'react'

const Quote = ({quote, citation, key}) => (
  <section className="block quote section" key={key}>
    <h1 className="title is-family-secondary has-text-weight-bold is-size-4-mobile is-size-3-tablet is-size-2-desktop is-size-1-fullhd">
      {quote}
    </h1>
  </section>
)

export default Quote