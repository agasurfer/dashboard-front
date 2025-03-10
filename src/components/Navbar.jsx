import {React, useState} from 'react'
import { Link } from 'react-router-dom';
import bloc from '../assets/bloc-storage.png';
import bucket from '../assets/bucket.png'
import '../styles/Navbar.css'

const Navbar = () => {

const [activeTab, setActiveTab] = useState("overview"); 

    return (
    <nav>
        
        <div className="tabs">
            <Link to='/' className={`tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")} >
                🌍 Overview
            </Link>
            <Link to='/footprint' className={`tab ${activeTab === "footprint" ? "active" : ""}`}
            onClick={() => setActiveTab("footprint")} >
                👣 Footprint
            </Link>
            <Link to='/containers' className={`tab ${activeTab === "containers" ? "active" : ""}`}
            onClick={() => setActiveTab("containers")} >
                🧊 Containers
            </Link>
            <Link to='/buckets' className={`tab ${activeTab === "buckets" ? "active" : ""}`}
            onClick={() => setActiveTab("buckets")} >
                <img src={bucket} alt="" className="bucket-img" />Buckets
            </Link>
            <Link to='/volumes' className={`tab ${activeTab === "volumes" ? "active" : ""}`}
            onClick={() => setActiveTab("volumes")}>
                <img src={bloc} alt="" className="bloc-img" />Volumes
            </Link>
        </div>
    </nav>
  )
}

export default Navbar