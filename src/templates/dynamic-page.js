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
import ScrollAnimation from 'react-animate-on-scroll'

export const DynamicPageTemplate = ({
  preview=false,
  title,
  description,
  image,
  blocks,
}) => {

  const stringToSlug = (str) => {
    str = str.replace(/^\s+|\s+$/g, '');
    str = str.toLowerCase();
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    return str;
}
  
  const getBlockContent = (block, index) => {
    switch(block.type) {
      case 'text':
        return (
          <Text 
            heading={block.heading} 
            preheading={block.preheading} 
            paragraph={block.paragraph} 
            key={index} 
            preview={preview}
          />
        )
      case 'quote':
        return (
          <Quote quote={block.quote} citation={block.citation} key={index} preview={preview} />
        )
      case 'image':
        if ('image' in block) {
          return (
            <Image file={block.image.file} alt={block.image.alt} key={index} preview={preview} />
          )
        } else {
          return null
        }
      case 'video':
        return (
          <Video id={block.youtubeId} key={index} preview={preview} />
        )
      case 'imagetext':
        if ('image' in block) {
          return (
            <ImageText 
              file={block.image.file} 
              alt={block.image.alt} 
              align={block.align} 
              heading={block.heading} 
              preheading={block.preheading} 
              paragraph={block.paragraph} 
              key={index} 
              preview={preview}
            />
          )
        } else {
          return null
        }
    }
  }

  return (
    <section className="dynamic">
      <Helmet titleTemplate="%s | Photanol">
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {preview && title &&
        <p className="blue-text py-3 has-text-weight-bold" style={{backgroundColor: 'rgb(221, 245, 249)', textAlign: 'center'}}>
          <a href={"/page/" + stringToSlug(title)} target="_blank">https://photanol.com/page/{stringToSlug(title)}</a>
        </p>
      }
      <section className="header">
        <div className="background">
          <PreviewCompatibleImage imageInfo={{
            style: {height: '100%'},
            image: image
          }} />
        </div>
        <div className="text-panel">
          <h1 className="title is-family-secondary white-text has-text-weight-bold is-size-3 is-size-4-mobile mb-2">
            {title}
          </h1>
          {description &&
            <p className="white-text">{description}</p>
          }
         </div>
      </section>
      <div className="section">
        <div className="blocks">
          {blocks && blocks.length && blocks.map((block, index) => (
            getBlockContent(block, index)
          ))}
        </div>
      </div>
      <div className="footer"></div>
    </section>
  )
}

DynamicPageTemplate.propTypes = {
  preview: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  blocks: PropTypes.array,
}

const DynamicPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout type="dynamic">
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
  query DynamicPageTemplate($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
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
