import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { arrayOf, bool, shape, string } from 'prop-types';
import classnames from 'classnames';
import Logo from './components/Logo';
import styles from './styles';

// The Header creates links that can be used to navigate
// between routes.
class Header extends Component {
  constructor(props){
    super();

    this.state = {
      menuOpen: false,
    };

    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleMenuToggle(ev){
    this.setState({
      menuOpen: ev.currentTarget.checked,
    });
  }

  handleNavClick(ndx, ev){
    if( this.state.menuOpen && ndx !== this.navNdx ){
      if( this.toggleTimeout ) clearTimeout(this.toggleTimeout);

      this.navNdx = ndx;

      // close mobile nav after item click
      this.toggleTimeout = setTimeout(() => {
        delete this.toggleTimeout;
        this.toggleInput.click();
      }, 300);
    }
  }

  render() {
    const {
      navItems,
    } = this.props;
    const navClass = classnames(
      `${ styles.nav }`,
      { 'is--open': this.state.menuOpen }
    );

    return (
      <header className={`${ styles.header }`}>
        <Logo className={`${ styles.navLogo }`} />
        <div className={`${ styles.toggle }`}>
          <label className={`${ styles.toggleLabel }`}>
            <input
              className={`${ styles.toggleInput }`}
              ref={ (toggleInput) => { this.toggleInput = toggleInput; } }
              type="checkbox"
              onChange={ this.handleMenuToggle }
            />
            <div className={`toggle__indicator ${ styles.toggleIndicator }`}></div>
            Menu
          </label>
        </div>
        <nav className={ navClass }>
          {navItems.map((item, ndx) => (
            <NavLink
              key={ ndx }
              exact={ item.exact }
              className={`nav__btn ${ styles.navBtn }`}
              activeClassName="current"
              to={ item.url }
              onClick={ this.handleNavClick.bind(null, ndx) }
            >{item.label}</NavLink>
          ))}
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  navItems: arrayOf(shape({
    exact: bool,
    label: string,
    url: string,
  })),
};
Header.defaultProps = {
  navItems: [],
};

export default Header;
