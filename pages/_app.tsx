import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/theme';
import { Inter } from '@next/font/google';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo'
import Layout from '@/components/Layout';
import { SessionProvider } from 'next-auth/react';
// const theme = createTheme();
const inter = Inter({ subsets: ['latin'] })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
      <SessionProvider session={pageProps.session}>
        <Layout>
    <CssBaseline />

    <Component {...pageProps} />
    </Layout>
    </SessionProvider>
    </ApolloProvider>
  </ThemeProvider>
  )
}
