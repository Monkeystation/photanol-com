import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class NewsList extends React.Component {
  render() {
    const { data, extra, count } = this.props
    const articles = count ? data.allMarkdownRemark.nodes.slice(0, count) : data.allMarkdownRemark.nodes

    return (
      <div className="columns is-multiline">
        {articles && articles.map((article) => (
            <div className="is-parent column is-6" key={article.id}>
              <Link to={article.fields.slug}>
                <article className={`blog-list-item tile is-child box notification ${article.frontmatter.featured ? 'is-featured' : ''}`}>
                  <PreviewCompatibleImage imageInfo={{
                    image: article.frontmatter.image, 
                    alt: article.frontmatter.title,
                    style: {height: '300px'}
                  }}/>
                  <h5 className="subtitle green-text has-text-weight-bold is-uppercase is-7">
                    {article.frontmatter.date}
                  </h5>
                  <h1 className="title is-family-secondary is-spaced blue-text has-text-weight-bold is-size-5 is-size-6-mobile">
                    {article.frontmatter.title}
                  </h1>
                </article>
              </Link>
            </div>
          ))
        }
        {extra && (
          <div className="is-parent column is-6">
            <article className={`blog-list-item tile is-child box notification`}>
              {extra}
            </article>
          </div>
        )}
      </div>
    )
  }
}

NewsList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      nodes: PropTypes.array,
    }),
  }),
}

export default (props) => (
  <StaticQuery
    query={graphql`
      query NewsListQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "news-article" } } }
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              description
              featured
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
    `}
    render={data => <NewsList data={data} {...props} />}
  />
)