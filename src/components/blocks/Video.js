import React from 'react'
import PropTypes from 'prop-types'

const Video = ({id}) => (
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
  id: PropTypes.string
}

export default Video