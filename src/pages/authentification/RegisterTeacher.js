import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Layout from '../../components/Layout';

function RegisterTeacher() {
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
    <>
    <div className="row justify-content-md-center">
      <div className="col-12">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/" style={{color:"#4fd1c5"}} >school</a>
            <div className="d-flex ms-auto align-items-center">
                <p className="me-3 mb-0">Are you a Student?</p>
                <a className="navbar-brand" style={{color:"#4fd1c5", fontSize: "16px"}} href='/register/forfait'>Apply as Student</a>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <Layout>
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <div style={{ margin: 'auto', padding: '40px' }}>
        <h2 className="text-center mt-5 mb-3">Sign Up as Teacher</h2>
          <form>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  onChange={(event) => { setFirstName(event.target.value); }}
                  value={firstName}
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  onChange={(event) => { setLastName(event.target.value); }}
                  value={lastName}
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
              </div>
              </div>
              <div className="mb-3">
                <input
                  onChange={(event) => { setEmail(event.target.value); }}
                  value={email}
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={(event) => { setPassword(event.target.value); }}
                  value={password}
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={(event) => { setNumber(event.target.value); }}
                  value={number}
                  type="text"
                  className="form-control"
                  id="number"
                  name="number"
                  placeholder="Number Phone"
                />
              </div>
              <div className="mb-3">
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
                <select
                  className="form-control"
                  id="courseSelect"
                  value={selectedCourseId}
                  onChange={(event) => { setSelectedCourseId(event.target.value); }}
                >
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <input
                  onChange={(event) => { setAvatar(event.target.value); }}
                  value={avatar}
                  type="text"
                  className="form-control"
                  id="avatar"
                  name="avatar"
                  placeholder="Avatar"
                />
              </div>
              <div className="mb-3">
              <button
                            disabled={isSaving}
                            onClick={handleSave}
                            type="button"
                            className="btn"
                            style={{width:"120px",backgroundColor:"#4fd1c5",color :"#ffffff",borderRadius:'40px',marginLeft:'35%'}}
                        >
                            {isSaving ? 'Saving...' : 'Sign Up'}
                        </button>
                        <p className="text-center">
                            Already have an account? <Link to="/login" style={{color:"#4fd1c5"}}>Login here</Link>
                        </p>
              </div>
          </form>
        </div>
      </div>
      </div>
      </div>
    </Layout>
    </>
  );
}

export default RegisterTeacher;
