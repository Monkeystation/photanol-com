import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

export const FaqPageTemplate = ({
  title,
  text,
  subjects
}) => {
  return (
    <section className="faq section">
      <Helmet titleTemplate={title}>
        <title>{title}</title>
        <meta name="description" content={text} />
      </Helmet>
      <div className="container is-max-desktop">
        <div className="columns">
          <div className="column">
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">
              {title}
            </h1>
            <p className="blue-text">{text}</p>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            {subjects.map((subject, index) => 
              <>
                <h1 key={index} className="title green-text has-text-weight-bold is-size-5 is-size-6-mobile">
                  — {subject.subject}
                </h1>
                <Accordion key={index} allowZeroExpanded={true} allowMultipleExpanded={false}>
                  {subject.questions.map((question, index2) =>   
                    <AccordionItem key={index2}>
                      <AccordionItemHeading>
                        <AccordionItemButton>
                          <span className="blue-text">{question.question}</span>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <p className="blue-text">{question.answer}</p>
                      </AccordionItemPanel>
                    </AccordionItem>
                  )}
                </Accordion>
              </>
            )} 
          </div>
        </div>
      </div>
    </section>
  )
}

FaqPageTemplate.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  subjects: PropTypes.array,
}

const FaqPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <FaqPageTemplate
        title={frontmatter.title}
        text={frontmatter.text}
        subjects={frontmatter.subjects}
      />
    </Layout>
  )
}

FaqPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default FaqPage

export const pageQuery = graphql`
  query FaqPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "faq-page" } }) {
      frontmatter {
        title
        text
        subjects {
          subject
          questions {
            question
            answer
          }
        }
      }
    }
  }
`