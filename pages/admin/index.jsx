import Header from '../../components/header'
import Footer from '../../components/footer'
import * as React from 'react'
import VideoCard from '../../components/CardAdmin'
import EditCard from '../../components/editCard'
import Head from 'next/head'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react"


// import { FormControl, FormLabel, RadioGroup, FormControlLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function AdminPage({ videos }) {

    const { data: session } = useSession()

    const [videosToShow, setVideosToShow] = useState(6);
    const [searchValue, setSearchValue] = useState("");
    const [location, setLocation] = useState("all");
    const [type, setType] = useState("all");

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
                    type={
                        <input
                            type="text"
                            defaultValue={editedVideo.type}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, type: e.target.value })
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
                    onDel={() => deleteVideo(video._id)}
                    thTitle={video.title}
                />
            );
        } else {
            return (
                <VideoCard
                    key={video._id}
                    title={video.title}
                    link={video.youtube}
                    type={video.type}
                    thumbnail={video.thumbnail}
                    desc={video.desc}
                    onView={video._id}
                    duration={video.duration}
                    location={video.location}
                    dOU={video.dateOfUpload}
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


    // function clear() {
    //     setSearchValue("");
    //     setVideosToShow(6);
    // }


    function renderVideoCards() {
        const videosToDisplay = videos
            .filter(video => {
                let videoLocation = location === "all" ? true : video.location === location;
                let videoType = type === "all" ? true : video.type === type;
                return video.title.toLowerCase().includes(searchValue.toLowerCase()) && videoLocation && videoType;
            })
            .slice(0, videosToShow);
        return videosToDisplay.map(renderVideoCard);
    }


    const clear = () => {
        setSearchValue("");
        setLocation("all");
        setType("all");
    }

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

    function deleteVideo(id) {
        const confirmed = window.confirm("Are you sure you want to delete this video?");
        if (confirmed) {
            fetch(`/api/browse/videos/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    window.location.reload(false);
                })
        }
    }

    const saveVideo = async () => {
        const response = await fetch(`/api/browse/videos/${editedVideo._id}`, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify(editedVideo),
        });
        const result = await response.json();
        if (result.error) {
            alert("Error: " + result.error)
        }
        setData(JSON.stringify(editedVideo))
        setEditedVideo(null)
        window.location.reload(true);
    }

    // if (session) {
        return (
            <main role="main">
                <div>
                    <Head>
                        <title>VR Tours</title>
                        <meta name="description" content="A VR Video Hosting platform" />
                    </Head>
                </div>

                <Header />

                <div style={{ display: 'flex', height: '90vh', marginTop: '7vh', marginBottom: "55vh" }}>

                    <div className='row g-0'>
                        <div style={{ minWidth: '400px', width: "30vw", padding: '20px', backgroundColor: '#f8f9fa', border: "solid 1px" }}>
                            <section className="jumbotron text-center" >
                                <div className="container">
                                    <br></br>
                                    <h1 className="jumbotron-heading">Admin Page</h1>
                                    <p className="lead text-muted">
                                        Add, Modify, Update and Delete any Videos within this page.
                                    </p>

                                </div>
                                <div>
                                    <img className='hover' src="https://static.thenounproject.com/png/767525-200.png" width="25%" height="auto" data-bs-toggle="modal" data-bs-target="#addModal" style={{ justifyContent: 'center' }} />
                                </div>
                            </section>

                            <br />

                            <div className="input-group rounded" style={{ padding: "5% 15% 0 15%" }}>
                                <input type="search" className="form-control rounded" placeholder="Thailand" aria-label="Search" aria-describedby="search-addon" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                                <span className="input-group-text border-0" id="search-addon">
                                    <i className="fas fa-search" onClick={clear}>Clear</i>
                                </span>
                                <br />
                            </div>

                            <div className='container' style={{ display: 'flex', justifyContent: 'center' }}>
                                <FormControl style={{ marginTop: "20px", paddingRight: "20px" }}>
                                    <FormLabel id="demo-radio-buttons-group-label">Campus: </FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="all"
                                        name="radio-buttons-group"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    >
                                        <FormControlLabel value="Suvanabhumi" control={<Radio />} label="Suvanabhumi" />
                                        <FormControlLabel value="Hua Mak" control={<Radio />} label="Hua Mak" />
                                        <FormControlLabel value="all" control={<Radio />} label="All" />
                                    </RadioGroup>
                                </FormControl>

                                <FormControl style={{ marginTop: "20px" }}>
                                    <FormLabel id="demo-radio-buttons-group-label">Type: </FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="all"
                                        name="radio-buttons-group"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <FormControlLabel value="Indoor" control={<Radio />} label="Indoor" />
                                        <FormControlLabel value="Outdoor" control={<Radio />} label="Outdoor" />
                                        <FormControlLabel value="all" control={<Radio />} label="All" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>


                        <div style={{ minWidth: '400px', width: '70vw', overflowY: 'scroll'}}>
                            <div className="album py-5 bg-light" style={{height: '93vh'}}>
                                <div className="container" style={{ display: "flex", width: "100%" }}>
                                    <div className="container-xxl content-row">
                                        {renderVideoCards()}
                                        {videosToShow < videos.length && (
                                            <button className="btn btn-secondary" onClick={loadMoreVideos}>Load more</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Video</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                                    <option value="Indoor">Indoor</option>
                                                    <option value="Outdoor">Outdoor</option>
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
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
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
    const res = await fetch(`https://auvr.vercel.app/api/browse/videos`)
    const videos = await res.json()
    return { props: { videos } }
}

