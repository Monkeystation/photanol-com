import React from 'react'
import PropTypes from 'prop-types'
import ScrollRevealTween from '../hooks/ScrollRevealTween'
import {IconTwitter, IconLinkedIn, IconYoutube} from '../components/Icons'

const FooterSection = ({ footer }) => (
<section className="section footer" id="contact">
  <div className="containert">
    <div className="columns">
      <ScrollRevealTween>
        <div className="column is-12 is-8-fullhd is-offset-2-fullhd">
          <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{footer.pretitle}</h5>
          <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{footer.title}</h1>
        </div>
      </ScrollRevealTween>
    </div>
    <div className="columns">
      <div className="column is-12 is-10-desktop is-12-widescreen is-8-fullhd is-offset-2-fullhd">
        <div className="footer-elements">
          <div className="footer-element">
            <h5 className="grey-text has-text-weight-bold is-uppercase is-size-8">EVERYTHING PHOTANOL</h5>
            <div><a href={`mailto:${footer.links.email_general}`} className="black-text">{footer.links.email_general}</a></div>
          </div>
          <div className="footer-element">
            <h5 className="grey-text has-text-weight-bold is-uppercase is-size-8">PRESS & INTERVIEWS</h5>
            <div><a href={`mailto:${footer.links.email_press}`} className="black-text">{footer.links.email_press}</a></div>
          </div>
          <div className="footer-element">
            <h5 className="grey-text has-text-weight-bold is-uppercase is-size-8">JOB OPPORTUNITIES</h5>
            <div><a href={`mailto:${footer.links.email_vacancies}`} className="black-text">{footer.links.email_vacancies}</a></div>
          </div>
          <div className="footer-element">
            <h5 className="grey-text has-text-weight-bold is-uppercase is-size-8">JOIN THE REVOLUTION ON:</h5>
            <div className="social-media">
              <a href={footer.links.link_twitter} target="_blank" className="button-secondary">
                <span className="icon"><IconTwitter /></span>
                <span>{'TWITTER'}</span>
              </a>
              <a href={footer.links.link_linkedin} target="_blank" className="button-secondary">
                <span className="icon"><IconLinkedIn /></span>
                <span>{'LINKEDIN'}</span>
              </a>
              <a href={footer.links.link_youtube} target="_blank" className="button-secondary">
                <span className="icon"><IconYoutube /></span>
                <span>{'YOUTUBE'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
)

FooterSection.propTypes = {
  footer: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    links: PropTypes.object,
  })
}

export default FooterSection