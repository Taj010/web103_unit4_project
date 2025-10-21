import express from 'express'
import { pool } from '../config/database.js'

const router = express.Router()

// Get all data from all tables in JSON format
router.get('/all-data', async (req, res) => {
  try {
    console.log('Fetching all table data...')
    
    // Get all data from each table
    const [dessertTypes, flavors, packaging, dietary, themes, dessertBoxes] = await Promise.all([
      pool.query('SELECT * FROM dessert_types ORDER BY id'),
      pool.query('SELECT * FROM flavors ORDER BY id'),
      pool.query('SELECT * FROM packaging_options ORDER BY id'),
      pool.query('SELECT * FROM dietary_options ORDER BY id'),
      pool.query('SELECT * FROM themes ORDER BY id'),
      pool.query('SELECT * FROM dessert_boxes ORDER BY id')
    ])
    
    const allData = {
      dessertTypes: dessertTypes.rows,
      flavors: flavors.rows,
      packaging: packaging.rows,
      dietary: dietary.rows,
      themes: themes.rows,
      dessertBoxes: dessertBoxes.rows,
      summary: {
        totalDessertTypes: dessertTypes.rows.length,
        totalFlavors: flavors.rows.length,
        totalPackaging: packaging.rows.length,
        totalDietary: dietary.rows.length,
        totalThemes: themes.rows.length,
        totalDessertBoxes: dessertBoxes.rows.length
      }
    }
    
    res.json(allData)
  } catch (error) {
    console.error('Error fetching all data:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get individual table data
router.get('/dessert-types', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dessert_types ORDER BY id')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching dessert types:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/flavors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM flavors ORDER BY id')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching flavors:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/packaging', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM packaging_options ORDER BY id')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching packaging:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/dietary', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dietary_options ORDER BY id')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching dietary options:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/themes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM themes ORDER BY id')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching themes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/dessert-boxes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dessert_boxes ORDER BY id')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching dessert boxes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
