import React from 'react'
import PropTypes from 'prop-types'
import ScrollAnimation from 'react-animate-on-scroll'

import Team from '../Team'
import TeamPreview from '../previews/TeamPreview'

const TeamSection = ({ team, preview }) => (
  <section className="section team" id="team">
    <div className="text">
      <ScrollAnimation animateIn='fadeInUp' animateOnce={true} initiallyVisible={preview}>
        <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{team.pretitle}</h5>
      </ScrollAnimation>
      <ScrollAnimation animateIn='fadeInUp' delay={200} animateOnce={true} initiallyVisible={preview}>
        <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{team.title}</h1>
      </ScrollAnimation>
    </div>
    {preview 
      ? <TeamPreview employees={team.employees} />  
      : <Team employees={team.employees} />
    }
  </section>
)

TeamSection.propTypes = {
  team: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    employees: PropTypes.array,
  }),
  preview: PropTypes.bool
}

export default TeamSection