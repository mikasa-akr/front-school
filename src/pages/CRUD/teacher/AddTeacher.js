import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from '../../../components/Layout';

function AddTeacher() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const [courses, setCourses] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    axios
      .post('/signUp/teacher', {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        number: number,
        gender: gender,
        avatar: avatar,
        course_id: selectedCourseId
      })
      .then(function (response) {
        Swal.fire({
          icon: 'success',
          title: 'Teacher saved successfully!',
          showConfirmButton: false,
          timer: 1500
        });
        setIsSaving(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setNumber('');
        setGender('');
        setAvatar('');
        setSelectedCourseId('');
      })
      .catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'An Error Occurred!',
          showConfirmButton: false,
          timer: 1500
        });
        setIsSaving(false);
      });
  };

  return (
    <Layout>
      <div className="container" style={{ marginTop: '10%' }}>
        <h2 className="text-center mt-2 mb-3" style={{color:'#ffffff'}} >Create New Teacher</h2>
        <div className="card" style={{ borderRadius: '20px' }}>
          <div className="card-header">
            <Link
              className="btn btn-outline-dark"
              to="/crud/teacher/"
            >
              View All Teachers
            </Link>
          </div>
          <div className="card-body">
            <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName">First Name:</label>
                <input
                  onChange={(event) => { setFirstName(event.target.value); }}
                  value={firstName}
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  value={lastName}
                  onChange={(event) => { setLastName(event.target.value); }}
                  className="form-control"
                  id="lastName"
                  name="lastName"
                />
              </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email:</label>
                <input
                  onChange={(event) => { setEmail(event.target.value); }}
                  value={email}
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password:</label>
                <input
                  onChange={(event) => { setPassword(event.target.value); }}
                  value={password}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="number">Number Phone:</label>
                <input
                  onChange={(event) => { setNumber(event.target.value); }}
                  value={number}
                  type="text"
                  className="form-control"
                  id="number"
                  name="number"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="gender">Gender:</label>
                <select
                  className="form-control"
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(event) => { setGender(event.target.value); }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="children">Children</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="courseSelect" >Select Course:</label>
                <select
                  className="form-control"
                  id="courseSelect"
                  value={selectedCourseId}
                  onChange={(event) => { setSelectedCourseId(event.target.value); }}
                >
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="avatar">Avatar:</label>
                <input
                  onChange={(event) => { setAvatar(event.target.value); }}
                  value={avatar}
                  type="text"
                  className="form-control"
                  id="avatar"
                  name="avatar"
                />
              </div>
              <button
                disabled={isSaving}
                onClick={handleSave}
                type="button"
                className="btn btn-outline" style={{borderRadius:'25px',background :"#11cdef",color:'#ffffff',marginLeft:'30px'}}
                >
                Save Teacher
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddTeacher;
