import React from 'react'
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

export default TeamImage