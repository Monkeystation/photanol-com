import React from 'react'
import {Link} from 'react-scroll'
import {IconClose} from '../components/Icons'
import {IconHamburger} from '../components/Icons'
import ReactGA from 'react-ga'

const Navbar = class extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
      contactOffset: 0
    }
    this.pageViewList = {}
  }

  toggleHamburger = () => {
    // toggle the active boolean in the state
    this.setState({active: !this.state.active}, () => {
      if (this.state.active) {
        this.setState({ navBarActiveClass: 'is-active' })
      } else {
        this.setState({ navBarActiveClass: 'is-inactive' })
      }
    })
  }
  
  handleSetActive = (to) => {
    if (this.pageViewList[to]) return
    this.pageViewList[to] = true
    ReactGA.pageview(to)
  }

  render() {
    const {active} = this.state
    const icon = (active) ? <IconClose /> : <IconHamburger />
    
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
              role="button"
            >
              {icon}
            </div>
          </div>
          <div
            id="navMenu"
            className={`navbar-menu ${this.state.navBarActiveClass}`}
          >
            <div className="navbar-end">
              {/*<Link className="navbar-item" activeClass="is-active" to="product" spy={true} smooth={true} duration={1500} offset={0} onClick={() => this.toggleHamburger()} onSetActive={this.handleSetActive}>
                product
              </Link>*/}
              <Link className="navbar-item" activeClass="is-active" to="technology" spy={true} hashSpy={true} smooth={true} duration={1500} offset={0} onClick={() => this.toggleHamburger()} onSetActive={this.handleSetActive}>
                technology
              </Link>
              <Link className="navbar-item" activeClass="is-active" to="team" spy={true} hashSpy={true} smooth={true} duration={1500} offset={0} onClick={() => this.toggleHamburger()} onSetActive={this.handleSetActive}>
                team
              </Link>
              <Link className="navbar-item" activeClass="is-active" to="jobs" spy={true} hashSpy={true} smooth={true} duration={1500} offset={-50} onClick={() => this.toggleHamburger()} onSetActive={this.handleSetActive}>
                jobs
              </Link>
              <Link className="navbar-item" activeClass="is-active" to="contact" spy={true} hashSpy={true} smooth={true} duration={1500} offset={0} onClick={() => this.toggleHamburger()} onSetActive={this.handleSetActive}>
                contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

Navbar.displayName = "Navbar"

export default Navbar