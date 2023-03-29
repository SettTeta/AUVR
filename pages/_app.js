import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from 'react-bootstrap';
import { useEffect } from "react";
import '../styles/main.css'
import { SessionProvider } from "next-auth/react"
import Router from 'next/router';
import { useState } from 'react';

import Loader from '../components/loader'

function App({ Component, pageProps: { session, ...pageProps }, }) {
  const [loading, setLoading] = useState(false)

  //for bootstrap functionality
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])

  Router.events.on('routeChangeStart', (url) => {
    setLoading(true)
  })

  Router.events.on('routeChangeComplete', (url) => {
    console.log("routeChangeCompleted")
    setLoading(false)
  })


  return (
    <>
      {loading && <Loader />}
      <SessionProvider session={session}>
        <SSRProvider>
          <Component {...pageProps} />
        </SSRProvider>
      </SessionProvider>
    </>
  )

}

export default App;