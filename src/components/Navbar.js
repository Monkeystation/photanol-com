import React from 'react'
import {Link} from 'react-scroll'
import {IconClose} from '../components/Icons'
import {IconHamburger} from '../components/Icons'

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      navBarActiveClass: '',
      contactOffset: 0
    }
  }
  /*
  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }
  
  onWindowResize = () => {
    var contact = document.getElementById('contact')
    var contactOffset = (document.body.scrollHeight - contact.offsetTop) - window.innerHeight - 10
    this.setState({contactOffset: contactOffset})
  }
  */
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

  render() {
    const {active, contactOffset} = this.state
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
              <Link className="navbar-item" activeClass="is-active" to="product" spy={true} smooth={true} duration={1500} offset={0} onClick={() => this.toggleHamburger()}>
                product
              </Link>
              <Link className="navbar-item" activeClass="is-active" to="technology" spy={true} smooth={true} duration={1500} offset={0} onClick={() => this.toggleHamburger()}>
                technology
              </Link>
              <Link className="navbar-item" activeClass="is-active" to="team" spy={true} smooth={true} duration={1500} offset={0} onClick={() => this.toggleHamburger()}>
                team
              </Link>
              <Link className="navbar-item" activeClass="is-active" to="jobs" spy={true} smooth={true} duration={1500} offset={-50} onClick={() => this.toggleHamburger()}>
                jobs
              </Link>
              <Link className="navbar-item" activeClass="is-active" to="contact" spy={true} smooth={true} duration={1500} offset={0} onClick={() => this.toggleHamburger()}>
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
