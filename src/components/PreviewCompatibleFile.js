import React from 'react'
import PropTypes from 'prop-types'

const PreviewCompatibleFile = (link) => {
  
  if (typeof link === 'string') {
    return link
  } else {
    return link.publicUrl
  }

  return null
}

PreviewCompatibleFile.propTypes = {
}

export default PreviewCompatibleFile
