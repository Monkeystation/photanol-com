import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import ReactGA from 'react-ga'

import {LogoPhotanol} from '../components/Icons'
import Layout from '../components/Layout'
import IntroSection from '../sections/IntroSection'
import MissionSection from '../sections/MissionSection'
import SolutionSection from '../sections/SolutionSection'
import RoadmapSection from '../sections/RoadmapSection'
import TechnologySection from '../sections/TechnologySection'
import InfographicSection from '../sections/InfographicSection'
import SlideshowSection from '../sections/SlideshowSection'
import TeamSection from '../sections/TeamSection'
import VacanciesSection from '../sections/VacanciesSection'
import PartnersSection from '../sections/PartnersSection'
import FooterSection from '../sections/FooterSection'

ReactGA.initialize('UA-126624514-4')
ReactGA.set({ anonymizeIp: true })

export const IndexPageTemplate = ({
  intro,
  mission,
  solution,
  roadmap,
  technology,
  infographic,
  slideshow,
  team,
  vacancies,
  partners,
  footer,
}) => {
    
  return (
    <div>
      <div className="logo-container"><LogoPhotanol /></div>
      <IntroSection intro={intro} />
      <MissionSection mission={mission} />
      <SolutionSection solution={solution} />
      <RoadmapSection roadmap={roadmap} />
      <TechnologySection technology={technology} />
      <InfographicSection infographic={infographic} />
      <SlideshowSection slideshow={slideshow} />
      <TeamSection team={team} />
      <VacanciesSection vacancies={vacancies} />
      <PartnersSection partners={partners} />
      <FooterSection footer={footer} />
    </div>
  )
}

IndexPageTemplate.propTypes = {
  intro: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.shape({
      file: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      poster: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
  }),
  mission: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    video_item: PropTypes.object,
  }),
  solution: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    animation: PropTypes.object,
  }),
  roadmap: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    active: PropTypes.number,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        year: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
        icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      })
    )
  }),
  technology: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    video_item: PropTypes.object,
  }),
  infographic: PropTypes.shape({
    pretitle: PropTypes.string,
    items: PropTypes.object,
  }),
  slideshow: PropTypes.shape({
    image1: PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      alt: PropTypes.string,
    }),
    image2: PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      alt: PropTypes.string,
    }),
    image3: PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      alt: PropTypes.string,
    }),
  }),
  team: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    employees: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        function: PropTypes.string,
        text: PropTypes.string,
        linkedin: PropTypes.string,
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      })
    ),
  }),
  vacancies: PropTypes.array,
  partners: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    logos: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.object,
        link: PropTypes.string,
      })
    ),
    side_logo_image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    pside_logo_link: PropTypes.string,
  }),
  footer: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    links: PropTypes.object,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        intro={frontmatter.intro}
        mission={frontmatter.mission}
        solution={frontmatter.solution}
        roadmap={frontmatter.roadmap}
        technology={frontmatter.technology}
        infographic={frontmatter.infographic}
        slideshow={frontmatter.slideshow}
        team={frontmatter.team}
        vacancies={frontmatter.vacancies}
        partners={frontmatter.partners}
        footer={frontmatter.footer}
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
          pretitle
          title
          video {
            file {
              publicURL
            }
            poster {
              publicURL
            }
          }
        }
        mission {
          pretitle
          title
          video_item {
            label
            link
          }
        }
        solution {
          pretitle
          title
          animation {
            title1
            title2
            title3
            title4
            title5
            title6
            title7
            title8
          }
        }
        roadmap {
          pretitle
          title
          active
          items {
            year
            title
            text
            icon {
              childImageSharp {
                fluid(maxWidth: 500, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            image {
              childImageSharp {
                fluid(maxWidth: 500, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        technology {
          pretitle
          title
          text
          video_item {
            label
            link
          }
        }
        infographic {
          pretitle
          items {
            stage1
            stage2
            stage3
            stage4
            stage5
            stage6
            stage7
            stage8
          }
        }
        slideshow {
          image1 {
            image {
              childImageSharp {
                fluid(maxWidth: 1280, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }   
            alt
          }
          image2 {
            image {
              childImageSharp {
                fluid(maxWidth: 1280, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
          image3 {
            image {
              childImageSharp {
                fluid(maxWidth: 1280, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
        }
        team {
          pretitle
          title
          employees {
            name
            function
            text
            linkedin
            image {
              childImageSharp {
                fluid(maxWidth: 1280, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        vacancies {
          novacancies
          list {
            title
            description_short
            description_full
          }
        }
        partners {
          pretitle
          title
          logos {
            image {
              publicURL
            }
            link
            alt
          }
          side_logo {
            image {
              childImageSharp {
                fluid(maxWidth: 500, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            link
            alt
          } 
        }
        footer {
          pretitle
          title
          links {
            email_general
            email_press
            email_vacancies
            link_twitter
            link_linkedin
            link_youtube
          }
        }
      }
    }
  }
`
