const API_BASE_URL = 'http://localhost:3000/api'

// Dessert Options API calls
export const getDessertTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/options/dessert-types`)
    if (!response.ok) {
      throw new Error('Failed to fetch dessert types')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching dessert types:', error)
    throw error
  }
}

export const getFlavors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/options/flavors`)
    if (!response.ok) {
      throw new Error('Failed to fetch flavors')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching flavors:', error)
    throw error
  }
}

export const getPackagingOptions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/options/packaging`)
    if (!response.ok) {
      throw new Error('Failed to fetch packaging options')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching packaging options:', error)
    throw error
  }
}

export const getDietaryOptions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/options/dietary`)
    if (!response.ok) {
      throw new Error('Failed to fetch dietary options')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching dietary options:', error)
    throw error
  }
}

export const getThemes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/options/themes`)
    if (!response.ok) {
      throw new Error('Failed to fetch themes')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching themes:', error)
    throw error
  }
}

export const getAllOptions = async () => {
  try {
    const [dessertTypes, flavors, packaging, dietary, themes] = await Promise.all([
      getDessertTypes(),
      getFlavors(),
      getPackagingOptions(),
      getDietaryOptions(),
      getThemes()
    ])
    
    return {
      dessertTypes,
      flavors,
      packaging,
      dietary,
      themes
    }
  } catch (error) {
    console.error('Error fetching all options:', error)
    throw error
  }
}
