import React from 'react'
import PropTypes from 'prop-types'
import { NewsArticleTemplate } from '../../templates/news-article'

// eslint-disable-next-line no-unused-vars
const NewsArticlePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <NewsArticleTemplate
        preview={true}
        title={data.title}
        description={data.description}
        image={data.image}
        blocks={data.blocks}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

NewsArticlePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default NewsArticlePreview
