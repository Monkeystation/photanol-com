import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

class TeamImage extends React.PureComponent {
  render() {
    const {image, alt, opacity, zIndex} = this.props
    return (
      <div className="employee-image" style={{
        opacity: opacity,
        zIndex: zIndex}}
      >
        <PreviewCompatibleImage imageInfo={{
          image: image, 
          alt: alt,
          style: {height: '100%'}
        }}/>
      </div>
    )  
  }
}

TeamImage.propTypes = {
  image: PropTypes.object,
  alt: PropTypes.string,
  opacity: PropTypes.number,
  zIndex: PropTypes.number
}

export default TeamImage