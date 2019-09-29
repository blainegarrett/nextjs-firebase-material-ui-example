import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';
import Link from 'next/link';

import PageBase from '../src/layout/PageBase';

export default function Secure() {
  return (
    <PageBase signInRequired={true}>
      <h1>Secure</h1>
    </PageBase>
  );
}
