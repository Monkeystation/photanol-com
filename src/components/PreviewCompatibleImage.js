import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = React.forwardRef(({ imageInfo, className = '' }, ref) => {
  const { alt = '', childImageSharp, image, style, imgStyle } = imageInfo

  if (!!image && !!image.childImageSharp) {
    return (
      <Img style={style} className={className} ref={ref} imgStyle={imgStyle} fluid={image.childImageSharp.fluid} alt={alt} />
    )
  }

  if (!!childImageSharp) {
    return <Img style={style} className={className} ref={ref} imgStyle={imgStyle} fluid={childImageSharp.fluid} alt={alt} />
  }

  if (!!image && typeof image === 'string')
    return <img style={style} className={className} ref={ref} src={image} alt={alt} />

  return null
})

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
    imgStyle: PropTypes.object,
  }).isRequired,
}

export default PreviewCompatibleImage
