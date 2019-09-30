import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';
import Link from 'next/link';

import PageBase from '../src/layout/PageBase';

export default function Index() {
  return (
    <PageBase signInRequired={false}>
      <h1>Index Page</h1>

      <p>
        This is a playground environment for interacting with firebase auth.
        I'll add more documentation later. Until then, use the boxes at the
        bottom to debug your React AuthContext and Firebase auth state.
      </p>
      <br />
      <br />
      <br />
      <br />
      <br />
    </PageBase>
  );
}
