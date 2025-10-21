const API_BASE_URL = 'http://localhost:3000/api'

// Dessert Box API calls
export const getAllDessertBoxes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dessert-boxes`)
    if (!response.ok) {
      throw new Error('Failed to fetch dessert boxes')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching dessert boxes:', error)
    throw error
  }
}

export const getDessertBoxById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dessert-boxes/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch dessert box')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching dessert box:', error)
    throw error
  }
}

export const createDessertBox = async (dessertBoxData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dessert-boxes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dessertBoxData),
    })
    if (!response.ok) {
      throw new Error('Failed to create dessert box')
    }
    return await response.json()
  } catch (error) {
    console.error('Error creating dessert box:', error)
    throw error
  }
}

export const updateDessertBox = async (id, dessertBoxData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dessert-boxes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dessertBoxData),
    })
    if (!response.ok) {
      throw new Error('Failed to update dessert box')
    }
    return await response.json()
  } catch (error) {
    console.error('Error updating dessert box:', error)
    throw error
  }
}

export const deleteDessertBox = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dessert-boxes/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete dessert box')
    }
    return await response.json()
  } catch (error) {
    console.error('Error deleting dessert box:', error)
    throw error
  }
}
