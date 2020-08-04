import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  if (data) {
    return (
      <IndexPageTemplate
        intro_pretitle={data.intro.intro_pretitle}
        intro_title={data.intro.intro_title}
        intro_image={getAsset(data.intro.intro_image)}
        mission_pretitle={data.mission.mission_pretitle}
        mission_title={data.mission.mission_title}
        mission_video_item={data.mission.mission_video_item || {}}
        solution_pretitle={data.solution.solution_pretitle}
        solution_title={data.solution.solution_title}
        solution_animation={data.solution.solution_animation || []}
        roadmap_pretitle={data.roadmap.roadmap_pretitle}
        roadmap_title={data.roadmap.roadmap_title}
        roadmap_items={data.roadmap.roadmap_items || []}
        technology_pretitle={data.technology.technology_pretitle}
        technology_title={data.technology.technology_title}
        technology_image={data.technology.technology_image}
        technology_text={data.technology.technology_text}
        technology_video_item={data.technology.technology_video_item || {}}
        infographic_pretitle={data.infographic.infographic_pretitle}
        infographic_items={data.infographic.infographic_items || {}}
        team_pretitle={data.team.team_pretitle}
        team_title={data.team.team_title}
        employees={data.team.employees || []}
        vacancies={data.team.vacancies || []}
        partners_pretitle={data.partners.partners_pretitle}
        partners_title={data.partners.partners_title}
        partners_logos={data.partners.partners_logos || []}
        partners_side_logo_image={data.partners.partners_side_logo.side_logo_image}
        partners_side_logo_link={data.partners.partners_side_logo.side_logo_link}
        footer_pretitle={data.footer.footer_pretitle}
        footer_title={data.footer.footer_title}
        footer_links={data.footer.footer_links || {}}
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
