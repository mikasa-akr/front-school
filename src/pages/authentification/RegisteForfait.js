import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../components/Layout"

function RegisterForfait() {
    const [id] = useState(useParams().id)
    const [price, setPrice] = useState('');
    const [title, setTitle] = useState('');
    const [NbrHourSeance, setNbrHourSeance] = useState('');
    const [NbrHourSession, setNbrHourSession] = useState('');
    const [isSaving, setIsSaving] = useState(false)
    const [subscriptions, setSubscription] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedSubscId, setSelectedSubscId] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');


    useEffect(() => {
        fetchCourses();
        fetchSubscriptions();
    }, []);

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

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/course'); // Adjust the URL accordingly
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    const fetchSubscriptions = async () => {
        try {
            const response = await axios.get('/subscription'); // Adjust the URL accordingly
            setSubscription(response.data);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
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
            subscription_id: selectedSubscId,
            course_id: selectedCourseId
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
            setSelectedCourseId(''); 
            setSelectedSubscId(''); 
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
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                    <div style={{ margin: 'auto',padding:'40px'}}>
                    <h2 className="text-center" style={{padding:'20px'}}>Register Forfait</h2>
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
                                    {/* Add options for number of hours per lesson */}
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
                                    <label htmlFor="courseSelect">Select Course:</label>
                                    <select
                                        className="form-control"
                                        id="courseSelect"
                                        value={selectedCourseId}
                                        onChange={(event)=>{setSelectedCourseId(event.target.value)}}
                                    >
                                        {courses.map(course => (
                                            <option key={course.id} value={course.id}>
                                                {course.type}
                                            </option>
                                        ))}
                                    </select>
                            </div>
                            <div className="mb-3">
                                    <label htmlFor="susbscriptionSelect">Select Subscription:</label>
                                    <select
                                        className="form-control"
                                        id="susbscriptionSelect"
                                        value={selectedSubscId}
                                        onChange={(event)=>{setSelectedSubscId(event.target.value)}}
                                    >
                                        {subscriptions.map(subscription => (
                                            <option key={subscription.id} value={subscription.id}>
                                                {subscription.type}
                                            </option>
                                        ))}
                                    </select>
                            </div>
                            <button
                            disabled={isSaving}
                            onClick={handleSave}
                            type="button"
                            className="btn btn-primary btn-block"
                            style={{width:"120px",backgroundColor:"#108a00",color :"#ffffff",borderRadius:'40px',marginLeft:'35%'}}
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                        <p className="text-center">
                            Already have a Subscription? <Link to="/register/student" style={{color:"#108a00"}}>Sign Up as Student here</Link>
                        </p>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        </Layout>
    );
}
export default RegisterForfait;
