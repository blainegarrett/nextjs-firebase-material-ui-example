import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { ThemeProvider, StylesProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import GlobalStyles from '../src/theming/global';
import theme from '../src/theming/theme';
import AuthContextProvider from '../src/auth/AuthContextProvider';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Next.js and Firebase Auth Example</title>
        </Head>
        <StylesProvider injectFirst={true}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <GlobalStyles />

            <AuthContextProvider>
              <Component {...pageProps} />
            </AuthContextProvider>
          </ThemeProvider>
        </StylesProvider>
      </>
    );
  }
}

export default MyApp;
