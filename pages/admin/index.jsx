import Header from '../../components/header'
import Footer from '../../components/footer'
import * as React from 'react'
import VideoCard from '../../components/CardAdmin'
import EditCard from '../../components/editCard'
import Head from 'next/head'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { useForm } from "react-hook-form";

//admin interface
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import FormControlLabel from '@mui/material/FormControlLabel'
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

//video and category view
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';

//for adding categories
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

//for dropbox
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// data grid
import { DataGrid } from '../../node_modules/@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import UpdateIcon from '@mui/icons-material/Update';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AdminPage({ videos, categories }) {

    //tabs
    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue)
    };


    const { data: session } = useSession()

    const [videosToShow, setVideosToShow] = useState(6);
    const [searchValue, setSearchValue] = useState("");

    const [location, setLocation] = useState("all");
    const [selectedCatDropbox, setSelectedCatDropbox] = useState("all");

    const { register, handleSubmit, reset } = useForm();
    const [data, setData] = useState("");

    const [editedVideo, setEditedVideo] = useState(null);
    const [dataCat, setDataCat] = useState(categories);
    const [currentCatRow, setCurrentCatRow] = useState(null)

    const [openModAdd, setOpenModAdd] = useState(false);
    const handleOpenModAdd = () => setOpenModAdd(true);
    const handleCloseModAdd = () => setOpenModAdd(false);

    const [openModUpdate, setOpenModUpdate] = useState(false);
    const handleOpenModUpdate = () => setOpenModUpdate(true);
    const handleCloseModUpdate = () => setOpenModUpdate(false);

    useEffect(() => {
        reset(categories)
    }, [])

    const addCategory = async (data) => {
        const response = await fetch('/api/browse/categories', {
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

    function loadMoreVideos() {
        setVideosToShow(videosToShow + 3);
    }

    function renderVideoCard(video) {
        if (editedVideo && editedVideo._id === video._id) {
            return (
                <EditCard
                    key={video._id}
                    title={
                        <TextField
                            type="text"
                            defaultValue={editedVideo.title}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, title: e.target.value })
                            }
                        />
                    }
                    type={
                        <Box sx={{ minWidth: 120, paddingTop: 2 }}>
                            <FormControl variant='filled' fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={editedVideo.type}
                                    value={editedVideo.type}
                                    label="Cat"
                                    onChange={(e) => setEditedVideo({ ...editedVideo, type: e.target.value })}
                                >
                                    {categories.map(cat => (
                                        <MenuItem key={cat._id} value={cat.name}>{cat.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    }
                    desc={
                        <TextField
                            type="text"
                            defaultValue={editedVideo.desc}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, desc: e.target.value })
                            }
                        />
                    }
                    duration={
                        <TextField
                            type="time"
                            defaultValue={editedVideo.duration}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, duration: e.target.value })
                            }
                        />
                    }
                    location={
                        <TextField
                            type="text"
                            defaultValue={editedVideo.location}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, location: e.target.value })
                            }
                        />
                    }
                    dOU={
                        <TextField
                            type="date"
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
                    urlID={
                        <TextField
                            type="text"
                            defaultValue={editedVideo.urlID}
                            onChange={(e) =>
                                setEditedVideo({ ...editedVideo, urlID: e.target.value })
                            }
                        />}
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
                    urlID={video.urlID}
                    player={video.player}
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
                let videoType = selectedCatDropbox === "all" ? true : video.type === selectedCatDropbox;
                return video.title.toLowerCase().includes(searchValue.toLowerCase()) && videoLocation && videoType;
            })
            .slice(0, videosToShow);
        return videosToDisplay.map(renderVideoCard);
    }


    const clear = () => {
        setSearchValue("");
        setLocation("all");
        setSelectedCatDropbox("all");
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

    const columns = [
        { field: 'name', headerName: 'Name:', width: 500 },
        {
            field: 'delete',
            headerName: 'Delete',
            sortable: false,
            filterable: false,
            width: 100,
            renderCell: (params) => (
                <Button
                    onClick={(event) => {
                        event.stopPropagation();
                        deleteCategory(params.row._id);

                    }}
                    color="error"
                ><DeleteForeverIcon></DeleteForeverIcon>
                </Button>
            ),
        },
        {
            field: 'update',
            headerName: 'Update',
            sortable: false,
            filterable: false,
            width: 100,
            renderCell: (params) => (
                <Button
                    onClick={(event) => {
                        event.stopPropagation();
                        setCurrentCatRow(params.row);
                        handleOpenModUpdate()
                        console.log(currentCatRow)
                    }}
                    color="success"
                >
                    <UpdateIcon></UpdateIcon>
                </Button>
            ),
        },
    ];

    function deleteCategory(id) {
        const confirmed = window.confirm("Are you sure you want to delete this category?");
        if (confirmed) {
            fetch(`/api/browse/categories/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    window.location.reload(false);
                })
        }
    }

    const renameCategory = async (data) => {
        const response = await fetch(`/api/browse/categories/${currentCatRow._id}`, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.error) {
            alert('Error: ' + result.error);
        } else {
            setCurrentCatRow(null);
            window.location.reload(false);
        }
    };

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
                            <div style={{ justifyContent: 'center' }}>
                                <Link href="/admin/add" style={{ paddingRight: "15px", color: "black" }}>
                                    {/* <img className='hover' src="https://static.thenounproject.com/png/767525-200.png" width="20%" height="auto" style={{ justifyContent: 'center' }} /> */}
                                    <VideoCallOutlinedIcon className='hover' style={{ width: "18%", height: "18%", paddingRight: "15px" }} />
                                </Link>

                                <AddLocationAltOutlinedIcon className='hover' style={{ width: "15%", height: "15%", paddingLeft: "15px" }} onClick={handleOpenModAdd} />
                                <Modal
                                    open={openModAdd}
                                    onClose={handleCloseModAdd}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Add a Category
                                        </Typography>
                                        <form onSubmit={handleSubmit(addCategory)}>
                                            <TextField id="outlined-basic" label="Outlined" variant="outlined" {...register("name", { required: true })} />
                                            <Button variant="text" type='submit'>Save</Button>
                                        </form>

                                    </Box>
                                </Modal>
                            </div>
                        </section>

                        <br />

                        <div className="input-group rounded justify-content-center" >
                            <TextField type="search" placeholder="Thailand" aria-label="Search" aria-describedby="search-addon" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                            <Button className="fas fa-search" onClick={clear}><BackspaceOutlinedIcon /></Button>
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

                            <Box sx={{ minWidth: 120, paddingTop: 2 }}>
                                <FormControl variant='filled' fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue='all'
                                        value={selectedCatDropbox}
                                        label="Cat"
                                        onChange={(e) => setSelectedCatDropbox(e.target.value)}
                                    >
                                        <MenuItem value="all">All</MenuItem>
                                        {categories.map(cat => (
                                            <MenuItem key={cat._id} value={cat.name}>{cat.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                    </div>


                    <div style={{ minWidth: '400px', width: '70vw' }}>
                        <div className="album py-5 bg-light">
                            <Tabs value={value} onChange={handleTabChange} aria-label="icon label tabs example" centered style={{ paddingBottom: "5px" }}>
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
                                <div>
                                    <DataGrid
                                        rows={dataCat}
                                        columns={columns}
                                        pageSize={10}
                                        rowsPerPageOptions={[10]}
                                        getRowId={(row) => row.name}
                                        style={{ height: '75vh' }}
                                    // onRowClick={(params) => {
                                    //     setSelectedRow(params.row);
                                    //     setCurrentSupplier(params.row);
                                    // }}
                                    // selectionModel={selectedRow ? [selectedRow._id] : []}
                                    />
                                    <Modal
                                        open={openModUpdate}
                                        onClose={handleCloseModUpdate}
                                        aria-labelledby="modal-update-category"
                                        aria-describedby="modal-modal-description"
                                    >
                                        <Box sx={style}>
                                            <Typography id="modal-update-category" variant="h6" component="h2">
                                                Update the Category
                                            </Typography>
                                            <form onSubmit={handleSubmit(renameCategory)}>
                                                <TextField id="outlined-basic" label="" variant="outlined" defaultValue={currentCatRow?.name} {...register("name", { required: false })} />
                                                <Button variant="text" type='submit'>Save</Button>
                                            </form>
                                        </Box>
                                    </Modal>
                                </div>
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

    const cat = await fetch(`https://auvr.vercel.app/api/browse/categories`)
    const categories = await cat.json()
    return { props: { videos, categories } }
}

