import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from 'react-bootstrap';
import { useEffect } from "react";
import '@/styles/main.css'


function App({ Component, pageProps }) {

  //for bootstrap functionality
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])


  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  )

}

export default App;