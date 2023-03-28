import Header from '../../components/header'
import Footer from '../../components/footer'
import * as React from 'react'
import Head from 'next/head'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react"

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Image from 'next/image';

const steps = ['Video Player', 'Data Input', 'Categorization'];

import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Modal from '@mui/material/Modal';
import yHelp from '../../public/youtube-help.png'
import vHelp from '../../public/vimeo-help.png'


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

export default function AdminPage({ categories }) {


    const { data: session } = useSession()

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
    const [activeStep, setActiveStep] = useState(0);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



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
        window.location.href = "/admin"
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (activeStep === 0) {
            window.location.href = "/admin"
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    // if (session) {
    return (
        <main role="main" style={{ paddingTop: "14vh" }}>
            <div>
                <Head>
                    <title>Admin - Add</title>
                    <meta name="description" content="Admin adding content page" />
                </Head>
            </div>

            <Header />

            <div className='container'>
                <Box sx={{ width: '90vw' }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};

                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                    <React.Fragment>
                        {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
                        <Box sx={{ pt: 2 }}>

                            <form onSubmit={handleSubmit(addVideo)}>

                                {(activeStep === 0) && (
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh" }}>
                                        <div className='col-md-4'>
                                            <label htmlFor="player" className="col-form-label">1. Choose Video Player:</label>
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

                                        <div className='col-md-4' style={{ paddingTop: "3rem" }}>
                                            <label htmlFor="link" className="col-form-label">2. Insert URL ID: <HelpOutlineOutlinedIcon className='hover' onClick={handleOpen} /></label>
                                            <input className="form-control" id="link" {...register("urlID", { required: false })} placeholder="URL ID"></input>
                                        </div>

                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>
                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    For Youtube:
                                                </Typography>
                                                <Image className="rounded mx-auto d-block"
                                                    src={yHelp}
                                                    alt=""
                                                    width="350"
                                                    height="40" />

                                                <br />

                                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                                    For Vimeo:
                                                    <Image className="rounded mx-auto d-block"
                                                        src={vHelp}
                                                        alt=""
                                                        width="300"
                                                        height="40" />
                                                </Typography>
                                            </Box>
                                        </Modal>

                                    </div>
                                )}

                                {(activeStep === 1) && (
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh" }}>

                                        <div className="col-md-5" style={{ justifyContent: "center" }}>
                                            <label htmlFor="title" className="col-form-label">3. Set title:</label>
                                            <input type="text" className="form-control" id="title" {...register("title", { required: false })} placeholder="Video Title" />
                                        </div>

                                        <div className="col-md-5" style={{ justifyContent: "center" }}>
                                            <label htmlFor="desc" className="col-form-label">4. Set description:</label>
                                            <textarea className="form-control" type="text" id="desc" rows="3" {...register("desc", { required: false })} placeholder="Description of Video"></textarea>
                                        </div>

                                        <div className="d-flex col-md-4" style={{ justifyContent: "left" }}>
                                            <div className="col-md-5" style={{ marginRight: "1rem" }}>
                                                <label htmlFor="dateOfUpload" className="col-form-label">5. Date of Upload:</label>
                                                <input className="form-control" type="date" id="dateOfUpload" {...register("dateOfUpload", { required: false })} />
                                            </div>

                                            <div className="col-md-5" style={{ marginLeft: "1rem" }}>
                                                <label htmlFor="duration" className="col-form-label">6. Video duration:</label>
                                                <input className="form-control" type="time" id="duration" {...register("duration", { required: false })} />
                                            </div>
                                        </div>

                                    </div>
                                )}

                                {(activeStep === 2) && (
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh" }}>
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
                                                <option value="">Select Category</option>
                                                {categories.map(cat => (
                                                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {(activeStep === 3) && (
                                    <div className="row d-flex justify-content-start">
                                        <Typography sx={{ mt: 2, mb: 1 }}>
                                            All steps completed - you&apos;re finished
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            <Button onClick={handleReset}>Reset</Button>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </Box>
                                    </div>
                                )}

                            </form>

                            <Box style={{ display: 'flex', flexDirection: 'row' }}>
                                <Button
                                    color="inherit"
                                    // disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto' }} />

                                <Button onClick={handleNext} disabled={activeStep === 3}>

                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </Box>
                    </React.Fragment>

                </Box>
            </div>
        </main>
    )
    // }
    return (<><p>Access Denied</p> <Footer /></>)

}

export async function getServerSideProps() {
    const cat = await fetch(`https://auvr.vercel.app/api/browse/categories`)
    const categories = await cat.json()
    return { props: { categories } }
}

