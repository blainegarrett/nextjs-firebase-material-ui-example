// Material UI Wrapper for material
import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

export default class InternalLink extends React.Component {
  render() {
    let { href, as, children, ...rest } = this.props;
    return (
      <Link {...{ href, as }}>
        <a {...rest}>{children}</a>
      </Link>
    );
  }
}

InternalLink.propTypes = {
  href: PropTypes.string,
  as: PropTypes.string,
  children: PropTypes.node
};
