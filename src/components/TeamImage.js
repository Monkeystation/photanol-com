import React from 'react'

class TeamImage extends React.PureComponent {
  render() {
    const {backgroundImage, opacity, zIndex} = this.props
    return (
      <div className="employee-image" style={{
        backgroundImage: backgroundImage,
        opacity: opacity,
        zIndex: zIndex}}
      />
    )  
  }
}

export default TeamImage