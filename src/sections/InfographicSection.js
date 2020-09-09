import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleFile from '../components/PreviewCompatibleFile'
import ScrollAnimation from 'react-animate-on-scroll'
import showdown from 'showdown'

const converter = new showdown.Converter()

const InfographicSection = ({ infographic }) => (
  <section className="section infographic">
    <div className="containert">
      <div className="columns">
        <div className="column is-12 is-10-widescreen is-offset-1-widescreen is-8-fullhd is-offset-2-fullhd" >
          <ScrollAnimation animateIn='fadeInUp' animateOnce={true}>
            <h5 className="subtitle blue-text has-text-centered has-text-weight-bold is-uppercase is-7">{infographic.pretitle}</h5>
          </ScrollAnimation>
        </div>
      </div>
      <div className="columns">
        <div className="column is-12 is-8-desktop is-offset-2-desktop is-6-widescreen is-offset-3-widescreen">
        {infographic.items.map((item, index) => (
            <div key={index}>
              <ScrollAnimation animateIn='fadeIn' animateOnce={true}>
                <img src={PreviewCompatibleFile(item.image)} alt={item.alt} width='100%' alt="Infographic" />
              </ScrollAnimation>
              <ScrollAnimation animateIn='fadeInDown' animateOnce={true}>
                <p className="blue-text is-size-6-tablet" dangerouslySetInnerHTML={{__html: converter.makeHtml(item.text)}}></p>
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