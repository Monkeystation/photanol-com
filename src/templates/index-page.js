import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'

export const IndexPageTemplate = ({
  
}) => (
  <div>
    <section className="section intro py-0" >
      <div className="has-background-light">
        <div className="container">
          <div className="columns">
            <div className="column is-5-desktop is-4 is-offset-4 py-6">
              <h5 class="subtitle green-text has-text-weight-bold is-uppercase">powered by the sun</h5>
              <h1 className="title blue-text has-text-weight-bold is-size-5-mobile is-size-4-tablet is-size-3-desktop is-size-3-fullhd">
                We transform CO₂ into renewable carbon compounds.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section mission">
      <div className="container">
        <div className="columns">
          <div className="column is-12 has-background-light">
            <div className="column is-12 py-6">
            <h5 class="subtitle blue-text has-text-weight-bold is-uppercase">what we stand for</h5>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-4-mobile is-size-3-tablet is-size-2-desktop is-size-2-fullhd">
              Caring for a bright future on this planet, we believe in restoring balance through human ingenuity.
            </h1>
            <button class="button">
              <span class="icon">
                <i class="fab fa-github"></i>
              </span>
              <span>Watch brandmovie</span>
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
            <h5 class="subtitle blue-text has-text-weight-bold is-uppercase">what we are working on</h5>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">
              The future is circulair
            </h1>
          </div>
        </div>
      </div>
    </section>
    <section className="section timeline has-background-primary" style={{height:'500px'}}>
      <div className="columns">
        <div className="column is-12">
          <h5 class="subtitle white-text has-text-weight-bold is-uppercase">it is looking bright</h5>
          <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">
            Past, present and future
          </h1>
        </div>
      </div>
    </section>
    <section className="section how">
      <div className="container">
        <div className="columns">
          <div className="column is-12 has-background-light">
            <h5 class="subtitle blue-text has-text-weight-bold is-uppercase">this is how we do it</h5>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">
              Create natural all-in-one mini factories
            </h1>
          </div>
        </div>
      </div>
    </section>
    <section className="section infographic">
      <div className="container">
        <div className="columns">
          <div className="column is-12 has-background-dark" style={{height:'500px'}}>
          </div>
        </div>
      </div>
    </section>
    <section className="section team has-background-light" style={{height:'500px'}}>
    </section>
    <section className="section partners">
      <div className="container">
        <div className="columns">
          <div className="column is-12 has-background-dark" style={{height:'500px'}}>
          </div>
        </div>
      </div>
    </section>
  </div>
  
  
)

IndexPageTemplate.propTypes = {
  intro_image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
  
  
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        intro_image={frontmatter.intro_image}
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

      }
    }
  }
`
