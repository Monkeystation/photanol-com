import React from 'react'

const Video = ({id, key}) => (
  <section className="block video" key={key}>
    <figure class="image is-16by9">
      <iframe 
        className="has-ratio" 
        id="ytplayer" 
        type="text/html" 
        src={`https://www.youtube-nocookie.com/embed/${id}?enablejsapi=1&version=3&playerapiid=ytplayer`} 
        frameBorder="0" 
        allowFullScreen>
      </iframe> 
    </figure>
  </section>
)

export default Video