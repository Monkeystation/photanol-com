import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'

export const IndexPageTemplate = ({
  intro_pretitle,
  intro_title,
  intro_image,
  mission_pretitle,
  mission_title,
  mission_video_item,
  solution_pretitle,
  solution_title,
  solution_animation,
  roadmap_pretitle,
  roadmap_title,
  roadmap_items,
  technology_pretitle,
  technology_title,
  technology_image,
  technology_text,
  technology_video_item,
  infographic_pretitle,
  infographic_items,
  team_pretitle,
  team_title,
  employees,
  vacancies,
  partners_pretitle,
  partners_title,
  partners_logos,
  footer_pretitle,
  footer_title,
  footer_links, 
}) => (
  <div>
    <section className="section intro has-background-light" >
      <div className="container">
        <div className="columns">
          <div className="column is-5-desktop is-4 is-offset-4 py-6">
            <h5 class="subtitle green-text has-text-weight-bold is-uppercase">{intro_pretitle}</h5>
            <h1 className="title blue-text has-text-weight-bold is-size-5-mobile is-size-4-tablet is-size-3-desktop is-size-3-fullhd">{intro_title}</h1>
          </div>
        </div>
      </div>
    </section>
    <section className="section mission">
      <div className="container">
        <div className="columns">
          <div className="column is-12 has-background-light">
            <div className="column is-12 py-6">
            <h5 class="subtitle blue-text has-text-weight-bold is-uppercase">{mission_pretitle}</h5>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-4-mobile is-size-3-tablet is-size-2-desktop is-size-2-fullhd">{mission_title}</h1>
            <button class="button">
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
              <span>{mission_video_item.mission_video_item_label}</span>
            </button>
          </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section animation">
      <div className="container">
        <div className="columns">
          <div className="column is-12 has-background-light">
            <h5 class="subtitle blue-text has-text-weight-bold is-uppercase">{solution_pretitle}</h5>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">{solution_title}</h1>
          </div>
        </div>
      </div>
    </section>
    <section className="section timeline has-background-primary">
      <div className="columns">
        <div className="column is-12">
          <h5 class="subtitle white-text has-text-weight-bold is-uppercase">{roadmap_pretitle}</h5>
          <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">{roadmap_title}</h1>
        </div>
      </div>
    </section>
    <section className="section how">
      <div className="container">
        <div className="columns">
          <div className="column is-12 has-background-light">
            <h5 class="subtitle blue-text has-text-weight-bold is-uppercase">{technology_pretitle}</h5>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">{technology_title}</h1>
          </div>
        </div>
      </div>
    </section>
    <section className="section infographic">
      <div className="container">
        <div className="columns">
          <div className="column is-12 has-background-light" >
            <div className="column is-12">
              <h5 class="subtitle blue-text has-text-weight-bold is-uppercase">{infographic_pretitle}</h5>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section team has-background-light">
      <div className="container">
        <div className="columns">
          <div className="column is-12 has-background-light">
            <h5 class="subtitle blue-text has-text-weight-bold is-uppercase">{team_pretitle}</h5>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">{team_title}</h1>
          </div>
        </div>
      </div>
    </section>
    <section className="section partners">
      <div className="container">
        <div className="columns">
          <div className="column is-12 has-background-light">
            <h5 class="subtitle blue-text has-text-weight-bold is-uppercase">{partners_pretitle}</h5>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">{partners_title}</h1>
          </div>
        </div>
      </div>
    </section>
    <section className="section footer has-background-light">
      <div className="container">
        <div className="columns">
          <div className="column is-12 has-background-light">
            <h5 class="subtitle blue-text has-text-weight-bold is-uppercase">{footer_pretitle}</h5>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">{footer_title}</h1>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  
)

