const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type Image {
      file: File @fileByRelativePath
      alt: String
    }

    type Block {
      type: String
      paragraph: String
      heading: String
      preheading: String
      quote: String
      citation: String
      image: Image
      alt: String
      youtubeId: String
      align: Boolean
    }

    type MarkdownRemarkFrontmatter {
      blocks: [Block]
    }

    type Post {
      templateKey: String!
      title: String!
      date: String!
      description: String!
      image: Image!
      blocks: [Block]
    }

    type Vacancy {
      title: String
      description_short: String
      description_full: String
    }

    type MarkdownRemarkFrontmatterVacancies {
      novacancies: String
      list: [Vacancy]
    }

    type Testimonial {
      quote: String
      citation: String
      image: File @fileByRelativePath
    }

    type MarkdownRemarkFrontmatterTestimonials {
      pretitle: String
      title: String
      items: [Testimonial]
    }
  `
  createTypes(typeDefs)
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
          frontmatter {
            templateKey
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      result.errors.forEach((e) => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.nodes

    posts.forEach((node) => {
      const id = node.id
      createPage({
        path: node.fields.slug,
        tags: node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach((node) => {
      if (_.get(node, `node.frontmatter.tags`)) {
        tags = tags.concat(node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node) // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
