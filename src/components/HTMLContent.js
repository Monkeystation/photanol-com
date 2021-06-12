import React from 'react'
import PropTypes from 'prop-types'
import showdown from 'showdown'

const converter = new showdown.Converter()
converter.setOption('simpleLineBreaks', true)

const HTMLContent = ({ className, style, content }) => (
  <div className={className} style={style} dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }} />
)

HTMLContent.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  content: PropTypes.node
}

export default HTMLContent
