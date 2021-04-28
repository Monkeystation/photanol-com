import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const NewsPageTemplate = ({
  title,
  date,
  description,
  image,
  blocks,
}) => {
  
  const getBlockContent = block => {
    console.log(block)
    switch(block.type) {
      case 'paragraph':
        return (
          <p className="blue-text py-3">{block.paragraph}</p>
        )
      case 'heading':
        return (
          <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">
            {block.heading}
          </h1>
        )
      case 'subheading':
        return (
          <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">
            {block.subheading}
          </h5>
        )
      case 'quote':
        return (
          <h1 className="title is-family-secondary has-text-weight-bold is-size-4-mobile is-size-3-tablet is-size-2-desktop is-size-1-fullhd">
            {block.quote}
          </h1>
        )
      case 'image':
        return (
          <PreviewCompatibleImage 
            className="has-ratio"
            imageInfo={{
              image: block.image.file, 
              alt: block.image.alt,
              style: {maxHeight: '100%'},
              imgStyle: {objectFit: 'contain'}
            }} 
          />
        )
      case 'video':
        return (
          <figure class="image is-16by9">
            <iframe 
              className="has-ratio" 
              id="ytplayer" 
              type="text/html" 
              src={`https://www.youtube-nocookie.com/embed/${block.youtubeId}?enablejsapi=1&version=3&playerapiid=ytplayer`} 
              frameBorder="0" 
              allowFullScreen>
            </iframe> 
          </figure>

        )
      case 'paragraphimage':
        return (
          <div className="columns">
            <div className="column">
              <PreviewCompatibleImage imageInfo={{
                image: block.image.file, 
                alt: block.image.alt,
                style: {maxHeight: '100%'},
                imgStyle: {objectFit: 'contain'}
              }} />
            </div>
            <div className="column">
              <p className="blue-text py-3">{block.paragraph}</p>
            </div>
          </div>
        )
    }
  }

  return (
    <section className="section">
      <Helmet titleTemplate="%s | News">
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="container">
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
              <div className="block" key={block.type + '_' + index}>
                {getBlockContent(block)}
              </div>
            ))}
          </div>
      </div>
    </section>
  )
}

NewsPageTemplate.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  blocks: PropTypes.array,
}

const NewsPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <NewsPageTemplate
        title={frontmatter.title}
        date={frontmatter.date}
        description={frontmatter.description}
        image={frontmatter.image}
        blocks={frontmatter.blocks}
      />
    </Layout>
  )
}

NewsPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default NewsPage

export const pageQuery = graphql`
  query NewsPageByID($id: String!) {
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
