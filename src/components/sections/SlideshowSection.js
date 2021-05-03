import React from 'react'
import PropTypes from 'prop-types'
import { Controller, Scene } from 'react-scrollmagic'
import { Tween } from 'react-gsap'

import PreviewCompatibleImage from '../PreviewCompatibleImage'
import useWindowSize from '../../hooks/useWindowSize'

const SlideshowSection = ({ slideshow }) => {
  const size = useWindowSize()
  var offset = (size.height / 2)
  var duration = (size.height / 2)
  var width = '50%'
  if (size.width > 768) {
    offset = (size.width / 3) / 16 * 9
    width = '33.33%'
  } 
  
  return (
    <Controller>
      <Scene triggerHook="onEnter" offset={offset} duration={duration} indicators={false}>
        {(progress) => (
          <section className="section slideshow">
            <Tween
              from={{ top: '60px', right: '90px', width: width }}
              totalProgress={progress}
              ease={"power1.inOut"}
              paused
            >
              <div className="image" id="image1">
                <PreviewCompatibleImage imageInfo={{
                  image: slideshow.image1.image, 
                  alt: slideshow.image1.alt,
                  style: {maxHeight: '100%'},
                  imgStyle: {objectFit: 'contain'}
                }} />
              </div>
            </Tween>
            <Tween
              from={{ top: '30px', right: '60px', width: width }}
              totalProgress={progress}
              ease={"power1.inOut"}
              paused
            >
              <div className="image" id="image2">
                <PreviewCompatibleImage imageInfo={{
                  image: slideshow.image2.image, 
                  alt: slideshow.image2.alt,
                  style: {maxHeight: '100%'},
                  imgStyle: {objectFit: 'contain'}
                }} />
              </div>
            </Tween>
            <Tween
              from={{ top: '0px', right: '30px', width: width }}
              totalProgress={progress}
              ease={"power1.inOut"}
              paused
            >
              <div className="image" id="image3">
                <PreviewCompatibleImage imageInfo={{
                  image: slideshow.image3.image, 
                  alt: slideshow.image3.alt,
                  style: {maxHeight: '100%'},
                  imgStyle: {objectFit: 'contain'}
                }} />
              </div>
            </Tween>
          </section>
        )}
      </Scene>
    </Controller>
  )
}

SlideshowSection.propTypes = {
  slideshow: PropTypes.shape({
    image1: PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      alt: PropTypes.string,
    }),
    image2: PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      alt: PropTypes.string,
    }),
    image3: PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      alt: PropTypes.string,
    }),
  }),
}

export default SlideshowSection