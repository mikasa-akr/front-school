import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../../components/Layout"
 
function UpdateForfait() {
    const [id] = useState(useParams().id)
    const [price, setPrice] = useState('');
    const [title, setTitle] = useState('');
    const [NbrHourSeance, setNbrHourSeance] = useState('');
    const [NbrHourSession, setNbrHourSession] = useState('');
    const [isSaving, setIsSaving] = useState(false)
    const [subscription, setSubscription] = useState([]);
      
    useEffect(() => {
        axios.put(`/crud/forfait/${id}/edit`)
        .then(function (response) {
            let forfait = response.data
            setTitle(forfait.title);
            setPrice(forfait.price);
            setNbrHourSession(forfait.NbrHourSession);
            setNbrHourSeance(forfait.NbrHourSeance);
            setSubscription(forfait.subscription); 
            console.log("NbrHourSeance:", forfait.NbrHourSeance);

        })
        .catch(function (error) {
            let errorMessage = 'An error occurred!'; // Default error message
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message; // Use the error message from the server if available
            }
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                showConfirmButton: false,
                timer: 1500
            });
        })
          
    }, [])
  
  
    const handleSave = () => {
        setIsSaving(true);
        axios.put(`/crud/forfait/${id}/edit`, {
            title: title,
            price: price,
            NbrHourSession: NbrHourSession,
            NbrHourSeance: NbrHourSeance,
            subscription: subscription,
        })
        .then(function (response) {
            // Handle successful response
            Swal.fire({
                icon: 'success',
                title: 'Forfait updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
        })
        .catch(function (error) {
            // Handle error response
            if (error.response && error.response.status === 404) {
                // Forfait not found
                Swal.fire({
                    icon: 'error',
                    title: 'Forfait not found',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                // Generic error
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occurred!',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            setIsSaving(false);
        });
    }
  
  
    return (
        <Layout>
            <div className="container" style={{ marginTop: '10%' }}>
                <h2 className="text-center mt-5 mb-3" style={{color:'#ffffff'}} >Edit Forfait</h2>
                <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/forfait/">View All Forfaits
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name">Title:</label>
                                <input 
                                    onChange={(event)=>{setTitle(event.target.value)}}
                                    value={title}
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="description">Price :</label>
                                <input 
                                    value={price}
                                    onChange={(event)=>{setPrice(event.target.value)}}
                                    className="form-control"
                                    id="price"
                                    name="price"></input>
                            </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nbr_hour_session">Number of hours per session</label>
                                <select
                                    value={NbrHourSession}
                                    onChange={(event) => { setNbrHourSession(event.target.value)}}
                                    className="form-control"
                                    id="NbrHourSession"
                                    name="NbrHourSession"
                                >
                                    <option value="4">4 hours</option>
                                    <option value="6">6 hours</option>
                                    <option value="8">8 hours</option>
                                    <option value="12">12 hours</option>
                                    <option value="16">16 hours</option>
                                </select>
                            </div>
                            <div className="mb-3">
                            <label htmlFor="NbrHourSeance">Number of hours per lesson</label>
                            <select 
                                value={NbrHourSeance}
                                onChange={(Event) =>{setNbrHourSeance(Event.target.value)}}
                                className='form_control'
                                id='NbrHourSeance'>
                                   {NbrHourSession === '4' && (
                                        <>
                                            <option value="30">30 minutes</option>
                                            <option value="1">1 hour</option>
                                        </>
                                    )}
                                    {NbrHourSession === '8' && (
                                        <>
                                            <option value="1">1 hour</option>
                                            <option value="2">2 hours</option>
                                        </>
                                    )}
                                    {NbrHourSession === '6' && (
                                        <>
                                            <option value="45">45 minutes</option>
                                            <option value="1.30">1.30 hours</option>
                                        </>
                                    )}
                                    {NbrHourSession === '16' && (
                                        <>
                                            <option value="2">2 hours</option>
                                            <option value="4">4 hours</option>
                                        </>
                                    )}
                                    {NbrHourSession === '12' && (
                                        <>
                                            <option value="1.30">1.30 hours</option>
                                            <option value="3">3 hours</option>
                                        </>
                                    )}

                                </select>
                                </div>
                                <div className="mb-3">
                                        <label htmlFor="susbscription">Select Subscription:</label>
                                        <select
                                            className="form-control"
                                            id="susbscription"
                                            value={subscription}
                                            onChange={(event)=>{setSubscription(event.target.value)}}
                                        >
                                                <option value='private'>Private</option>
                                                <option value='public'>Public</option>

                                        </select>
                                </div>
                                <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline" style={{borderRadius:'25px',background :"#11cdef",color:'#ffffff',marginLeft:'30px'}}
                                >
                                    Update Forfait
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default UpdateForfait;