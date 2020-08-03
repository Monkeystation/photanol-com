import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import Img from "gatsby-image"
import PreviewCompatibleImage from './PreviewCompatibleImage'

const Roadmap = ({ items }) => (
  <div className="columns">
    {items.map((item) => {
      return (
        <div key={v4()} className="column">
          <section className="section">
            <h4 className="white-text has-text-centered has-text-weight-bold">
              {item.roadmap_item_title}
            </h4>
            <PreviewCompatibleImage imageInfo={{image: item.roadmap_item_icon, alt: ''}} />
            <p className="white-text">{item.roadmap_item_text}</p>
            <h2 className="white-text has-text-weight-bold has-text-centered">
              {item.roadmap_item_year}
            </h2>
          </section>
        </div>
      )
    }
    )}
  </div>
)

Roadmap.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      roadmap_item_year: PropTypes.string,
      roadmap_item_title: PropTypes.string,
      roadmap_item_text: PropTypes.string,
      roadmap_item_icon: PropTypes.object,
      roadmap_item_image: PropTypes.object,
    })
  ),
}

export default Roadmap
