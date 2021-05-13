import React from 'react'
import PropTypes from 'prop-types'
import {IconTwitter, IconLinkedIn, IconYoutube, IconArrow} from './Icons'
import { Link } from 'gatsby'

class MoreNewsCard extends React.PureComponent {
  render() {
    const { data } = this.props
    return (
      <div className="news-card">
        <p className="blue-text has-text-weight-bold">
          {data.title}
        </p>
        <p className="blue-text py-3">
          {data.text}
        </p>
        <Link to={data.page_link.link}>
          <button className="button-secondary is-grey">
            <span>{data.page_link.label}</span>
            <span className="icon"><IconArrow /></span>
          </button>
        </Link>
        <div className="social-media">
          <a href={data.social_links.link_twitter} target="_blank" rel="noreferrer" className="button-secondary">
            <span className="icon"><IconTwitter /></span>
            <span>{'TWITTER'}</span>
          </a>
          <a href={data.social_links.link_linkedin} target="_blank" rel="noreferrer" className="button-secondary">
            <span className="icon"><IconLinkedIn /></span>
            <span>{'LINKEDIN'}</span>
          </a>
          <a href={data.social_links.link_youtube} target="_blank" rel="noreferrer" className="button-secondary">
            <span className="icon"><IconYoutube /></span>
            <span>{'YOUTUBE'}</span>
          </a>
        </div>
      </div>
    )  
  }
}

MoreNewsCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    page_link: PropTypes.shape({
      label: PropTypes.string,
      link: PropTypes.string
    }),
    social_links: PropTypes.shape({
      link_twitter: PropTypes.string,
      link_linkedin: PropTypes.string,
      link_youtube: PropTypes.string
    })
  })
}

export default MoreNewsCard