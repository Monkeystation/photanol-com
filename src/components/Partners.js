import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import Img from "gatsby-image"

const Partners = ({ logos }) => (
  <div className="logos is-flex">
    {logos.map((logo) => {
      return (
        <a href={logo.logo_link} key={v4()} className="partner-logo" target="_blank">
          <img src={logo.logo_image.publicURL} alt='' />
        </a>
      )
    }
    )}
  </div>
)

Partners.propTypes = {
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      logo_image: PropTypes.object,
      logo_link: PropTypes.string,
    })
  ),
}

export default Partners
