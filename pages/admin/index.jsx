import Header from '../../components/header'
import Footer from '../../components/footer'
import * as React from 'react'
import VideoCard from '../../components/CardAdmin'
import EditCard from '../../components/editCard'
import Head from 'next/head'
import { useState } from "react";
import { useSession } from "next-auth/react"


// import { FormControl, FormLabel, RadioGroup, FormControlLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';

export default function AdminPage({ videos, categories }) {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue)
    };


    const { data: session } = useSession()

    const [videosToShow, setVideosToShow] = useState(6);
    const [searchValue, setSearchValue] = useState("");
    const [location, setLocation] = useState("all");
    const [type, setType] = useState("all");

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
        <main role="main" style={{ paddingTop: "7vh" }}>
            <div>
                <Head>
                    <title>VR Tours</title>
                    <meta name="description" content="A VR Video Hosting platform" />
                </Head>
            </div>

            <Header />

            <div style={{ display: 'flex', height: '90vh' }}>

                <div className='row g-0'>
                    <div style={{ minWidth: '400px', width: "30vw", padding: '20px', backgroundColor: '#f8f9fa' }}>
                        <section className="jumbotron text-center" >
                            <div className="container">
                                <br></br>
                                <h1 className="jumbotron-heading">Admin Page</h1>
                                <p className="lead text-muted">
                                    Add, Modify, Update and Delete any Videos within this page.
                                </p>

                            </div>
                            <div>
                                <a href="/admin/add">
                                    <img className='hover' src="https://static.thenounproject.com/png/767525-200.png" width="25%" height="auto" style={{ justifyContent: 'center' }} />
                                </a>
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
                                    {categories.map(cat => (
                                        <FormControlLabel key={cat._id} value={cat.name} control={<Radio />} label={cat.name} />
                                    ))}
                                    <FormControlLabel value="all" control={<Radio />} label="All" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>


                    <div style={{ minWidth: '400px', width: '70vw' }}>
                        <div className="album py-5 bg-light">
                            <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" centered style={{ paddingBottom: "5px" }}>
                                <Tab icon={<VideoLibraryOutlinedIcon />} label="Videos" />
                                <Tab icon={<InfoOutlinedIcon />} label="Categories" />
                            </Tabs>
                            {value === 0 && (
                                <div style={{ height: '93vh', overflowY: 'scroll' }}>
                                    <div className="container" style={{ display: "flex", width: "100%" }}>
                                        <div className="container-xxl content-row">
                                            {renderVideoCards()}
                                            {videosToShow < videos.length && (
                                                <button className="btn btn-secondary" onClick={loadMoreVideos}>Load more</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {value === 1 && (
                                <div> show cat </div>
                            )}

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

