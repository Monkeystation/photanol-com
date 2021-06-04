import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

// eslint-disable-next-line no-unused-vars
const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <IndexPageTemplate
        preview={true}
        intro={data.intro}
        mission={data.mission}
        solution={data.solution}
        roadmap={data.roadmap}
        technology={data.technology}
        infographic={data.infographic}
        testimonials={data.testimonials}
        slideshow={data.slideshow}
        team={data.team}
        news={data.news}
        vacancies={data.vacancies}
        partners={data.partners}
        footer={data.footer}
      />
    )
  } else {
    return <div>Loading...</div>
  }
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
