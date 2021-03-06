import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Waypoint from 'react-waypoint';
import { arrayOf, func, number, shape, string } from 'prop-types';
import Spinner from 'COMPONENTS/Spinner';
import {
  fetchMoreItems,
  setPreviousView,
} from 'STATE/actions';
import {
  getNextPage,
  getResults,
} from 'STATE/selectors';
import styles, {
  globals as globalStyles,
  loadFonts,
} from './styles';

const mapStateToProps = (state) => ({
  nextPage: getNextPage(state),
  results: getResults(state),
});
const mapDispatchToProps = {
  fetchMoreItems,
  setPreviousView,
};

class ItemsView extends Component {
  constructor(){
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleWaypoint = this.handleWaypoint.bind(this);
  }

  componentDidMount(){
    globalStyles();
  }

  handleClick() {
    this.props.setPreviousView(this.props.location.pathname);
  }

  handleWaypoint(url) {
    this.props.fetchMoreItems(url);
  }

  render(){
    const {
      linkPrefix,
      nextPage,
      results,
      title,
    } = this.props;

    return (
      <Fragment>
        <span dangerouslySetInnerHTML={{ __html: loadFonts() }} />
        {results.length && (
          <Fragment>
            <h1 className={ `${ styles.title }` }>{ title }</h1>
            <div className={`view__body ${ styles.grid }`}>
              {results.length && results.map((item, ndx) => (
                <Link
                  key={ item.id }
                  className={ styles.item }
                  to={ `${ linkPrefix }${ item.id }` }
                  onClick={ this.handleClick }
                >
                  <img
                    src={ item.image }
                    alt={ `${ item.name } thumbnail` }
                  />
                  <div className={ `name ${ styles.name }` }>{ item.name }</div>
                </Link>
              ))}
              {nextPage && (
                <Waypoint
                  onEnter={ this.handleWaypoint.bind(null, nextPage) }
                  bottomOffset="-400px"
                >
                  <div className={ `${ styles.loadBar }` }>
                    <Spinner />
                    <span>Loading...</span>
                  </div>
                </Waypoint>
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

ItemsView.propTypes = {
  fetchMoreItems: func,
  linkPrefix: string,
  location: shape({}),
  nextPage: string,
  results: arrayOf(shape({
    created: string,
    episode: arrayOf(string),
    gender: string,
    id: number,
    image: string,
    location: shape({
      name: string,
      url: string,
    }),
    name: string,
    origin: shape({
      name: string,
      url: string,
    }),
    species: string,
    status: string,
    type: string,
    url: string,
  })),
  setPreviousView: func,
  title: string,
};
ItemsView.defaultProps = {
  results: [],
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemsView));
