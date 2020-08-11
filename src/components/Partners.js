import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import Img from "gatsby-image"
import PreviewCompatibleFile from './PreviewCompatibleFile'

const Partners = ({ logos }) => (
  <div className="logos is-flex">
    {logos.map((logo) => {
      return (
        <a href={logo.link} key={v4()} className="partner-logo" target="_blank">
          <img src={PreviewCompatibleFile(logo.image)} alt='' />
        </a>
      )
    }
    )}
  </div>
)

Partners.propTypes = {
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
      link: PropTypes.string,
    })
  ),
}

export default Partners
