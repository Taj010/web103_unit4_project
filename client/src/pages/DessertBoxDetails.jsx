import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getDessertBoxById, deleteDessertBox } from '../services/DessertBoxAPI'
import '../App.css'

const DessertBoxDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [dessertBox, setDessertBox] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDessertBox = async () => {
      try {
        const data = await getDessertBoxById(id)
        setDessertBox(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load dessert box. Please try again.')
        setLoading(false)
      }
    }
    
    fetchDessertBox()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this dessert box?')) {
      try {
        await deleteDessertBox(id)
        navigate('/dessert-boxes')
      } catch (err) {
        setError('Failed to delete dessert box. Please try again.')
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="loading-spinner"></div>
        <p className="newspaper-subheading">Loading dessert box details...</p>
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

  if (!dessertBox) {
    return (
      <div className="dessert-form">
        <div className="error-message">Dessert box not found</div>
        <Link to="/dessert-boxes" className="btn-primary">
          Back to Dessert Boxes
        </Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 className="newspaper-heading" style={{ fontSize: '36px', marginBottom: '10px' }}>
          {dessertBox.dessert_type_name} Dessert Box
        </h1>
        <p className="newspaper-subheading" style={{ fontSize: '18px' }}>
          Custom created on {formatDate(dessertBox.created_at)}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Details Section */}
        <div className="dessert-form">
          <h3 className="newspaper-heading" style={{ marginBottom: '20px' }}>Box Details</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span><strong>Dessert Type:</strong></span>
              <span>{dessertBox.dessert_type_name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span><strong>Flavor:</strong></span>
              <span>{dessertBox.flavor_name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span><strong>Quantity:</strong></span>
              <span>{dessertBox.quantity} pieces</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span><strong>Packaging:</strong></span>
              <span>{dessertBox.packaging_name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span><strong>Dietary Option:</strong></span>
              <span>{dessertBox.dietary_name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span><strong>Theme:</strong></span>
              <span>{dessertBox.theme_name}</span>
            </div>
            {dessertBox.custom_message && (
              <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '4px' }}>
                <strong>Custom Message:</strong>
                <p style={{ margin: '10px 0 0 0', fontStyle: 'italic' }}>"{dessertBox.custom_message}"</p>
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
            <Link to={`/edit/${dessertBox.id}`} className="btn-primary">
              Edit Box
            </Link>
            <button onClick={handleDelete} className="btn-secondary" style={{ 
              background: '#ffebee',
              color: '#c62828',
              border: '2px solid #f44336'
            }}>
              Delete Box
            </button>
          </div>
        </div>

        {/* Price Section */}
        <div className="preview-panel">
          <h3 className="preview-title">Price Breakdown</h3>
          
          <div className="price-display" style={{ marginBottom: '20px' }}>
            <div className="price-amount" style={{ fontSize: '32px' }}>
              ${parseFloat(dessertBox.total_price).toFixed(2)}
            </div>
            <div style={{ fontSize: '14px', marginTop: '10px' }}>
              Total Price
            </div>
          </div>

          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#1565c0' }}>Price Components:</h4>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Base Price ({dessertBox.dessert_type_name}):</span>
              <span>${parseFloat(dessertBox.base_price).toFixed(2)}</span>
            </div>
            
            {parseFloat(dessertBox.flavor_modifier) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Flavor ({dessertBox.flavor_name}):</span>
                <span>+${parseFloat(dessertBox.flavor_modifier).toFixed(2)}</span>
              </div>
            )}
            
            {parseFloat(dessertBox.packaging_modifier) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Packaging ({dessertBox.packaging_name}):</span>
                <span>+${parseFloat(dessertBox.packaging_modifier).toFixed(2)}</span>
              </div>
            )}
            
            {parseFloat(dessertBox.dietary_modifier) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Dietary ({dessertBox.dietary_name}):</span>
                <span>+${parseFloat(dessertBox.dietary_modifier).toFixed(2)}</span>
              </div>
            )}
            
            {parseFloat(dessertBox.theme_modifier) > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Theme ({dessertBox.theme_name}):</span>
                <span>+${parseFloat(dessertBox.theme_modifier).toFixed(2)}</span>
              </div>
            )}
            
            <div style={{ 
              borderTop: '2px solid #1976d2', 
              marginTop: '15px', 
              paddingTop: '15px',
              display: 'flex', 
              justifyContent: 'space-between',
              fontWeight: 'bold',
              fontSize: '16px'
            }}>
              <span>Total:</span>
              <span>${parseFloat(dessertBox.total_price).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/dessert-boxes" className="btn-secondary">
          Back to All Boxes
        </Link>
      </div>
    </div>
  )
}

export default DessertBoxDetails
