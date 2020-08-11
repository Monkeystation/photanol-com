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
import PreviewCompatibleFile from '../components/PreviewCompatibleFile'

const converter = new showdown.Converter()
converter.setOption('simpleLineBreaks', true)


export const IndexPageTemplate = ({
  intro,
  mission,
  solution,
  roadmap,
  technology,
  infographic,
  team,
  vacancies,
  partners,
  footer,
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
  
  console.log(intro, PreviewCompatibleFile(intro.video.poster))
  
  return (
    <div>
      <div className="logo-container"><LogoPhotanol /></div>
      {/* 
        INTRO 
      */}
      <Controller globalSceneOptions={{ triggerHook: 'onLeave' }}>
        <Scene pin duration={600} offset={0} indicators={false}>
          {(progress) => (
          <section className="intro">
            <div className="video-panel hero-video">
              <video poster={PreviewCompatibleFile(intro.video.poster)} playsInline autoPlay muted loop>
                <source src={PreviewCompatibleFile(intro.video.file)} type="video/mp4" />
              </video>
            </div>
            <Tween
              paused
              from={{ clipPath: 'inset(0 0 0% 0)' }}
              to={{ clipPath: 'inset(0 0 100% 0)' }}
              totalProgress={progress}
            >
            <section className="text-panel-wrapper">
              <div className="text-panel">
                <div className="container text">
                  <h5 className="subtitle green-text has-text-weight-bold is-uppercase is-size-7-mobile">{intro.pretitle}</h5>
                  <h1 className="title blue-text has-text-weight-bold is-size-5-mobile is-size-4-tablet is-size-3-desktop is-size-2-fullhd" dangerouslySetInnerHTML={{__html: converter.makeHtml(intro.title)}}></h1>
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
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-size-7-mobile">{mission.pretitle}</h5>
              <h1 className="title is-family-secondary has-text-weight-bold is-size-5-mobile is-size-3-tablet is-size-2-desktop is-size-1-fullhd">{mission.title}</h1>
              <button className="button-primary" onClick={onMissionVideoModalOpen}>
                <span className="icon">
                  <IconPlay />
                </span>
                <span>{mission.video_item.label}</span>
              </button>
            </div>
          </div>
        </div>
        <div className={`modal ${showMissionVideoModal ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={onMissionVideoModalClose}></div>
          <div className="modal-content is-full">
            <figure className="image is-16by9">
              <YouTube className="has-ratio" videoId={mission.video_item.link} onReady={onMissionYoutubeReady} />
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
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-size-7-mobile">{solution.pretitle}</h5>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{solution.title}</h1>
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
              <h5 className="subtitle white-text has-text-weight-bold is-uppercase is-size-7-mobile">{roadmap.pretitle}</h5>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{roadmap.title}</h1>
            </div>
          </div>
        </div>
        <Roadmap items={roadmap.items} />
      </section>
      {/* 
        TECHNOLOGY 
      */}
      <section className="section technology" id="technology">
        <div className="container">
          <div className="columns">
            <div className="column is-12">
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-size-7-mobile">{technology.pretitle}</h5>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{technology.title}</h1>
            </div>
          </div>
          <div className="columns">
            <div className="column is-8 text-columns">
              <p className="blue-text technology-text">{technology.text}</p>
              <button className="button-primary mt-4" onClick={onBrandVideoModalOpen}>
                <span className="icon">
                  <IconPlay />
                </span>
                <span>{technology.video_item.label}</span>
              </button>
            </div>
            <div className={`modal ${showBrandVideoModal ? 'is-active' : ''}`}>
              <div className="modal-background" onClick={onBrandVideoModalClose}></div>
              <div className="modal-content is-full">
                <figure className="image is-16by9">
                  <YouTube className="has-ratio" videoId={technology.video_item.link} onReady={onBrandYoutubeReady} />
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
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-size-7-mobile">{infographic.pretitle}</h5>
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
          <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-size-7-mobile">{team.pretitle}</h5>
          <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{team.title}</h1>
        </div>
        <Team employees={team.employees} />
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
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-size-7-mobile">{partners.pretitle}</h5>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{partners.title}</h1>
              <div className="columns">
                <div className="column is-three-quarters-tablet">
                  <Partners logos={partners.logos} />
                </div>
                <div className="column side-image-column">
                  <a className="side-image" href={partners.side_logo.link} target="_blank">
                    <PreviewCompatibleImage imageInfo={{
                      image: partners.side_logo.image, 
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
      <section className="section footer has-background-light" id="contact">
        <div className="container">
          <div className="columns">
            <div className="column is-12">
              <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-size-7-mobile">{footer.pretitle}</h5>
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{footer.title}</h1>
              <div className="footer-elements">
                <div className="footer-element">
                  <h5 className="grey-text has-text-weight-bold is-uppercase is-size-7">General inquiries</h5>
                  <div><a href={`mailto:${footer.links.email_general}`} className="black-text">{footer.links.email_general}</a></div>
                </div>
                <div className="footer-element">
                  <h5 className="grey-text has-text-weight-bold is-uppercase is-size-7">press & interviews</h5>
                  <div><a href={`mailto:${footer.links.email_press}`} className="black-text">{footer.links.email_press}</a></div>
                </div>
                <div className="footer-element">
                  <h5 className="grey-text has-text-weight-bold is-uppercase is-size-7">vacancies</h5>
                  <div><a href={`mailto:${footer.links.email_vacancies}`} className="black-text">{footer.links.email_vacancies}</a></div>
                </div>
                <div className="footer-element">
                  <h5 className="grey-text has-text-weight-bold is-uppercase is-size-7">Follow us on social media</h5>
                  <div className="social-media">
                    <a href={footer.links.link_twitter} target="_blank" className="button-secondary">
                      <span className="icon"><IconTwitter /></span>
                      <span>{'TWITTER'}</span>
                    </a>
                    <a href={footer.links.link_linkedin} target="_blank" className="button-secondary">
                      <span className="icon"><IconLinkedIn /></span>
                      <span>{'LINKEDIN'}</span>
                    </a>
                    <a href={footer.links.link_youtube} target="_blank" className="button-secondary">
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
    items: PropTypes.array,
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
  team: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    employees: PropTypes.array,
  }),
  vacancies: PropTypes.array,
  partners: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    logos: PropTypes.array,
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
        team={frontmatter.team}
        vacancies={frontmatter.team.vacancies}
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
          items {
            year
            title
            text
            icon {
              publicURL
            }
            image {
              publicURL
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
              publicURL
            }
          }
          vacancies {
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
