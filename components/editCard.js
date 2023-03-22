import * as React from "react"
import SaveAltIcon from '../node_modules/@mui/icons-material/SaveAltSharp';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Button from '@mui/material/Button';
import KeyboardReturnOutlinedIcon from '@mui/icons-material/KeyboardReturnOutlined';

function CardTemplate(props) {
    const { title, link, desc, thumbnail, onView, duration, location, dOU, onDel, onSave, onCancel, type, thTitle, urlID } = props

    return (
        <div className="card mb-3">
            <div className="card-header bg-white" style={{ verticalAlign: "middle" }}>
                <div>
                    <Button color="error" style={{ float: "right", marginTop: "3px" }}>
                        <DeleteForeverOutlinedIcon className="hover"
                            src="https://cdn-icons-png.flaticon.com/512/70/70091.png"
                            onClick={onDel}
                            fontSize="large"
                        />
                    </Button>

                    <h5 style={{ paddingTop: "8px" }}>{thTitle}</h5>
                </div>
            </div>

            <div className="row g-0 " style={{ display: "flex" }}>
                <div style={{ padding: "20px" }}>
                    <div className="card card-body">
                        <div className="row g-200">
                            <div className="col-md-6">
                                <h5>Title:</h5>
                                <p>{title}</p>

                                <div className="row g-200">
                                    <div className="col-md-6">
                                        <h5>URL ID:</h5>
                                        <p style={{ paddingTop: "16px" }}>{urlID}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>Category:</h5>
                                        <p>{type}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>Duration:</h5>
                                        <p>{duration}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>Date of Upload:</h5>
                                        <p>{dOU}</p>
                                    </div>
                                </div>


                            </div>
                            <div className="col-md-6">
                                <h5>Description:</h5>
                                <p>{desc}</p>

                                <h5>Campus:</h5>
                                <p>{location}</p>

                                <div className="col-md-12 d-flex justify-content-center">
                                    <Button onClick={onCancel} style={{marginRight:"50px"}}><KeyboardReturnOutlinedIcon className="hover"
                                        fontSize="large" 
                                    /> Back</Button>
                                    <Button onClick={onSave} style={{marginLeft:"50px"}}><SaveAltIcon className="hover"
                                        fontSize="large" 
                                    /> Save</Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTemplate
