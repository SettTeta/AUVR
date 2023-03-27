import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/header'
import Footer from '../../components/footer'

import Banner from '../../public/banner1.webp'

function HomePage() {
    return (
        <main role="main">

            <Head>
                <title>VR Tours - Home</title>
                <meta name="description" content="A VR Video Hosting platform" />
            </Head>

            <Header></Header>

            <div style={{
                position: 'relative',
                paddingTop: "100vh",
                marginTop: "10vh",
                backgroundImage: `url(${Banner.src})`,
                // backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOaG6RYDRhGtJ3hk8VQekA8foa4RmoRYEyoOvgLlbXLu-HUiVdA7nZ9Mlp01LSMlAFt6k&usqp=CAU')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
            }}>

                <div className="content p-0 text-center bg-image" style={{height:"100vh", top:"0", position: "absolute", background: "rgba(0, 0, 0, 0.4)" , width: "100%" }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div >
                            <h1 className="mb-3" style={{color:"white", textShadow: "2px 2px 0px black"}}>Welcome to AUVR</h1>
                            <h4 className="mb-3" style={{color:"white", textShadow: "2px 2px 0px black"}}>A collection of VR Videos in Assumption University</h4>
                            <br></br>
                            <Link className="btn btn-outline-light btn-lg" href="/browse" role="button">Browse</Link>
                            <Link className="btn btn-outline-light btn-lg" href="/story" role="button" style={{marginLeft:"10px"}}>Immerse</Link>
                        </div>
                    </div>
                </div>
            </div>


            


            <Footer />

        </main>
    )
}

export default HomePage
