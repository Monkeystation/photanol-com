import React from 'react'
import PropTypes from 'prop-types'
import { DynamicPageTemplate } from '../../templates/dynamic-page'

// eslint-disable-next-line no-unused-vars
const DynamicPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <DynamicPageTemplate
        preview={true}
        path={data.path}
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

DynamicPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default DynamicPagePreview
