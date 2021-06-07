import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Quote from '../components/blocks/Quote'
import Image from '../components/blocks/Image'
import Video from '../components/blocks/Video'
import Text from '../components/blocks/Text'
import ImageText from '../components/blocks/ImageText'

export const DynamicPageTemplate = ({
  preview=false,
  path=null,
  title,
  description,
  image,
  blocks,
}) => {
  
  const getBlockContent = (block, index) => {
    switch(block.type) {
      case 'text':
        return (
          <Text 
            heading={block.heading} 
            preheading={block.preheading} 
            paragraph={block.paragraph} 
            key={index} 
          />
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
      case 'imagetext':
        return (
          <ImageText 
            file={block.image.file} 
            alt={block.image.alt} 
            align={block.align} 
            heading={block.heading} 
            preheading={block.preheading} 
            paragraph={block.paragraph} 
            key={index} 
          />
        )
    }
  }

  return (
    <section className="dynamic">
      <Helmet titleTemplate="%s | News">
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {preview && 
        <p className="blue-text py-3 has-text-weight-bold" style={{backgroundColor: 'rgb(221, 245, 249)', textAlign: 'center'}}>
          <a href={"https://photanol.com/page/" + path} target="_blank">https://photanol.com/page/{path}</a>
        </p>
      }
      <section className="header">
        <div className="background">
          <PreviewCompatibleImage imageInfo={{
            image: image
          }} />
        </div>
        <div className="text-panel">
        <h1 className="title is-family-secondary white-text has-text-weight-bold is-size-3 is-size-4-mobile">
          {title}
        </h1>
        <p className="white-text py-3">{description}</p>
         </div>
      </section>
      <div className="section">
        <div className="blocks">
          {blocks && blocks.length && blocks.map((block, index) => (
            getBlockContent(block, index)
          ))}
        </div>
      </div>
    </section>
  )
}

DynamicPageTemplate.propTypes = {
  preview: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  blocks: PropTypes.array,
}

const DynamicPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <DynamicPageTemplate
        title={frontmatter.title}
        date={frontmatter.date}
        description={frontmatter.description}
        image={frontmatter.image}
        blocks={frontmatter.blocks}
      />
    </Layout>
  )
}

DynamicPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default DynamicPage

export const pageQuery = graphql`
  query DynamicPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "dynamic-page" } }) {
      frontmatter {
        path
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 80) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        blocks {
          ...Text
          ...Quote
          ...Image
          ...Video
          ...ImageText
        }
      }
    }
  }

  fragment Text on Block {
    type
    preheading
    heading
    paragraph
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

  fragment ImageText on Block {
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
    align
    preheading
    heading
    paragraph
  }
`
