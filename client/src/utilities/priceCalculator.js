// Price calculation utilities for dessert boxes

export const calculateDessertBoxPrice = (selections, options) => {
  if (!selections || !options) return 0

  const { dessertType, flavor, packaging, dietary, theme, quantity } = selections
  
  // Get base price from dessert type (convert string to number)
  const selectedDessertType = options.dessertTypes?.find(dt => dt.id == dessertType)
  const basePrice = parseFloat(selectedDessertType?.base_price) || 0
  
  // Get price modifiers (convert strings to numbers)
  const flavorModifier = parseFloat(options.flavors?.find(f => f.id == flavor)?.price_modifier) || 0
  const packagingModifier = parseFloat(options.packaging?.find(p => p.id == packaging)?.price_modifier) || 0
  const dietaryModifier = parseFloat(options.dietary?.find(d => d.id == dietary)?.price_modifier) || 0
  const themeModifier = parseFloat(options.themes?.find(t => t.id == theme)?.price_modifier) || 0
  
  // Debug logging
  console.log('Price calculation debug:', {
    selectedDessertType: selectedDessertType?.name,
    basePrice,
    flavorModifier,
    packagingModifier,
    dietaryModifier,
    themeModifier,
    quantity
  })
  
  // Calculate total price per unit
  const pricePerUnit = basePrice + flavorModifier + packagingModifier + dietaryModifier + themeModifier
  
  // Apply quantity multiplier
  const totalPrice = pricePerUnit * (quantity || 1)
  
  return Math.round(totalPrice * 100) / 100 // Round to 2 decimal places
}

export const validateDessertCombination = (selections, options) => {
  const errors = []
  
  console.log('Validating selections:', selections)
  console.log('Available options:', options)
  
  if (!selections) {
    errors.push('Please make all selections')
    return errors
  }

  const { dessertType, flavor, packaging, dietary, theme, quantity } = selections
  
  // Check if all required selections are made
  if (!dessertType) errors.push('Please select a dessert type')
  if (!flavor) errors.push('Please select a flavor')
  if (!packaging) errors.push('Please select packaging')
  if (!dietary) errors.push('Please select dietary option')
  if (!theme) errors.push('Please select a theme')
  if (!quantity || quantity < 1) errors.push('Please select a valid quantity')
  
  // Check for impossible combinations
  if (dessertType && dietary && options) {
    const selectedDessertType = options.dessertTypes?.find(dt => dt.id == dessertType)
    const selectedDietary = options.dietary?.find(d => d.id == dietary)
    
    console.log('Checking impossible combinations:')
    console.log('Selected dessert type:', selectedDessertType?.name)
    console.log('Selected dietary:', selectedDietary?.name)
    
    // Check for impossible combinations
    if (selectedDessertType?.name === 'Macarons' && selectedDietary?.name === 'Keto') {
      console.log('Found impossible combination: Macarons + Keto')
      errors.push('Macarons cannot be made keto-friendly due to their sugar content')
    }
    
    if (selectedDessertType?.name === 'Brownies' && selectedDietary?.name === 'Sugar-Free') {
      console.log('Found impossible combination: Brownies + Sugar-Free')
      errors.push('Brownies cannot be made sugar-free due to their chocolate content')
    }
    
    if (selectedDessertType?.name === 'Macarons' && selectedDietary?.name === 'Sugar-Free') {
      console.log('Found impossible combination: Macarons + Sugar-Free')
      errors.push('Macarons cannot be made sugar-free due to their delicate sugar structure')
    }
    
    if (selectedDessertType?.name === 'Cupcakes' && selectedDietary?.name === 'Keto') {
      console.log('Found impossible combination: Cupcakes + Keto')
      errors.push('Cupcakes cannot be made keto-friendly due to their flour content')
    }
  }
  
  console.log('Validation errors:', errors)
  
  return errors
}

export const getPriceBreakdown = (selections, options) => {
  if (!selections || !options) return null

  const { dessertType, flavor, packaging, dietary, theme, quantity } = selections
  
  const basePrice = parseFloat(options.dessertTypes?.find(dt => dt.id == dessertType)?.base_price) || 0
  const flavorModifier = parseFloat(options.flavors?.find(f => f.id == flavor)?.price_modifier) || 0
  const packagingModifier = parseFloat(options.packaging?.find(p => p.id == packaging)?.price_modifier) || 0
  const dietaryModifier = parseFloat(options.dietary?.find(d => d.id == dietary)?.price_modifier) || 0
  const themeModifier = parseFloat(options.themes?.find(t => t.id == theme)?.price_modifier) || 0
  
  const pricePerUnit = basePrice + flavorModifier + packagingModifier + dietaryModifier + themeModifier
  const totalPrice = pricePerUnit * (quantity || 1)
  
  return {
    basePrice,
    flavorModifier,
    packagingModifier,
    dietaryModifier,
    themeModifier,
    pricePerUnit: Math.round(pricePerUnit * 100) / 100,
    quantity: quantity || 1,
    totalPrice: Math.round(totalPrice * 100) / 100
  }
}
