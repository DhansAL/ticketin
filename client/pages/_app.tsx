// import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import { buildClient } from '../api/buildClient';
import { Header } from '../components/Header';

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      <Header currentUser={pageProps.currentUser}>
        <Component {...pageProps} />
      </Header>
    </>

  )

}


MyApp.getInitialProps = async (context: any) => {
  console.log('im in server');
  // console.log(Object.keys(context.ctx));
  const client = buildClient(context.ctx);
  const { data } = await client.get("/api/users/currentuser")
  let pageProps = {}
  console.log("userdata", data);


  if (context.Component.getInitialProps) {
    pageProps = await context.Component.getInitialProps(context.ctx)
  }

  return {
    pageProps,
    ...data
  }
}

export default MyApp
