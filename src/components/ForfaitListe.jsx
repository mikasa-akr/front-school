import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForfaitList() {
  const [forfaits, setForfaits] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    fetchForfaits();
  }, []);

  const fetchForfaits = async () => {
    try {
      const response = await axios.get('/crud/forfait');
      setForfaits(response.data);
    } catch (error) {
      console.error('Error fetching forfaits:', error);
    }
  };

  return (
    <>
      <div className="row justify-content-md-center">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
              <div className="d-flex">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/">school</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="container mt-5">
        <h2 style={{ textAlign: 'center', marginTop: '2%' }}>Select Forfait</h2>
        <div className="row" style={{ marginTop: '3%', marginLeft: '25%' }}>
          {forfaits.map((forfait, index) => (
            <div
              key={forfait.id}
              className="col-md-4"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
              style={{
                marginBottom: '20px',
                transition: 'box-shadow 0.3s',
              }}
            >
              <Link
                to={`/register/student?forfait_id=${forfait.id}`}
                className="text-decoration-none"
              >
                <div
                  className="card"
                  style={{
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: hoveredIndex === index ? '#eef0f3' : '#FFFFFF',
                    boxShadow: hoveredIndex === index ? '0px 0px 5px rgba(0, 0, 0, 0.2)' : 'none',
                  }}
                >
                  <div className="card-body">
                    <h5 className="card-title" style={{ textAlign: 'center' }}>{forfait.title}</h5>
                    <hr />
                    <p className="card-text">
                      $<span style={{ fontSize: '50px', display: 'block', textAlign: 'center' }}>{forfait.price}</span>
                      <br />
                      <hr />
                      <div style={{ textAlign: 'center', fontSize: '20px' }}>{forfait.title} includes:</div>
                      <br />
                      - Number of Hour per Session: {forfait.NbrHourSession}h <br />
                      - Number of Hour per lesson: {forfait.NbrHourSeance}h <br />
                      - Type: {forfait.subscription}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Link to={`/register/student?forfait_id=${forfait.id}`}>
                        <button
                          className="btn btn-primary mt-3"
                          style={{
                            backgroundColor: '#319795',
                            border: 'none',
                            transition: 'background-color 0.3s, box-shadow 0.3s',
                            boxShadow: hoveredIndex === index ? '0px 0px 5px rgba(0, 0, 0, 0.2)' : 'none',
                          }}
                        >
                          Subscribe Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ForfaitList;
