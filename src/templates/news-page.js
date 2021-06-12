import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import NewsList from '../components/NewsList'

export const NewsPageTemplate = ({
  title,
  text,
  articles
}) => {
  return (
    <div className="news">
      <Helmet titleTemplate="News">
        <title>{title}</title>
        <meta name="description" content={text} />
      </Helmet>
      <section className="news-intro">
        <div className="container is-max-desktop">
          <div className="columns">
            <div className="column">
              <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">
                {title}
              </h1>
              <p className="blue-text py-3">{text}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="articles">
        <div className="container is-max-desktop">
          <NewsList articles={articles} />
        </div>
      </section>
    </div>
  )
}

NewsPageTemplate.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string,
      image: PropTypes.object
    })
  )
}

const NewsPage = ({ data }) => {
  const page = data.page.frontmatter
  const articles = data.articles.nodes.map(node => node.frontmatter)
  return (
    <Layout>
      <NewsPageTemplate
        title={page.title}
        text={page.text}
        articles={articles}
      />
    </Layout>
  )
}

NewsPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      frontmatter: PropTypes.object
    }),
    articles: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.object
        })
      )
    })
  })
}

export default NewsPage

export const pageQuery = graphql`
  query NewsPageTemplate {
    page: markdownRemark(frontmatter: { templateKey: { eq: "news-page" } }) {
      id
      frontmatter {
        title
        text
      }
    }
    articles: allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "news-article"}}}) {
      nodes {
        frontmatter {
          title
          description
          date(formatString: "MMMM DD, YYYY")
          image {
            childImageSharp {
              fluid(maxWidth: 500, quality: 80) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
