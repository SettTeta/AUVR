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

const steps = ['Video Player', 'Data Input', 'Categorization'];


export default function AdminPage({ categories }) {


    const { data: session } = useSession()

    const { register, handleSubmit } = useForm();
    const [data, setData] = useState("");
    const [activeStep, setActiveStep] = useState(0);



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

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                            <Box sx={{ pt: 2 }}>

                                <form onSubmit={handleSubmit(addVideo)}>

                                    {(activeStep === 0) && (
                                        <div className="row d-flex justify-content-start">

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

                                            <div className="col-md-5">
                                                <label htmlFor="link" className="col-form-label">URL Link:</label>
                                                <input className="form-control" id="link" {...register("link", { required: false })} placeholder="URL of Video"></input>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="thumbnail" className="col-form-label">Thumbnail:</label>
                                                <input className="form-control" type="text" id="thumbnail" {...register("thumbnail", { required: false })}></input>
                                                {/* <input className="form-control" type="file" id="thumbnail" {...register("thumbnail", { required: false })}></input> */}
                                            </div>

                                        </div>
                                    )}

                                    {(activeStep === 1) && (
                                        <div className="row d-flex justify-content-start">

                                            <div className="col-md-7 ">
                                                <label htmlFor="title" className="col-form-label">Title:</label>
                                                <input type="text" className="form-control" id="title" {...register("title", { required: false })} placeholder="Video Title" />
                                            </div>

                                            <div className="col-md-4">
                                                <label htmlFor="dateOfUpload" className="col-form-label">Date of Upload:</label>
                                                <input className="form-control" type="date" id="dateOfUpload" {...register("dateOfUpload", { required: false })} />
                                            </div>

                                            <div className="col-md-4">
                                                <label htmlFor="duration" className="col-form-label">Duration:</label>
                                                <input className="form-control" type="time" id="duration" {...register("duration", { required: false })} />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="desc" className="col-form-label">Description:</label>
                                                <input className="form-control" type="text" id="desc" {...register("desc", { required: false })} placeholder="Description of Video"></input>
                                            </div>

                                        </div>
                                    )}

                                    {(activeStep === 2) && (
                                        <div className="row d-flex justify-content-start">
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
                                        disabled={activeStep === 0}
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

            <Footer />
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

