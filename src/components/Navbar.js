import React from 'react'
import { Link } from 'react-scroll'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
    }
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState(
      {
        active: !this.state.active,
      },
      // after state has been updated,
      () => {
        // set the class in state for the navbar accordingly
        this.state.active
          ? this.setState({
              navBarActiveClass: 'is-active',
            })
          : this.setState({
              navBarActiveClass: '',
            })
      }
    )
  }

  render() {
    return (
      <nav
        className="navbar"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            {/* Hamburger menu */}
            <div
              className={`navbar-burger burger ${this.state.navBarActiveClass}`}
              data-target="navMenu"
              onClick={() => this.toggleHamburger()}
            >
              <span />
              <span />
              <span />
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-end has-text-centered">
              <Link className="navbar-item" activeClass="is-active" to="product" spy={true} smooth={true} duration={1000} offset={-50}>
                product
              </Link>
              <Link className="navbar-item" activeClass="is-active" to="technology" spy={true} smooth={true} duration={1000} offset={-50}>
                technology
              </Link>
              <Link className="navbar-item" activeClass="is-active" to="team" spy={true} smooth={true} duration={1000} offset={-50}>
                team
              </Link>
              <Link className="navbar-item" activeClass="is-active" to="jobs" spy={true} smooth={true} duration={1000} offset={-100}>
                jobs
              </Link>
              <Link className="navbar-item" activeClass="is-active" to="contact" spy={true} smooth={true} duration={1000} offset={-50}>
                contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar

/*

 <li><Link activeClass="active" to="first" spy={true} smooth={true} duration={250} containerId="containerElement">1st element</Link></li>
 
 
<Link className="navbar-item" to="#product">
  Product
</Link>
<Link className="navbar-item" to="#technology">
  Technology
</Link>
<Link className="navbar-item" to="#team">
  Team
</Link>
<Link className="navbar-item" to="#jobs">
  Jobs
</Link>
<Link className="navbar-item" to="#contact">
  Contact
</Link>




*/