IndexPageTemplate.propTypes = {
  intro_pretitle: PropTypes.string,
  intro_title: PropTypes.string,
  intro_image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  mission_pretitle: PropTypes.string,
  mission_title: PropTypes.string,
  mission_video_item: PropTypes.object,
  solution_pretitle: PropTypes.string,
  solution_title: PropTypes.string,
  solution_animation: PropTypes.object,
  roadmap_pretitle: PropTypes.string,
  roadmap_title: PropTypes.string,
  roadmap_items: PropTypes.array,
  technology_pretitle: PropTypes.string,
  technology_title: PropTypes.string,
  technology_image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  technology_text: PropTypes.string,
  technology_video_item: PropTypes.object,
  infographic_pretitle: PropTypes.string,
  infographic_items: PropTypes.array,
  team_pretitle: PropTypes.string,
  team_title: PropTypes.string,
  employees: PropTypes.array,
  vacancies: PropTypes.array,
  partners_pretitle: PropTypes.string,
  partners_title: PropTypes.string,
  partners_logos: PropTypes.array,
  footer_pretitle: PropTypes.string,
  footer_title: PropTypes.string,
  footer_links: PropTypes.array, 
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        intro_pretitle={frontmatter.intro.intro_pretitle}
        intro_title={frontmatter.intro.intro_title}
        intro_image={frontmatter.intro.intro_image}
        mission_pretitle={frontmatter.mission.mission_pretitle}
        mission_title={frontmatter.mission.mission_title}
        mission_video_item={frontmatter.mission.mission_video_item}
        solution_pretitle={frontmatter.solution.solution_pretitle}
        solution_title={frontmatter.solution.solution_title}
        solution_animation={frontmatter.solution.solution_animation}
        roadmap_pretitle={frontmatter.roadmap.roadmap_pretitle}
        roadmap_title={frontmatter.roadmap.roadmap_title}
        roadmap_items={frontmatter.roadmap.roadmap_items}
        technology_pretitle={frontmatter.technology.technology_pretitle}
        technology_title={frontmatter.technology.technology_title}
        technology_image={frontmatter.technology.technology_image}
        technology_text={frontmatter.technology.technology_text}
        technology_video_item={frontmatter.technology.technology_video_item}
        infographic_pretitle={frontmatter.infographic.infographic_pretitle}
        infographic_items={frontmatter.infographic.infographic_items}
        team_pretitle={frontmatter.team.team_pretitle}
        team_title={frontmatter.team.team_title}
        employees={frontmatter.team.employees}
        vacancies={frontmatter.team.vacancies}
        partners_pretitle={frontmatter.partners.partners_pretitle}
        partners_title={frontmatter.partners.partners_title}
        partners_logos={frontmatter.partners.partners_logos}
        footer_pretitle={frontmatter.footer.footer_pretitle}
        footer_title={frontmatter.footer.footer_title}
        footer_links={frontmatter.footer.footer_links}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        intro {
          intro_pretitle
          intro_title
          intro_image {
            childImageSharp {
              fluid(maxWidth: 1500, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        mission {
          mission_pretitle
          mission_title
          mission_video_item {
            mission_video_item_label
            mission_video_item_link
          }
        }
        solution {
          solution_pretitle
          solution_title
          solution_animation {
            solution_animation_title1
            solution_animation_title2
            solution_animation_title3
            solution_animation_title4
            solution_animation_title5
            solution_animation_title6
            solution_animation_title7
            solution_animation_title8
          }
        }
        roadmap {
          roadmap_pretitle
          roadmap_title
          roadmap_items {
            roadmap_item_year
            roadmap_item_title
            roadmap_item_text
            roadmap_item_icon {
              childImageSharp {
                fluid(maxWidth: 1500, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            roadmap_item_image {
              childImageSharp {
                fluid(maxWidth: 1500, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        technology {
          technology_pretitle
          technology_title
          technology_image {
            childImageSharp {
              fluid(maxWidth: 1500, quality: 60) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          technology_text
          technology_video_item {
            technology_video_item_label
            technology_video_item_link
          }
        }
        infographic {
          infographic_pretitle
          infographic_items {
            infographic_stage1
            infographic_stage2
            infographic_stage3
            infographic_stage4
            infographic_stage5
            infographic_stage6
            infographic_stage7
            infographic_stage8
          }
        }
        team {
          team_pretitle
          team_title
          employees {
            employee_name
            employee_function
            employee_text
            employee_linkedin
            employee_image {
              childImageSharp {
                fluid(maxWidth: 1500, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          vacancies {
            vacancy_title
            vacancy_description_short
            vacancy_description_full
          }
        }
        partners {
          partners_pretitle
          partners_title
          partners_logos {
            logo_image {
              childImageSharp {
                fluid(maxWidth: 1500, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            logo_link
          }
        }
        footer {
          footer_pretitle
          footer_title
          footer_links {
            footer_email_general
            footer_email_press
            footer_email_vacanties
            footer_link_twitter
            footer_link_linkedin
            footer_link_youtube
          }
        }
      }
    }
  }
`
