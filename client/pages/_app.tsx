// import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import { buildClient } from '../api/buildClient';
import { Header } from '../components/Header';

const MyApp = ({ Component, pageProps }: AppProps) => {
  console.log(pageProps);

  return (
    <Component {...pageProps} />

  )
  //  <Header currentUser={pageProps.currentUser}>
  {/* </Header> */ }
}


MyApp.getInitialProps = async (context: any) => {
  console.log('im in server');
  // console.log(Object.keys(context.ctx));
  const client = buildClient(context.ctx);
  const { data } = await client.get("/api/users/currentuser")
  let pageProps = {}
  console.log(context);

  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(context.ctx)
  }

  return {
    pageProps,
    ...data
  }
}

export default MyApp
