import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllDessertBoxes, deleteDessertBox } from '../services/DessertBoxAPI'
import '../App.css'

const ViewDessertBoxes = () => {
  const [dessertBoxes, setDessertBoxes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDessertBoxes = async () => {
      try {
        const data = await getAllDessertBoxes()
        setDessertBoxes(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load dessert boxes. Please try again.')
        setLoading(false)
      }
    }
    
    fetchDessertBoxes()
  }, [])

  const handleDelete = async (id, event) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (window.confirm('Are you sure you want to delete this dessert box?')) {
      try {
        await deleteDessertBox(id)
        setDessertBoxes(dessertBoxes.filter(box => box.id !== id))
      } catch (err) {
        setError('Failed to delete dessert box. Please try again.')
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="loading-spinner"></div>
        <p className="newspaper-subheading">Loading your dessert boxes...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="dessert-form">
        <div className="error-message">{error}</div>
        <button className="btn-primary" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="newspaper-heading" style={{ fontSize: '36px', marginBottom: '10px' }}>
          Your Custom Dessert Boxes
        </h1>
        <p className="newspaper-subheading" style={{ fontSize: '18px' }}>
          {dessertBoxes.length === 0 ? 'No dessert boxes created yet' : `${dessertBoxes.length} custom dessert box${dessertBoxes.length !== 1 ? 'es' : ''} created`}
        </p>
      </div>

      {dessertBoxes.length === 0 ? (
        <div className="dessert-form" style={{ textAlign: 'center' }}>
          <h3 className="newspaper-subheading">No dessert boxes yet!</h3>
          <p>Create your first custom dessert box to get started.</p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>
            Create Your First Box
          </Link>
        </div>
      ) : (
        <div className="dessert-grid">
          {dessertBoxes.map(box => (
            <div key={box.id} className="dessert-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <h3 className="newspaper-heading" style={{ margin: 0, fontSize: '20px' }}>
                  {box.dessert_type_name} Box
                </h3>
                <div className="price-amount" style={{ fontSize: '18px' }}>
                  ${parseFloat(box.total_price).toFixed(2)}
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Flavor:</strong> {box.flavor_name}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Quantity:</strong> {box.quantity} pieces
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Packaging:</strong> {box.packaging_name}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Dietary:</strong> {box.dietary_name}
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Theme:</strong> {box.theme_name}
                </p>
                {box.custom_message && (
                  <p style={{ margin: '5px 0', color: '#666', fontStyle: 'italic' }}>
                    <strong>Message:</strong> "{box.custom_message}"
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  Created: {formatDate(box.created_at)}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link 
                    to={`/dessert-boxes/${box.id}`} 
                    className="btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '14px' }}
                  >
                    View
                  </Link>
                  <Link 
                    to={`/edit/${box.id}`} 
                    className="btn-secondary"
                    style={{ padding: '8px 16px', fontSize: '14px' }}
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={(e) => handleDelete(box.id, e)}
                    className="btn-secondary"
                    style={{ 
                      padding: '8px 16px', 
                      fontSize: '14px',
                      background: '#ffebee',
                      color: '#c62828',
                      border: '2px solid #f44336'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/" className="btn-primary">
          Create New Dessert Box
        </Link>
      </div>
    </div>
  )
}

export default ViewDessertBoxes
