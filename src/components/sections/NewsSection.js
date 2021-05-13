import React from 'react'
import PropTypes from 'prop-types'
import ScrollAnimation from 'react-animate-on-scroll'
import NewsList from '../NewsList'
import MoreNewsCard from '../MoreNewsCard'


const NewsSection = ({ news }) => {
  return (
    <section className="section news">
      <div className="columns">
          <div className="column is-12 is-8-fullhd is-offset-2-fullhd">
            <ScrollAnimation animateIn='fadeInUp' animateOnce={true}>
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{news.pretitle}</h5>
            </ScrollAnimation>
            <ScrollAnimation animateIn='fadeInUp' delay={200} animateOnce={true}>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{news.title}</h1>
            </ScrollAnimation>
          </div>
        </div>
        <div className="columns">
          <div className="column is-12 is-10-desktop is-offset-1-desktop is-8-widescreen is-offset-2-widescreen">
            <NewsList count={3} extra={<MoreNewsCard data={news.card} />} />
          </div>
        </div>
    </section>
  )
}

NewsSection.propTypes = {
  news: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.number,
    card: PropTypes.shape({
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
  }),
  preview: PropTypes.bool
}

export default NewsSection