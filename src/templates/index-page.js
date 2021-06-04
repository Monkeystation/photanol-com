import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import ReactGA from 'react-ga'

import LogoPhotanol from '../components/LogoPhotanol'
import Layout from '../components/Layout'
import IntroSection from '../components/sections/IntroSection'
import MissionSection from '../components/sections/MissionSection'
import RoadmapSection from '../components/sections/RoadmapSection'
import TechnologySection from '../components/sections/TechnologySection'
import InfographicSection from '../components/sections/InfographicSection'
import SlideshowSection from '../components/sections/SlideshowSection'
import TeamSection from '../components/sections/TeamSection'
import VacanciesSection from '../components/sections/VacanciesSection'
import PartnersSection from '../components/sections/PartnersSection'
import FooterSection from '../components/sections/FooterSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import NewsSection from '../components/sections/NewsSection'

ReactGA.initialize('UA-126624514-4')
ReactGA.set({ anonymizeIp: true })

export const IndexPageTemplate = ({
  preview=false,
  intro,
  mission,
  testimonials,
  roadmap,
  technology,
  infographic,
  slideshow,
  team,
  vacancies,
  news,
  partners,
  footer
}) => {
  const [ccLoaded, setCcLoaded] = useState(false);

  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag['src'] = '/static/cookieconsent.min.js';
    scriptTag['data-cfasync'] = 'false';
    scriptTag.addEventListener('load', () => setCcLoaded(true));
    document.body.append(scriptTag);
  }, []);

  useEffect(() => {
    if (!ccLoaded) return;
    window.cookieconsent.initialise({
      // "palette": {
      //   "popup": {
      //     "background": "#ffffff",
      //     "text": "#0a064a"
      //   },
      //   "button": {
      //     "background": "#f7f8fa",
      //     "text": "#0a064a"
      //   }
      // },
      "content": {
        "message": "We use cookies to enhance your browsing experience and to analyze our website traffic through Google Analytics.",
        "dismiss": "OK",
        "link": "Learn more",
        "href": "/legal-disclaimer.pdf"
      }
    });
  }, [ccLoaded]);
  
  return (
    <>
      <div className="logo-container"><LogoPhotanol /></div>
      <IntroSection intro={intro} preview={preview} />
      <MissionSection mission={mission} preview={preview}  />
      {/*<SolutionSection solution={solution} />*/}
      <RoadmapSection roadmap={roadmap} preview={preview}  />
      <TechnologySection technology={technology} preview={preview}  />
      <InfographicSection infographic={infographic} preview={preview}  />
      <SlideshowSection slideshow={slideshow} preview={preview}  />
      <TestimonialsSection testimonials={testimonials} preview={preview}  />
      <TeamSection team={team} preview={preview}  />
      <VacanciesSection vacancies={vacancies} preview={preview}  />
      {/* <NewsSection news={news} preview={preview} /> */}
      <PartnersSection partners={partners} preview={preview}  />
      <FooterSection footer={footer} preview={preview}  />
    </>
  )
}

IndexPageTemplate.propTypes = {
  preview: PropTypes.bool,
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
    items: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        alt: PropTypes.string,
        text: PropTypes.string,
      })
    ),
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
  testimonials: PropTypes.shape({
    pretitle: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        quote: PropTypes.string,
        citation: PropTypes.string,
        image: PropTypes.object
      })
    ),
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
  vacancies: PropTypes.shape({
    novacancies: PropTypes.string,
    list: PropTypes.array,
  }),
  news: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    count: PropTypes.number,
    card: PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
      page_link: PropTypes.shape({
        label: PropTypes.string,
        link: PropTypes.string
      }),
      social_links: PropTypes.shape({
        link_twitter: PropTypes.string,
        link_linkedin: PropTypes.string,
        link_youtube: PropTypes.string
      })
    })
  }),
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
    erdf_logo: PropTypes.object
  })
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        intro={frontmatter.intro}
        mission={frontmatter.mission}
        // solution={frontmatter.solution}
        roadmap={frontmatter.roadmap}
        technology={frontmatter.technology}
        infographic={frontmatter.infographic}
        testimonials={frontmatter.testimonials}
        slideshow={frontmatter.slideshow}
        team={frontmatter.team}
        news={frontmatter.news}
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
  })
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
                fluid(maxWidth: 500, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            image {
              childImageSharp {
                fluid(maxWidth: 500, quality: 80) {
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
            image {
              publicURL
            },
            alt,
            text
          }
        }
        slideshow {
          image1 {
            image {
              childImageSharp {
                fluid(maxWidth: 1280, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }   
            alt
          }
          image2 {
            image {
              childImageSharp {
                fluid(maxWidth: 1280, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
          image3 {
            image {
              childImageSharp {
                fluid(maxWidth: 1280, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            alt
          }
        }
        testimonials {
          pretitle
          title
          items {
            quote
            citation
            image {
              publicURL
            }
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
                fluid(maxWidth: 1200, quality: 80) {
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
        news {
          pretitle
          title
          count
          card {
            title
            text
            page_link {
              label
              link
            }
            social_links {
              link_twitter
              link_linkedin
              link_youtube
            }
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
                fluid(maxWidth: 500, quality: 80) {
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
          erdf_logo {
            image {
              publicURL
            }
            alt
            link
            label
          }
        }
      }
    }
  }
`
