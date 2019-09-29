// Page Base - provides layout
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import InternaLink from './InternalLink';
import AppBar from './AppBar';
import DebugWidget from './DebugWidget';
import { AuthContext } from '../auth/AuthContextProvider';

export default function PageBase({ children, signInRequired }) {
  let authCtx = useContext(AuthContext);

  let content = children;

  if (signInRequired && !authCtx.user) {
    content = <div>SignIn Required</div>;
  }

  return (
    <div>
      <AppBar signInRequired={signInRequired} />
      <div>
        <InternaLink href="/">index</InternaLink> |{' '}
        <InternaLink href="/secure1">secure</InternaLink> |{' '}
        <InternaLink href="/insecure1">insecure</InternaLink> |{' '}
        <InternaLink href="/404">404 (Next)</InternaLink> |{' '}
        <InternaLink href="/404">404 (html)</InternaLink>
        {content}
        <DebugWidget />
      </div>
    </div>
  );
}
PageBase.propTypes = {
  children: PropTypes.node,
  signInRequired: PropTypes.bool
};
