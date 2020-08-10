import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import showdown from 'showdown'
import Img from 'gatsby-image'
import {LogoPhotanol, IconPlay, IconTwitter, IconLinkedIn, IconYoutube} from '../components/Icons'
import { Controller, Scene } from 'react-scrollmagic'
import { Tween } from 'react-gsap'
import YouTube from 'react-youtube'

import Layout from '../components/Layout'
import Roadmap from '../components/Roadmap'
import Team from '../components/Team'
import Vacancies from '../components/Vacancies'
import Partners from '../components/Partners'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const converter = new showdown.Converter()
converter.setOption('simpleLineBreaks', true)


export const IndexPageTemplate = ({
  intro_pretitle,
  intro_title,
  intro_video,
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
  partners_side_logo_image,
  partners_side_logo_link,
  footer_pretitle,
  footer_title,
  footer_links, 
}) => {
  const [showMissionVideoModal, setShowMissionVideoModal] = useState(false)
  const [missionVideoPlayer, setMissionVideoPlayer] = useState(null)
  const [showBrandVideoModal, setShowBrandVideoModal] = useState(false)
  const [brandVideoPlayer, setBrandVideoPlayer] = useState(null)
  
  const onMissionYoutubeReady = (event) => {
    setMissionVideoPlayer(event.target)
  }
  
  const onMissionVideoModalOpen = () => {
    setShowMissionVideoModal(true)
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("is-clipped")
  }
  
  const onMissionVideoModalClose = () => {
    if (missionVideoPlayer) missionVideoPlayer.stopVideo()
    setShowMissionVideoModal(false)
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("is-clipped")
  }
  
  const onBrandYoutubeReady = (event) => {
    setBrandVideoPlayer(event.target)
  }
  
  const onBrandVideoModalOpen = () => {
    setShowBrandVideoModal(true)
    var html = document.getElementsByTagName("html")[0];
    html.classList.add("is-clipped")
  }
  
  const onBrandVideoModalClose = () => {
    if (brandVideoPlayer) brandVideoPlayer.stopVideo()
    setShowBrandVideoModal(false)
    var html = document.getElementsByTagName("html")[0];
    html.classList.remove("is-clipped")
  }
  
  return (
    <div>
      <div className="logo-container"><LogoPhotanol /></div>
      {/* 
        INTRO 
      */}
      <Controller globalSceneOptions={{ triggerHook: 'onLeave' }}>
        <Scene pin duration={500} offset={-100} indicators={false}>
          {(progress) => (
          <section className="section intro">
            <div className="video-panel hero-video">
              <video poster={intro_video.poster.publicURL} playsInline autoPlay muted loop>
                <source src={intro_video.file.publicURL} type="video/mp4" />
              </video>
            </div>
            <Tween
              paused
              from={{ clipPath: 'inset(0 0 0% 0)' }}
              to={{ clipPath: 'inset(0 0 100% 0)' }}
              totalProgress={progress}
            >
            <section className="section text-panel-wrapper">
              <div className="text-panel">
                <div className="container text">
                  <h5 className="subtitle green-text has-text-weight-bold is-uppercase">{intro_pretitle}</h5>
                  <h1 className="title blue-text has-text-weight-bold is-size-4-mobile is-size-4-tablet is-size-3-desktop is-size-2-fullhd" dangerouslySetInnerHTML={{__html: converter.makeHtml(intro_title)}}></h1>
                </div>
              </div>
            </section>
            </Tween>
          </section>
          )} 
        </Scene>
      </Controller>
      {/* 
        MISSION 
      */}
      <section className="section mission">
        <div className="container">
          <div className="columns">
            <div className="column is-12">
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase">{mission_pretitle}</h5>
              <h1 className="title is-family-secondary has-text-weight-bold is-size-4-mobile is-size-3-tablet is-size-2-desktop is-size-1-fullhd">{mission_title}</h1>
              <button className="button-primary" onClick={onMissionVideoModalOpen}>
                <span className="icon">
                  <IconPlay />
                </span>
                <span>{mission_video_item.mission_video_item_label}</span>
              </button>
            </div>
          </div>
        </div>
        <div className={`modal ${showMissionVideoModal ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={onMissionVideoModalClose}></div>
          <div className="modal-content is-full">
            <figure className="image is-16by9">
              <YouTube className="has-ratio" videoId={mission_video_item.mission_video_item_link} onReady={onMissionYoutubeReady} />
            </figure>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={onMissionVideoModalClose}></button>
        </div>
      </section>
      {/* 
        SOLUTION 
      */}
      <section className="section solution" id="product">
        <div className="container">
          <div className="columns">
            <div className="column is-12">
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase">{solution_pretitle}</h5>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">{solution_title}</h1>
            </div>
          </div>
          <div className="columns">
            <div className="column is-8 is-offset-2">
              <img src="/img/animation-placeholder.jpg" />
            </div>
          </div>
        </div>
      </section>
      {/* 
        ROADMAP 
      */}
      <section className="section roadmap has-background-primary">
        <div className="container">
          <div className="columns">
            <div className="column is-12">
              <h5 className="subtitle white-text has-text-weight-bold is-uppercase">{roadmap_pretitle}</h5>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">{roadmap_title}</h1>
            </div>
          </div>
        </div>
        <Roadmap items={roadmap_items} />
      </section>
      {/* 
        TECHNOLOGY 
      */}
      <section className="section technology" id="technology">
        <div className="container">
          <div className="columns">
            <div className="column is-12">
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase">{technology_pretitle}</h5>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">{technology_title}</h1>
            </div>
          </div>
          <div className="columns">
            <div className="column is-8 text-columns">
              <p className="blue-text technology-text">{technology_text}</p>
              <button className="button-primary mt-4" onClick={onBrandVideoModalOpen}>
                <span className="icon">
                  <IconPlay />
                </span>
                <span>{technology_video_item.technology_video_item_label}</span>
              </button>
            </div>
            <div className={`modal ${showBrandVideoModal ? 'is-active' : ''}`}>
              <div className="modal-background" onClick={onBrandVideoModalClose}></div>
              <div className="modal-content  is-full">
                <figure className="image is-16by9">
                  <YouTube className="has-ratio" videoId={technology_video_item.mission_video_item_link} onReady={onBrandYoutubeReady} />
                </figure>
              </div>
              <button className="modal-close is-large" aria-label="close" onClick={onBrandVideoModalClose}></button>
            </div>
          </div>
        </div>
      </section>
      {/* 
        INFOGRAPHIC 
      */}
      <section className="section infographic">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1" >
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase">{infographic_pretitle}</h5>
                <img src="/img/infographic-placeholder.jpg" width='100%' />
            </div>
          </div>
        </div>
      </section>
      {/* 
        TEAM 
      */}
      <section className="section team" id="team">
        <div className="container text">
          <h5 className="subtitle blue-text has-text-weight-bold is-uppercase">{team_pretitle}</h5>
          <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">{team_title}</h1>
        </div>
        <Team employees={employees} />
        <div className="vacancies-wrapper mt-4" id="jobs">
          <h5 className="subtitle green-text has-text-weight-bold is-uppercase">{'VACANCIES'}</h5>
          <Vacancies vacancies={vacancies} />
        </div>
      </section>
      {/* 
        PARTNERS 
      */}
      <section className="section partners">
        <div className="container">
          <div className="columns">
            <div className="column is-12">
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase">{partners_pretitle}</h5>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">{partners_title}</h1>
              <div className="columns">
                <div className="column is-three-quarters-tablet">
                  <Partners logos={partners_logos} />
                </div>
                <div className="column side-image-column">
                  <a className="side-image" href={partners_side_logo_link} target="_blank">
                    <PreviewCompatibleImage imageInfo={{
                      image: partners_side_logo_image, 
                      alt: '',
                      style: {maxHeight: '100%'},
                      imgStyle: {objectFit: 'contain'}
                    }} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 
        FOOTER 
      */}
      <section className="section footer has-background-light mx-6 my-6" id="contact">
        <div className="container">
          <div className="columns">
            <div className="column is-12">
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase">{footer_pretitle}</h5>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3">{footer_title}</h1>
              <div className="footer-elements">
                <div className="footer-element">
                  <h5 className="grey-text has-text-weight-bold is-uppercase is-size-7">General inquiries</h5>
                  <div><a href={`mailto:${footer_links.footer_email_general}`} className="black-text">{footer_links.footer_email_general}</a></div>
                </div>
                <div className="footer-element">
                  <h5 className="grey-text has-text-weight-bold is-uppercase is-size-7">press & interviews</h5>
                  <div><a href={`mailto:${footer_links.footer_email_press}`} className="black-text">{footer_links.footer_email_press}</a></div>
                </div>
                <div className="footer-element">
                  <h5 className="grey-text has-text-weight-bold is-uppercase is-size-7">vacancies</h5>
                  <div><a href={`mailto:${footer_links.footer_email_vacancies}`} className="black-text">{footer_links.footer_email_vacancies}</a></div>
                </div>
                <div className="footer-element">
                  <h5 className="grey-text has-text-weight-bold is-uppercase is-size-7">Follow us on social media</h5>
                  <div className="social-media">
                    <a href={footer_links.footer_link_twitter} target="_blank" className="button-secondary">
                      <span className="icon"><IconTwitter /></span>
                      <span>{'TWITTER'}</span>
                    </a>
                    <a href={footer_links.footer_link_linkedin} target="_blank" className="button-secondary">
                      <span className="icon"><IconLinkedIn /></span>
                      <span>{'LINKEDIN'}</span>
                    </a>
                    <a href={footer_links.footer_link_youtube} target="_blank" className="button-secondary">
                      <span className="icon"><IconYoutube /></span>
                      <span>{'YOUTUBE'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

IndexPageTemplate.propTypes = {
  intro_pretitle: PropTypes.string,
  intro_title: PropTypes.string,
  intro_video: PropTypes.object,
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
  infographic_items: PropTypes.object,
  team_pretitle: PropTypes.string,
  team_title: PropTypes.string,
  employees: PropTypes.array,
  vacancies: PropTypes.array,
  partners_pretitle: PropTypes.string,
  partners_title: PropTypes.string,
  partners_logos: PropTypes.array,
  partners_side_logo_image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  partners_side_logo_link: PropTypes.string,
  footer_pretitle: PropTypes.string,
  footer_title: PropTypes.string,
  footer_links: PropTypes.object, 
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        intro_pretitle={frontmatter.intro.intro_pretitle}
        intro_title={frontmatter.intro.intro_title}
        intro_video={frontmatter.intro.intro_video}
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
        partners_side_logo_image={frontmatter.partners.partners_side_logo.side_logo_image}
        partners_side_logo_link={frontmatter.partners.partners_side_logo.side_logo_link}
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
          intro_video {
            file {
              publicURL
            }
            poster {
              publicURL
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
              publicURL
            }
            roadmap_item_image {
              publicURL
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
              publicURL
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
              publicURL
            }
            logo_link
          }
          partners_side_logo {
            side_logo_link
            side_logo_image {
              childImageSharp {
                fluid(maxWidth: 500, quality: 60) {
                  ...GatsbyImageSharpFluid
                }
              }
            }         
          } 
        }
        footer {
          footer_pretitle
          footer_title
          footer_links {
            footer_email_general
            footer_email_press
            footer_email_vacancies
            footer_link_twitter
            footer_link_linkedin
            footer_link_youtube
          }
        }
      }
    }
  }
`
