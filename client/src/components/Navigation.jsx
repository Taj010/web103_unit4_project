import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav className="nav-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <div>
                    <h1 className="newspaper-heading" style={{ margin: 0, fontSize: '28px' }}>
                        🍰 Sweet Creations Box
                    </h1>
                    <p className="newspaper-subheading" style={{ margin: '5px 0 0 0', fontSize: '14px' }}>
                        Custom Dessert Boxes Made to Order
                    </p>
                </div>

                <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '20px' }}>
                    <li><Link to='/' className="nav-link">Create Box</Link></li>
                    <li><Link to='/dessert-boxes' className="nav-link">View Boxes</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation