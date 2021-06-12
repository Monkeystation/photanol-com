import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleFile from '../PreviewCompatibleFile'
import ScrollAnimation from 'react-animate-on-scroll'
import HTMLContent from '../HTMLContent'

const InfographicSection = ({ infographic, preview }) => (
  <section className="section infographic">
    <div className="columns">
        <div className="column is-12 is-10-widescreen is-offset-1-widescreen is-8-fullhd is-offset-2-fullhd" >
          <ScrollAnimation animateIn='fadeInUp' animateOnce={true} initiallyVisible={preview}>
            <h5 className="subtitle blue-text has-text-centered has-text-weight-bold is-uppercase is-7">{infographic.pretitle}</h5>
          </ScrollAnimation>
        </div>
      </div>
      <div className="columns">
        <div className="column is-12 is-8-desktop is-offset-2-desktop is-6-widescreen is-offset-3-widescreen">
        {infographic.items.map((item, index) => (
            <div className="infographic-item" key={index}>
              <ScrollAnimation animateIn='fadeIn' animateOnce={true} initiallyVisible={preview}>
                <img src={PreviewCompatibleFile(item.image)} alt={item.alt} width='100%' loading="lazy" />
              </ScrollAnimation>
              <ScrollAnimation animateIn='fadeInDown' animateOnce={true} initiallyVisible={preview}>
                <HTMLContent className="blue-text is-size-6-tablet" content={item.text} />
              </ScrollAnimation>
            </div>
          ))}
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
  }),
  preview: PropTypes.bool
}

export default InfographicSection