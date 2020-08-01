import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
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
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

/*
  <div>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`,
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(255, 68, 0)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {title}
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
            backgroundColor: 'rgb(255, 68, 0)',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
          }}
        >
          {subheading}
        </h3>
      </div>
    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">  
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/products">
                      See all products
                    </Link>
                  </div>
                </div>
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  */

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
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
