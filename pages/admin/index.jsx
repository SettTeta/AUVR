import Header from 'components/header'
import Footer from 'components/footer'
import * as React from 'react'
import VideoCard from 'components/Card.js'
import EditCard from 'components/editCard'
import Head from 'next/head'
import { useState } from "react";
import Link from 'next/link'
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react"

export default function AdminPage({ videos }) {

    const { data: session } = useSession()

    const [videosToShow, setVideosToShow] = useState(6);
    const [searchValue, setSearchValue] = useState("");

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");

    const [editedVideo, setEditedVideo] = useState(null);


    function loadMoreVideos() {
        setVideosToShow(videosToShow + 3);
    }

    function renderVideoCard(video) {
        if (editedVideo && editedVideo._id === video._id) {
            return (
                <EditCard
                    key={video._id}
                    title={
                        <input
                            type="text"
                            defaultValue={editedVideo.title}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, title: e.target.value })
                            }
                        />
                    }
                    link={
                        <input
                            type="text"
                            defaultValue={editedVideo.link}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, link: e.target.value })
                            }
                        />
                    }
                    thumbnail={
                        <input
                            type="text"
                            defaultValue={editedVideo.thumbnail}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, thumbnail: e.target.value })
                            }
                        />
                    }
                    desc={
                        <input
                            type="text"
                            defaultValue={editedVideo.desc}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, desc: e.target.value })
                            }
                        />
                    }
                    onView={video._id}
                    duration={
                        <input
                            type="text"
                            defaultValue={editedVideo.duration}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, duration: e.target.value })
                            }
                        />
                    }
                    location={
                        <input
                            type="text"
                            defaultValue={editedVideo.location}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, location: e.target.value })
                            }
                        />
                    }
                    dOU={
                        <input
                            type="text"
                            defaultValue={editedVideo.dateOfUpload}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, dateOfUpload: e.target.value })
                            }
                        />
                    }
                    onSave={() => saveVideo()}
                    onCancel={() => cancelEditing()}
                />
            );
        } else {
            return (
                <VideoCard
                    key={video._id}
                    title={video.title}
                    link={video.youtube}
                    thumbnail={video.thumbnail}
                    desc={video.desc}
                    onView={video._id}
                    duration={video.duration}
                    location={video.location}
                    dOU={video.dateOfUpload}
                    onDel={() => deleteVideo(video._id)}
                    onEdit={() => editVideo(video)}
                />
            );
        }
    }

    function editVideo(video) {
        setEditedVideo(video);
    }

    function cancelEditing() {
        setEditedVideo(null);
    }


    function search() {
        setSearchValue("");
        setVideosToShow(6);
    }


    function renderVideoCards() {
        const videosToDisplay = videos
            .filter(video => {
                return video.title.toLowerCase().includes(searchValue.toLowerCase());
            })
            .slice(0, videosToShow);
        return videosToDisplay.map(renderVideoCard);
    }


    if (!videos) return (
        <div style={{ marginTop: "10vh" }}>
            <p>Videos not found</p>
            <Link href="/browse">Back</Link>
        </div>
    );

    const addVideo = async (data) => {
        const response = await fetch('https://auvr-git-admin-cms-settteta.vercel.app/api/browse/videos', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // serialisation
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        const result = await response.json();   // deserialise
        if (result.error) {
            alert("Error: " + result.error)
        }
        console.log(result)
        setData(JSON.stringify(data))
    }

    function deleteVideo(id) {
        fetch(`/api/browse/videos/${id}`,
            {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                // alert("Deleting " + id)
                window.location.reload(false);
            })

    }

    const saveVideo = async () => {
        const response = await fetch(`/api/browse/videos/${editedVideo._id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            // serialisation
            body: JSON.stringify(editedVideo), // body data type must match "Content-Type" header
        });
        const result = await response.json();   // deserialise
        if (result.error) {
            alert("Error: " + result.error)
        }
        setData(JSON.stringify(editedVideo))
        setEditedVideo(null)
        window.location.reload(true);
    }

    if (session) {
        return (
            <main role="main">
                <div>
                    <Head>
                        <title>VR Tours</title>
                        <meta name="description" content="A VR Video Hosting platform" />
                    </Head>
                </div>

                <Header />

                <section className="jumbotron text-center" style={{ marginTop: "10vh" }}>
                    <div className="container">
                        <br></br>
                        <h1 className="jumbotron-heading">VR Videos just for you</h1>
                        <p className="lead text-muted">
                            Browse our collection of VR videos and view them with your full entertainment
                        </p>
                    </div>
                    <Link href="/admin/add">Go to add page</Link>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add</button>
                </section>

                <br />

                <div className="input-group rounded" style={{ padding: "0 15% 0 15%" }}>
                    <input type="search" className="form-control rounded" placeholder="Thailand" aria-label="Search" aria-describedby="search-addon" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                    <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search" onClick={search}>Clear</i>
                    </span>
                </div>

                <br />

                <div className="album py-5 bg-light">
                    <div className="container-xxl content-row">
                        <div className="row">
                            {renderVideoCards()}
                            {videosToShow < videos.length && (
                                <button className="btn btn-secondary" onClick={loadMoreVideos}>Load more</button>
                            )}
                        </div>
                    </div>
                </div>



                <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Video</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(addVideo)}>

                                    <div className="mb-3">
                                        <label htmlFor="title" className="col-form-label">Title:</label>
                                        <input type="text" className="form-control" id="title" {...register("title", { required: false })} placeholder="Video Title" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="link" className="col-form-label">URL Link:</label>
                                        <input className="form-control" id="link" {...register("link", { required: false })} placeholder="URL of Video"></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="thumbnail" className="col-form-label">Thumbnail:</label>
                                        <input className="form-control" id="thumbnail" {...register("thumbnail", { required: false })} placeholder="URL of Video"></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="desc" className="col-form-label">Description:</label>
                                        <input className="form-control" id="desc" {...register("desc", { required: false })} placeholder="URL of Video"></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="duration" className="col-form-label">Duration:</label>
                                        <input className="form-control" id="duration" {...register("duration", { required: false })} placeholder="URL of Video"></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="location" className="col-form-label">Location:</label>
                                        <input className="form-control" id="location" {...register("location", { required: false })} placeholder="URL of Video"></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="dateOfUpload" className="col-form-label">Date of Upload:</label>
                                        <input className="form-control" id="dateOfUpload" {...register("dateOfUpload", { required: false })} placeholder="URL of Video"></input>
                                    </div>


                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
    }  return <p>Access Denied</p>

}

export async function getServerSideProps() {
    const res = await fetch(`https://auvr.vercel.app/api/browse/videos`)
    const videos = await res.json()
    console.debug('blog 1', videos)
    return { props: { videos } }
}

