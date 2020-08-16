import React from 'react'
import showdown from 'showdown'
import PreviewCompatibleFile from '../components/PreviewCompatibleFile'

const converter = new showdown.Converter()
converter.setOption('simpleLineBreaks', true)

const RoadmapItem = (props) => {
  const {isMobile, index, width, onClick, imageSize, showText, opacity, title, icon, image, year, text} = props
  
  if (isMobile) {
    return (
      <div key={index} className="item" style={{width: width}} id={"item" + index} onClick={onClick}>
        <div className="item-elements" style={{opacity: opacity}}>
          <div className="item-element-top">
            <h4 className="white-text has-text-centered has-text-weight-bold item-title">
              {title}
            </h4>
          </div>             
          <div className="item-text" style={{display: 'block'}}>
            <p className="white-text" dangerouslySetInnerHTML={{__html: converter.makeHtml(text)}}></p>
          </div>
          <div className="item-element-bottom">
            <h2 className="blue-300-text has-text-weight-bold has-text-centered item-year">
              {year}
            </h2>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div key={index} className="item" style={{width: width}} id={"item" + index} onClick={onClick}>
        <div className="item-elements">
          <div className="item-element-top">
            <h4 className="white-text has-text-centered has-text-weight-bold item-title">
              {title}
            </h4>
          </div>             
          <div className="item-element-center">
            <img 
              className="item-icon" 
              style={{ width: imageSize, height: imageSize }} 
              src={PreviewCompatibleFile(icon)} 
            />
            <img className="item-image" 
              style={{ width: imageSize, height: imageSize, opacity: opacity }} 
              src={PreviewCompatibleFile(image)}
            />
          </div>
          <div className="item-element-bottom">
            <h2 className="blue-300-text has-text-weight-bold has-text-centered item-year">
              {year}
            </h2>
          </div>
        </div>
        <div 
          className="item-text" 
          style={{ display: showText ? 'block' : 'none', opacity: opacity }}  
        >
          <p className="white-text" dangerouslySetInnerHTML={{__html: converter.makeHtml(text)}}></p>
        </div>
      </div>
    )
  }
}

export default RoadmapItem
