/* eslint-disable react/no-direct-mutation-state */

import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import PreviewCompatibleImage from '../PreviewCompatibleImage'
import HTMLContent from '../HTMLContent'

class RoadmapPreview extends React.Component {
  
  constructor(props) {
    super(props)
  }
  
  render() {
    const {items} = this.props
    const settings = {
      dots: true,
      centerMode: true,
      slidesToScroll: 1,
      variableWidth: true,
    };
    
    return (
      <Slider className="white" {...settings}>
        {items.map((item, index) => (
          <div key={index} style={{width: '400px'}} className="is-flex px-4">
            <div style={{width: '100px'}} className="is-flex is-flex-direction-column">
              <h4 className="white-text has-text-centered has-text-weight-bold item-title">{item.title}</h4>
              <PreviewCompatibleImage imageInfo={{ image: item.icon }}/>
              <PreviewCompatibleImage imageInfo={{ image: item.image }}/>
              <h2 className="blue-300-text has-text-weight-bold has-text-centered item-year">{item.year}</h2>
            </div>
            <div style={{width: '300px'}} className="ml-4">
              <HTMLContent className="white-text" content={item.text} />
            </div>
          </div>
        ))}
      </Slider>
    )
  }
}

RoadmapPreview.propTypes = {
  active: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
  ),
}

export default RoadmapPreview