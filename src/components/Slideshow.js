import React from 'react'
import PropTypes from 'prop-types'
import { Controller, Scene } from 'react-scrollmagic'
import { Tween, Timeline } from 'react-gsap'

import PreviewCompatibleImage from './PreviewCompatibleImage'
import useWindowSize from '../hooks/useWindowSize'

const Slideshow = ({ slideshow }) => {
  const size = useWindowSize()
  const height = (size.width / 3) / 16 * 9
  return (
    <Controller>
      <Scene triggerHook="onCenter" duration={height * 2} pin indicators={false}>
        {(progress) => (
          <section className="section slideshow" style={{height: height}}>
            <Tween
              from={{ top: '0%', right: '14%', paddingTop: '6%' }}
              to={{ bottom: '0%', left: '0%', paddingTop: '0%'  }}
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
              from={{ top: '0%', right: '12%', transform: 'translate(0%, 0%)', paddingTop: '3%' }}
              to={{ bottom: '0%', left: '50%', transform: 'translate(-50%, 0%)', paddingTop: '0%'  }}
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
              from={{ top: '0%', right: '10%' }}
              to={{ bottom: '0%', right: '0%' }}
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

Slideshow.propTypes = {
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

export default Slideshow