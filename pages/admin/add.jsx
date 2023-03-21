import Header from '../../components/header'
import Footer from '../../components/footer'
import * as React from 'react'
import Head from 'next/head'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react"



export default function AdminPage({categories }) {


    const { data: session } = useSession()

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const addVideo = async (data) => {
        const response = await fetch('/api/browse/videos', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.error) {
            alert("Error: " + result.error)
        }
        setData(JSON.stringify(data))
        window.location.reload(true);
    }


    // if (session) {
    return (
        <main role="main" style={{ paddingTop: "12vh" }}>
            <div>
                <Head>
                    <title>Admin - Add</title>
                    <meta name="description" content="Admin adding content page" />
                </Head>
            </div>

            <Header />


                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Video</h5>
                        </div>
                        <div className="modal-body">
                            <div className="container-fluid">
                                <form onSubmit={handleSubmit(addVideo)}>
                                    <div className="row d-flex justify-content-start">
                                        <div className="col-md-7 ">
                                            <label htmlFor="title" className="col-form-label">Title:</label>
                                            <input type="text" className="form-control" id="title" {...register("title", { required: false })} placeholder="Video Title" />
                                        </div>
                                        <div className="col-md-5">
                                            <label htmlFor="link" className="col-form-label">URL Link:</label>
                                            <input className="form-control" id="link" {...register("link", { required: false })} placeholder="URL of Video"></input>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="location" className="col-form-label">Location:</label>
                                            <select className="form-select" id="location" {...register("location", { required: false })}>
                                                <option value="">Select Campus</option>
                                                <option value="Suvanabhumi">Suvanabhumi</option>
                                                <option value="Hua Mak">Hua Mak</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="type" className="col-form-label">Type:</label>
                                            <select className="form-select" id="type" {...register("type", { required: false })}>
                                                <option value="">Select Building Type</option>
                                                {categories.map(cat => (
                                                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="dateOfUpload" className="col-form-label">Date of Upload:</label>
                                            <input className="form-control" type="date" id="dateOfUpload" {...register("dateOfUpload", { required: false })} />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="duration" className="col-form-label">Duration:</label>
                                            <input className="form-control" type="time" id="duration" {...register("duration", { required: false })} />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="player" className="col-form-label">Player:</label>
                                            <br />
                                            <div style={{ display: "flex", paddingTop: "7px" }}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="playerRadio" id="youtubeRadio" value="youtube" {...register("player", { required: false })} />
                                                    <label className="form-check-label" htmlFor="youtubeRadio">
                                                        Youtube
                                                    </label>
                                                </div>
                                                <div className="form-check" style={{ paddingLeft: "3rem" }}>
                                                    <input className="form-check-input" type="radio" name="playerRadio" id="vimeoRadio" value="vimeo" {...register("player", { required: false })} />
                                                    <label className="form-check-label" htmlFor="vimeoRadio">
                                                        Vimeo
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="desc" className="col-form-label">Description:</label>
                                        <input className="form-control" type="text" id="desc" {...register("desc", { required: false })} placeholder="Description of Video"></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="thumbnail" className="col-form-label">Thumbnail:</label>
                                        <input className="form-control" type="text" id="thumbnail" {...register("thumbnail", { required: false })}></input>
                                        {/* <input className="form-control" type="file" id="thumbnail" {...register("thumbnail", { required: false })}></input> */}
                                    </div>

                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
            </div>

            <Footer />
        </main>
    )
    // }
    return (<><p>Access Denied</p> <Footer /></>)

}

export async function getServerSideProps() {
    const vid = await fetch(`https://auvr.vercel.app/api/browse/videos`)
    const videos = await vid.json()

    const cat = await fetch(`https://auvr-git-create-new-cat-settteta.vercel.app/api/browse/categories`)
    const categories = await cat.json()
    return { props: { videos, categories } }
}

