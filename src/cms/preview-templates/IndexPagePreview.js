import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <IndexPageTemplate
        intro={data.intro}
        mission={data.mission}
        solution={data.solution}
        roadmap={data.roadmap}
        technology={data.technology}
        infographic={data.infographic}
        team={data.team}
        vacancies={data.team.vacancies}
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
