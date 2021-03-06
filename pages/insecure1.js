import React from 'react';
import PropTypes from 'prop-types';

import Head from 'next/head';
import Link from 'next/link';

import PageBase from '../src/layout/PageBase';

export default function Insecure() {
  return (
    <PageBase signInRequired={false}>
      <h1>Insecure Page</h1>
    </PageBase>
  );
}
