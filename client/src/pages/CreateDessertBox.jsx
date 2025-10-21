import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllOptions } from '../services/DessertOptionsAPI'
import { createDessertBox } from '../services/DessertBoxAPI'
import { calculateDessertBoxPrice, validateDessertCombination, getPriceBreakdown } from '../utilities/priceCalculator'
import '../App.css'

const CreateDessertBox = () => {
  const navigate = useNavigate()
  const [options, setOptions] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  
  const [selections, setSelections] = useState({
    dessertType: '',
    flavor: '',
    packaging: '',
    dietary: '',
    theme: '',
    quantity: 12,
    customMessage: ''
  })

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await getAllOptions()
        setOptions(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to load options. Please try again.')
        setLoading(false)
      }
    }
    
    fetchOptions()
  }, [])

  const handleSelectionChange = (field, value) => {
    const newSelections = { ...selections, [field]: value }
    setSelections(newSelections)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate selections
    const validationErrors = validateDessertCombination(selections, options)
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '))
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const totalPrice = calculateDessertBoxPrice(selections, options)
      
      const dessertBoxData = {
        dessert_type_id: parseInt(selections.dessertType),
        flavor_id: parseInt(selections.flavor),
        packaging_id: parseInt(selections.packaging),
        dietary_id: parseInt(selections.dietary),
        theme_id: parseInt(selections.theme),
        quantity: parseInt(selections.quantity),
        custom_message: selections.customMessage,
        total_price: totalPrice
      }

      const result = await createDessertBox(dessertBoxData)
      navigate(`/dessert-boxes/${result.id}`)
    } catch (err) {
      setError('Failed to create dessert box. Please try again.')
      setSubmitting(false)
    }
  }

  const currentPrice = calculateDessertBoxPrice(selections, options)
  const priceBreakdown = getPriceBreakdown(selections, options)
  const validationErrors = validateDessertCombination(selections, options)

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="loading-spinner"></div>
        <p className="newspaper-subheading">Loading dessert options...</p>
      </div>
    )
  }

  if (error && !validationErrors.length) {
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
          Create Your Custom Dessert Box
        </h1>
        <p className="newspaper-subheading" style={{ fontSize: '18px' }}>
          Select your preferences and watch your box come to life!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Form Section */}
        <div className="dessert-form">
          <form onSubmit={handleSubmit}>
            {/* Dessert Type */}
            <div className="form-group">
              <label className="form-label">Dessert Type</label>
              <select
                className="form-select"
                value={selections.dessertType}
                onChange={(e) => handleSelectionChange('dessertType', e.target.value)}
                required
              >
                <option value="">Choose your dessert...</option>
                {options?.dessertTypes?.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name} - ${type.base_price}
                  </option>
                ))}
              </select>
            </div>

            {/* Flavor */}
            <div className="form-group">
              <label className="form-label">Flavor</label>
              <select
                className="form-select"
                value={selections.flavor}
                onChange={(e) => handleSelectionChange('flavor', e.target.value)}
                required
              >
                <option value="">Choose your flavor...</option>
                {options?.flavors?.map(flavor => (
                  <option key={flavor.id} value={flavor.id}>
                    {flavor.name} {flavor.price_modifier > 0 ? `(+$${flavor.price_modifier})` : ''}
                    {flavor.is_premium ? ' ⭐' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label className="form-label">Quantity</label>
              <select
                className="form-select"
                value={selections.quantity}
                onChange={(e) => handleSelectionChange('quantity', e.target.value)}
                required
              >
                <option value={6}>6 pieces</option>
                <option value={12}>12 pieces</option>
                <option value={24}>24 pieces</option>
              </select>
            </div>

            {/* Packaging */}
            <div className="form-group">
              <label className="form-label">Packaging</label>
              <select
                className="form-select"
                value={selections.packaging}
                onChange={(e) => handleSelectionChange('packaging', e.target.value)}
                required
              >
                <option value="">Choose packaging...</option>
                {options?.packaging?.map(pkg => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} {pkg.price_modifier > 0 ? `(+$${pkg.price_modifier})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Dietary Option */}
            <div className="form-group">
              <label className="form-label">Dietary Option</label>
              <select
                className="form-select"
                value={selections.dietary}
                onChange={(e) => handleSelectionChange('dietary', e.target.value)}
                required
              >
                <option value="">Choose dietary option...</option>
                {options?.dietary?.map(diet => (
                  <option key={diet.id} value={diet.id}>
                    {diet.name} {diet.price_modifier > 0 ? `(+$${diet.price_modifier})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme */}
            <div className="form-group">
              <label className="form-label">Theme</label>
              <select
                className="form-select"
                value={selections.theme}
                onChange={(e) => handleSelectionChange('theme', e.target.value)}
                required
              >
                <option value="">Choose theme...</option>
                {options?.themes?.map(theme => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name} {theme.price_modifier > 0 ? `(+$${theme.price_modifier})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Message */}
            <div className="form-group">
              <label className="form-label">Custom Message (Optional)</label>
              <textarea
                className="form-input"
                value={selections.customMessage}
                onChange={(e) => handleSelectionChange('customMessage', e.target.value)}
                placeholder="Add a personal message to your dessert box..."
                rows="3"
              />
            </div>

            {/* Error Messages */}
            {validationErrors.length > 0 && (
              <div className="error-message">
                {validationErrors.join(', ')}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting || validationErrors.length > 0}
              style={{ width: '100%', marginTop: '20px' }}
            >
              {submitting ? 'Creating Box...' : 'Create My Dessert Box'}
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="preview-panel">
          <h3 className="preview-title">Your Custom Dessert Box</h3>
          
          {/* Show validation errors in preview */}
          {validationErrors.length > 0 && (
            <div className="error-message" style={{ marginBottom: '20px' }}>
              <strong>⚠️ Invalid Combination:</strong><br/>
              {validationErrors.join(', ')}
            </div>
          )}
          
          {selections.dessertType && options ? (
            <div>
              <div style={{ marginBottom: '20px' }}>
                <h4 className="newspaper-subheading">Selection Summary:</h4>
                <p><strong>Dessert:</strong> {options.dessertTypes.find(dt => dt.id == selections.dessertType)?.name}</p>
                <p><strong>Flavor:</strong> {options.flavors.find(f => f.id == selections.flavor)?.name}</p>
                <p><strong>Quantity:</strong> {selections.quantity} pieces</p>
                <p><strong>Packaging:</strong> {options.packaging.find(p => p.id == selections.packaging)?.name}</p>
                <p><strong>Dietary:</strong> {options.dietary.find(d => d.id == selections.dietary)?.name}</p>
                <p><strong>Theme:</strong> {options.themes.find(t => t.id == selections.theme)?.name}</p>
                {selections.customMessage && (
                  <p><strong>Message:</strong> "{selections.customMessage}"</p>
                )}
              </div>

              {priceBreakdown && (
                <div className="price-display">
                  <div className="price-amount">${currentPrice.toFixed(2)}</div>
                  <div style={{ fontSize: '14px', marginTop: '10px' }}>
                    <div><strong>Base price per piece:</strong> ${priceBreakdown.basePrice.toFixed(2)}</div>
                    {priceBreakdown.flavorModifier > 0 && <div>Flavor upgrade: +${priceBreakdown.flavorModifier.toFixed(2)} per piece</div>}
                    {priceBreakdown.packagingModifier > 0 && <div>Packaging upgrade: +${priceBreakdown.packagingModifier.toFixed(2)} per piece</div>}
                    {priceBreakdown.dietaryModifier > 0 && <div>Dietary option: +${priceBreakdown.dietaryModifier.toFixed(2)} per piece</div>}
                    {priceBreakdown.themeModifier > 0 && <div>Theme decoration: +${priceBreakdown.themeModifier.toFixed(2)} per piece</div>}
                    <div style={{ borderTop: '1px solid #e0e0e0', marginTop: '8px', paddingTop: '8px' }}>
                      <div>Price per piece: ${priceBreakdown.pricePerUnit.toFixed(2)}</div>
                      <div>Quantity: {priceBreakdown.quantity} pieces</div>
                    </div>
                    <div style={{ borderTop: '2px solid #1976d2', marginTop: '10px', paddingTop: '10px', fontWeight: 'bold' }}>
                      <strong>Total: ${priceBreakdown.totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#666', padding: '50px 0' }}>
              <p>Make your selections to see your custom dessert box preview!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreateDessertBox
