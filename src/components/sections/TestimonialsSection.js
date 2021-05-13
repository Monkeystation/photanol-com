import React from 'react'
import PropTypes from 'prop-types'
import ScrollAnimation from 'react-animate-on-scroll'
import Slider from 'react-slick'
import PreviewCompatibleFile from '../PreviewCompatibleFile'


const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  autoplaySpeed: 8000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true
};

const TestimonialsSection = ({ testimonials }) => (
  <section className="section is-padded testimonials">
    <div className="columns">
       <div className="column is-12 is-8-fullhd is-offset-2-fullhd">
          <ScrollAnimation animateIn='fadeInUp' animateOnce={true}>
            <h5 className="subtitle blue-text has-text-weight-bold is-uppercase is-7">{testimonials.pretitle}</h5>
          </ScrollAnimation>
          <ScrollAnimation animateIn='fadeInUp' delay={200} animateOnce={true}>
            <h1 className="title is-family-secondary green-text has-text-weight-bold is-size-3 is-size-4-mobile">{testimonials.title}</h1>
          </ScrollAnimation>
        </div>
      </div>
      <div className="columns">
          <div className="column is-12 is-8-fullhd is-offset-2-fullhd">
            <Slider {...settings}>
              {testimonials.items.map((item, index) => (
                <div key={index}>
                  <div className="item">
                    <div className="image">
                      <img src={PreviewCompatibleFile(item.image)} alt='' loading="lazy" />
                    </div>
                    <div>
                      <h1 className="title is-family-secondary is-spaced blue-text has-text-weight-bold is-size-5 is-size-6-mobile">{item.quote}</h1>
                      <h5 className="subtitle green-text has-text-weight-bold is-uppercase is-7">― {item.citation}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
  </section>
)

TestimonialsSection.propTypes = {
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
  preview: PropTypes.bool
}

export default TestimonialsSection