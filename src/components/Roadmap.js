import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import Img from "gatsby-image"
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Timeline from './Timeline'

const Roadmap = ({ items }) => (
  <div className="items columns">
    {/*items.map((item) => {
      return (
        <div key={v4()} className="column">
          <div className="item">
            <h4 className="white-text has-text-centered has-text-weight-bold item-title">
              {item.roadmap_item_title}
            </h4>
            <PreviewCompatibleImage imageInfo={{image: item.roadmap_item_icon, alt: '', className: 'item-image'}} />
            <p className="white-text item-text">{item.roadmap_item_text}</p>
            <h2 className="blue-300-text has-text-weight-bold has-text-centered item-year">
              {item.roadmap_item_year}
            </h2>
          </div>
        </div>
      )
    }
    )*/}
    <Timeline items={items} />
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
