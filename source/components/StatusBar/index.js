//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Instruments
import Styles from './styles.m.css';

export default class StatusBar extends Component {
  static propTypes = {
      avatar:               PropTypes.string,
      currentUserFirstName: PropTypes.string,
      currentUserLastName:  PropTypes.string,
  };

  render() {
      const {
          avatar,
          currentUserFirstName,
          currentUserLastName,
      } = this.props;

      return (
          <section className = { Styles.statusBar }>
              <button>
                  <img src = { avatar } />
                  <p>{ `${currentUserFirstName} ${currentUserLastName}` }</p>
              </button>
          </section>
      );
  }
}
