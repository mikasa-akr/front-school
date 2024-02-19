import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios'
import Layout from "../../../components/Layout"
 
function UpdateAdmin() {
    const [id, setId] = useState(useParams().id)
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [number, setNumber] = useState('');
    const [isSaving, setIsSaving] = useState(false)
      
    useEffect(() => {
        axios.put(`/crud/admin/${id}/edit`)
        .then(function (response) {
            let admin = response.data
            setFirstName(admin.firstName);
            setLastName(admin.lastName);
            setEmail(admin.email);
            setGender(admin.gender);
            setNumber(admin.number);
        })
        .catch(function (error) {
            Swal.fire({
                 icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        })
          
    }, [])
  
  
    const handleSave = () => {
        setIsSaving(true);
        axios.put(`/crud/admin/${id}/edit`, {
            firstName: firstName,
            lastName: lastName,
            email:email,
            gender:gender,
            number:number

        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'admin updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
        })
        .catch(function (error) {
            Swal.fire({
                 icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
        });
    }
  
  
    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Edit admin</h2>
                <div className="card">
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/admin/">View All admins
                        </Link>
                    </div>
                    <div className="card-body">
                        <form>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="name">First Name:</label>
                                <input 
                                    onChange={(event)=>{setFirstName(event.target.value)}}
                                    value={firstName}
                                    type="text"
                                    className="form-control"
                                    id="firsName"
                                    name="firstName"/>
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="description">Last Name:</label>
                                <input 
                                    value={lastName}
                                    onChange={(event)=>{setLastName(event.target.value)}}
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"></input>
                            </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name">Email:</label>
                                <input 
                                    onChange={(event)=>{setEmail(event.target.value)}}
                                    value={email}
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    name="email"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name">Number Phone:</label>
                                <input 
                                    onChange={(event)=>{setNumber(event.target.value)}}
                                    value={number}
                                    type="text"
                                    className="form-control"
                                    id="number"
                                    name="number"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender">Gender:</label>
                                <select
                                    className="form-control"
                                    id="gender"
                                    name="gender"
                                    value={gender}
                                    onChange={(event)=>{setGender(event.target.value)}}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="children">Children</option>
                                </select>
                            </div>
                            <button 
                                disabled={isSaving}
                                onClick={handleSave} 
                                type="button"
                                className="btn btn-outline" style={{borderRadius:'25px',background :"#108a00",color:'#ffffff',marginTop:'15px',marginLeft:'30px'}}
                                >
                                Update Admin
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default UpdateAdmin;              