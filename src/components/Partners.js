import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import Img from "gatsby-image"
import PreviewCompatibleImage from './PreviewCompatibleImage'

const Partners = ({ logos }) => (
  <div className="logos is-flex">
    {logos.map((logo) => {
      const logo_image = !!logo.logo_image.publicURL ? logo.logo_image.publicURL : logo.logo_image
      return (
        <a href={logo.logo_link} key={v4()} className="partner-logo" target="_blank">
          <img src={logo_image} alt='' />
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
