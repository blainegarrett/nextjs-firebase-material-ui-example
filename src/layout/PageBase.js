// Page Base - provides layout
import React from 'react';
import PropTypes from 'prop-types';

import InternaLink from './InternalLink';

export default function PageBase({ children }) {
  return (
    <div style={{ border: '10px solid black' }}>
      <div>
        <InternaLink href="/">index</InternaLink> |{' '}
        <InternaLink href="/secure1">secure</InternaLink> |{' '}
        <InternaLink href="/insecure1">insecure</InternaLink> |{' '}
        <InternaLink href="/404">404 (Next)</InternaLink> |{' '}
        <InternaLink href="/404">404 (html)</InternaLink>
        {children}
      </div>
    </div>
  );
}
PageBase.propTypes = {
  children: PropTypes.node
};
