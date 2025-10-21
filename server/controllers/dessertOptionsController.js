import { pool } from '../config/database.js'

// Get all dessert types
export const getDessertTypes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dessert_types ORDER BY name')
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error fetching dessert types:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get all flavors
export const getFlavors = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM flavors ORDER BY name')
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error fetching flavors:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get all packaging options
export const getPackagingOptions = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM packaging_options ORDER BY name')
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error fetching packaging options:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get all dietary options
export const getDietaryOptions = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dietary_options ORDER BY name')
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error fetching dietary options:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get all themes
export const getThemes = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM themes ORDER BY name')
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error fetching themes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get all options for a specific dessert type
export const getOptionsForDessertType = async (req, res) => {
  try {
    const { dessertTypeId } = req.params
    
    // Get all available options
    const [flavors, packaging, dietary, themes] = await Promise.all([
      pool.query('SELECT * FROM flavors ORDER BY name'),
      pool.query('SELECT * FROM packaging_options ORDER BY name'),
      pool.query('SELECT * FROM dietary_options ORDER BY name'),
      pool.query('SELECT * FROM themes ORDER BY name')
    ])
    
    res.status(200).json({
      flavors: flavors.rows,
      packaging: packaging.rows,
      dietary: dietary.rows,
      themes: themes.rows
    })
  } catch (error) {
    console.error('Error fetching options for dessert type:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
