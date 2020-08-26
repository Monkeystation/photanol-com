import React from 'react'
import showdown from 'showdown'
import PreviewCompatibleFile from '../components/PreviewCompatibleFile'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import {RoadmapCircle} from '../components/Icons'

const converter = new showdown.Converter()
converter.setOption('simpleLineBreaks', true)

const RoadmapItem = (props) => {
  const {isMobile, index, width, onClick, imageSize, showText, opacity, title, icon, image, year, text} = props
    
  if (isMobile) {
    return (
      <div key={index} className="item" style={{width: width}} id={"item" + index} onClick={onClick} role="button">
        <div className="item-elements">
          <div className="item-element-top">
            <h4 className="white-text has-text-centered has-text-weight-bold item-title">
              {title}
            </h4>
          </div>             
          <div className="item-element-center">
            <RoadmapCircle />
            <PreviewCompatibleImage className="item-icon" imageInfo={{
              image: icon, 
              alt: "Icoon"
            }}/>
            <PreviewCompatibleImage className="item-image" imageInfo={{
              image: image, 
              alt: "Afbeelding",
              style: {opacity: opacity},
            }}/>
          </div>
          <div className="item-element-bottom">
            <h2 className="blue-300-text has-text-weight-bold has-text-centered item-year">
              {year}
            </h2>
            <div 
              className="item-text white-text" 
              style={{ display: 'block', opacity: opacity }} 
              dangerouslySetInnerHTML={{__html: converter.makeHtml(text)}}
            />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div key={index} className="item" style={{width: width}} id={"item" + index} onClick={onClick} role="button">
        <div className="item-elements">
          <div className="item-element-top">
            <h4 className="white-text has-text-centered has-text-weight-bold item-title">
              {title}
            </h4>
          </div>             
          <div className="item-element-center">
            <RoadmapCircle />
            <PreviewCompatibleImage className="item-icon" imageInfo={{
              image: icon, 
              alt: "Icoon",
              style: {width: imageSize, height: imageSize},
            }}/>
            <PreviewCompatibleImage className="item-image" imageInfo={{
              image: image, 
              alt: "Afbeelding",
              style: {width: imageSize, height: imageSize, opacity: opacity},
            }}/>
          </div>
          <div className="item-element-bottom">
            <h2 className="blue-300-text has-text-weight-bold has-text-centered item-year">
              {year}
            </h2>
          </div>
        </div>
        <div 
          className="item-text white-text" 
          style={{ display: showText ? 'block' : 'none', opacity: opacity }} 
          dangerouslySetInnerHTML={{__html: converter.makeHtml(text)}}
        />
      </div>
    )
  }
}

export default RoadmapItem
