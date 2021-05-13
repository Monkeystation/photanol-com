import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

class NewsCard extends React.PureComponent {
  render() {
    const {title, image, date} = this.props
    return (
      <div className="news-card">
        <PreviewCompatibleImage imageInfo={{
            image: image, 
            alt: title,
            style: {height: '300px'}
          }}/>
          <h5 className="subtitle green-text has-text-weight-bold is-uppercase is-7">{date}</h5>
          <h1 className="title is-family-secondary is-spaced blue-text has-text-weight-bold is-size-5 is-size-6-mobile">{title}</h1>
      </div>
    )  
  }
}

NewsCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.object,
  date: PropTypes.string
}

export default NewsCard