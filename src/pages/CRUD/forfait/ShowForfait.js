import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import Layout from "../../../components/Layout";
 
  
function ShowForfait() {
    const [id, setId] = useState(useParams().id)
    const [forfait, setForfait] = useState({title:'', price:'',NbrHourSession:'',NbrHourSeance:'',subscription:''})
 
    useEffect(() => {
        axios.get(`/crud/forfait/${id}`)
        .then(function (response) {
          setForfait(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])
  
    return (
        <Layout>
           <div className="container" style={{ marginTop: '10%' }}>
            <h2 className="text-center mt-5 mb-3" style={{color:'#ffffff'}} >Show Forfait</h2>
                <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="card-header">
                        <Link 
                            className="btn btn-outline-dark"
                            to="/crud/forfait/"> View All Forfaits
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Ttile:</b>
                        <p>{forfait.title}</p>
                        <b className="text-muted">Last Name:</b>
                        <p>{forfait.price}</p>
                        <b className="text-muted">Number of hours per session:</b>
                        <p>{forfait.NbrHourSession}</p>
                        <b className="text-muted">Number of hours per lesson:</b>
                        <p>{forfait.NbrHourSeance}</p>
                        <b className="text-muted">Subscription</b>
                        <p>{forfait.subscription}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default ShowForfait;