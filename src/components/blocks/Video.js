import React from 'react'
import PropTypes from 'prop-types'
import ScrollAnimation from 'react-animate-on-scroll'

const Video = ({id, preview}) => (
  <section className="video wide-section">
    <div className="columns">
      <div className="column">
        <figure className="image is-16by9">
          <iframe 
            className="has-ratio" 
            id="ytplayer" 
            type="text/html" 
            src={`https://www.youtube-nocookie.com/embed/${id}?enablejsapi=1&version=3&playerapiid=ytplayer`} 
            frameBorder="0" 
            allowFullScreen>
          </iframe> 
        </figure>
      </div>
    </div>
  </section>
)

Video.propTypes = {
  id: PropTypes.string,
  preview: PropTypes.bool
}

export default Video