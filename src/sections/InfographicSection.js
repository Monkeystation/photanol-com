import React from 'react'
import PropTypes from 'prop-types'
import ScrollRevealTween from '../hooks/ScrollRevealTween'
import PreviewCompatibleFile from '../components/PreviewCompatibleFile'


const InfographicSection = ({ infographic }) => (
  <section className="section infographic">
    <div className="containert">
      <div className="columns">
        <div className="column is-12 is-10-widescreen is-offset-1-widescreen is-8-fullhd is-offset-2-fullhd" >
          <ScrollRevealTween>
            <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{infographic.pretitle}</h5>
          </ScrollRevealTween>
        </div>
      </div>
      <div className="columns">
        <div className="column is-12 is-10-desktop is-offset-1-desktop is-8-widescreen is-offset-2-widescreen">
        {infographic.items.map((item, index) => (
            <div key={index}>
              <ScrollRevealTween>
                <img src={PreviewCompatibleFile(item.image)} alt={item.alt} width='100%' alt="Infographic" />
              </ScrollRevealTween>
              <ScrollRevealTween>
                <p className="blue-text is-size-6-tablet">{item.text}</p>
              </ScrollRevealTween>
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