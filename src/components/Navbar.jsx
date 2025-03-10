import {React, useState} from 'react'
import { Link } from 'react-router-dom';
import bloc from '../assets/bloc-storage.png';
import bucket from '../assets/bucket.png'
import '../styles/Navbar.css'

const Navbar = () => {

const [activeTab, setActiveTab] = useState("overview"); 

    return (
    <nav>
        
        <ul className="tabs">
            <li className={`tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}>
                <Link to='/' >🌍 Overview</Link>
            </li>
            <li className={`tab ${activeTab === "footprint" ? "active" : ""}`}
            onClick={() => setActiveTab("footprint")}>
                <Link to='/footprint' >👣 Footprint</Link>
            </li>
            <li className={`tab ${activeTab === "containers" ? "active" : ""}`}
            onClick={() => setActiveTab("containers")}>
                <Link to='/containers' >🧊 Containers</Link>
            </li>
            <li className={`tab ${activeTab === "buckets" ? "active" : ""}`}
            onClick={() => setActiveTab("buckets")}>
                <Link to='/buckets' ><img src={bucket} alt="" className="bucket-img" />Buckets</Link>
            </li>
            <li className={`tab ${activeTab === "volumes" ? "active" : ""}`}
            onClick={() => setActiveTab("volumes")}>
                <Link to='/volumes' ><img src={bloc} alt="" className="bloc-img" />Volumes</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar