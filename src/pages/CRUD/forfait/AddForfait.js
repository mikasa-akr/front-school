import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../../components/Layout"

function AddForfait() {
    const [id] = useState(useParams().id)
    const [price, setPrice] = useState('');
    const [title, setTitle] = useState('');
    const [NbrHourSeance, setNbrHourSeance] = useState('');
    const [NbrHourSession, setNbrHourSession] = useState('');
    const [isSaving, setIsSaving] = useState(false)
    const [subscription, setSubscription] = useState([]);

    const handleNbrHourSessionChange = (event) => {
        const selectedValue = event.target.value;
        setNbrHourSession(selectedValue);

        // Update nbr_hour_seance based on selected value of nbr_hour_session
        if (selectedValue === '6') {
            // Set values for 6 hours per session
            setNbrHourSeance('45');
        } else if (selectedValue === '16') {
            // Set values for 16 hours per session
            setNbrHourSeance('4');
        }
        else if (selectedValue === '8') {
            // Set values for 16 hours per session
            setNbrHourSeance('4');
        }
        else if (selectedValue === '4') {
            // Set values for 16 hours per session
            setNbrHourSeance('1');
        }
        else if (selectedValue === '12') {
            // Set values for 16 hours per session
            setNbrHourSeance('3');
        } else {
            // Set default value for other cases
            setNbrHourSeance('');
        }
    };
      
    const handleSave = () => {
        setIsSaving(true);
        
        axios
          .post('/signUp/forfait', {
            title: title,
            price: price,
            NbrHourSession: NbrHourSession,
            NbrHourSeance: NbrHourSeance,
            subscription: subscription,
          })
          .then(function (response) {
            Swal.fire({
              icon: 'success',
              title: 'Student saved successfully!',
              showConfirmButton: false,
              timer: 1500,
            });
            setIsSaving(false);
            setTitle('');
            setPrice('');
            setNbrHourSession('');
            setNbrHourSeance('');
            setSubscription('');
          })
          .catch(function (error) {
            Swal.fire({
              icon: 'error',
              title: 'An Error Occurred!',
              showConfirmButton: false,
              timer: 1500,
            });
            setIsSaving(false);
          });
      };
    return (
        <Layout>
            <div className="container" style={{ marginTop: '10%' }}>
                <h2 className="text-center mt-2 mb-3" style={{color:'#ffffff'}} >Edit Forfait</h2>
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
                            /</div>
                            <div className="mb-3">
                                <label htmlFor="nbr_hour_session">Number of hours per session</label>
                                <select
                                    value={NbrHourSession}
                                    onChange={handleNbrHourSessionChange}
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
                                <label htmlFor="nbr_hour_seance">Number of hours per lesson</label>
                                <select
                                    value={NbrHourSeance}
                                    onChange={(event) => { setNbrHourSeance(event.target.value) }}
                                    className="form-control"
                                    id="NbrHourSeance"
                                    name="NbrHourSeance"
                                >
                                <option value=''></option>
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
                                    <label htmlFor="subscription">Select Subscription:</label>
                                    <select
                                        className="form-control"
                                        id="subscription"
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
                                Add Forfait
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default AddForfait;
