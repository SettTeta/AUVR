import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from 'react-bootstrap';
import { useEffect } from "react";
import 'styles/main.css'
import { SessionProvider } from "next-auth/react"


function App({ Component, pageProps: { session, ...pageProps }, }) {

  //for bootstrap functionality
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])


  return (
    <SessionProvider session={session}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </SessionProvider>

  )

}

export default App;