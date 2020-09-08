import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleFile from '../components/PreviewCompatibleFile'
import ScrollAnimation from 'react-animate-on-scroll'

const InfographicSection = ({ infographic }) => (
  <section className="section infographic">
    <div className="containert">
      <div className="columns">
        <div className="column is-12 is-10-widescreen is-offset-1-widescreen is-8-fullhd is-offset-2-fullhd" >
          <ScrollAnimation animateIn='fadeInUp' style={{["--distance"]: "100%"}}>
            <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{infographic.pretitle}</h5>
          </ScrollAnimation>
        </div>
      </div>
      <div className="columns">
        <div className="column is-12 is-10-desktop is-offset-1-desktop is-8-widescreen is-offset-2-widescreen">
        {infographic.items.map((item, index) => (
            <div key={index}>
              <img src={PreviewCompatibleFile(item.image)} alt={item.alt} width='100%' alt="Infographic" />
              <ScrollAnimation animateIn='fadeInDown'>
                <p className="blue-text is-size-6-tablet">{item.text}</p>
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

InfographicSection.propTypes = {
  infographic: PropTypes.shape({
    pretitle: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.object,
        alt: PropTypes.string,
        text: PropTypes.string,
      })
    ),
  })
}

export default InfographicSection