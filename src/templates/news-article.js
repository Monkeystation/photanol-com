import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Paragraph from '../components/blocks/Paragraph'
import Heading from '../components/blocks/Heading'
import Subheading from '../components/blocks/Subheading'
import Quote from '../components/blocks/Quote'
import Image from '../components/blocks/Image'
import Video from '../components/blocks/Video'
import ParagraphImage from '../components/blocks/ParagraphImage'

export const NewsArticleTemplate = ({
  title,
  description,
  image,
  blocks,
}) => {
  
  const getBlockContent = (block, index) => {
    switch(block.type) {
      case 'paragraph':
        return (
          <Paragraph heading={block.heading} subheading={block.subheading} paragraph={block.paragraph} key={index} />
        )
      case 'heading':
        return (
          <Heading text={block.heading} key={index} />
        )
      case 'subheading':
        return (
          <Subheading text={block.subheading} key={index} />
        )
      case 'quote':
        return (
          <Quote quote={block.quote} citation={block.citation} key={index} />
        )
      case 'image':
        return (
          <Image file={block.image.file} alt={block.image.alt} key={index} />
        )
      case 'video':
        return (
          <Video id={block.youtubeId} key={index} />
        )
      case 'paragraphimage':
        return (
          <ParagraphImage file={block.image.file} alt={block.image.alt} text={block.paragraph} key={index} />
        )
    }
  }

  return (
    <section className="news">
      <Helmet titleTemplate="%s | News">
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="section">
        <div className="columns">
          <div className="column">
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">
              {title}
            </h1>
            <p className="blue-text py-3">{description}</p>
            <PreviewCompatibleImage imageInfo={{
              image: image, 
              style: {maxHeight: '100%'},
              imgStyle: {objectFit: 'contain'}
            }} />
          </div>
        </div>
        <div className="blocks">
            {blocks.map((block, index) => (
              getBlockContent(block, index)
            ))}
          </div>
      </div>
    </section>
  )
}

NewsArticleTemplate.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  blocks: PropTypes.array,
}

const NewsArticle = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <NewsArticleTemplate
        title={frontmatter.title}
        date={frontmatter.date}
        description={frontmatter.description}
        image={frontmatter.image}
        blocks={frontmatter.blocks}
      />
    </Layout>
  )
}

NewsArticle.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default NewsArticle

export const pageQuery = graphql`
  query NewsArticleByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 1280, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        blocks {
          ...Paragraph
          ...Heading
          ...Subheading
          ...Quote
          ...Image
          ...Video
          ...ParagraphImage
        }
      }
    }
  }

  fragment Paragraph on Block {
    type
    heading
    subheading
    paragraph
  }

  fragment Heading on Block {
    type
    heading
  }

  fragment Subheading on Block {
    type
    subheading
  }

  fragment Quote on Block {
    type
    quote
    citation
  }

  fragment Image on Block {
    type
    image {
      file {
        childImageSharp {
          fluid(maxWidth: 1280, quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alt
    }
    alt
  }

  fragment Video on Block {
    type
    youtubeId
  }

  fragment ParagraphImage on Block {
    type
    paragraph
    image {
      file {
        childImageSharp {
          fluid(maxWidth: 1280, quality: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alt
    }
    align
  }
`
