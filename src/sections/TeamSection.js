import React from 'react'
import PropTypes from 'prop-types'
import ScrollAnimation from 'react-animate-on-scroll'

import Team from '../components/Team'

const TeamSection = ({ team }) => (
  <section className="section team" id="team">
    <ScrollAnimation animateIn='fadeInUp'>
      <div className="containert text">
        <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{team.pretitle}</h5>
        <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{team.title}</h1>
      </div>
    </ScrollAnimation>
    <Team employees={team.employees} />
  </section>
)

TeamSection.propTypes = {
  team: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    employees: PropTypes.array,
  })
}

export default TeamSection