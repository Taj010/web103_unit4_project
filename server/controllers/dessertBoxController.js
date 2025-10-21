import { pool } from '../config/database.js'

// Get all dessert boxes
export const getAllDessertBoxes = async (req, res) => {
  try {
    console.log('Fetching dessert boxes...')
    const result = await pool.query(`
      SELECT 
        db.*,
        dt.name as dessert_type_name,
        dt.base_price,
        f.name as flavor_name,
        f.price_modifier as flavor_modifier,
        po.name as packaging_name,
        po.price_modifier as packaging_modifier,
        diet.name as dietary_name,
        diet.price_modifier as dietary_modifier,
        t.name as theme_name,
        t.price_modifier as theme_modifier
      FROM dessert_boxes db
      LEFT JOIN dessert_types dt ON db.dessert_type_id = dt.id
      LEFT JOIN flavors f ON db.flavor_id = f.id
      LEFT JOIN packaging_options po ON db.packaging_id = po.id
      LEFT JOIN dietary_options diet ON db.dietary_id = diet.id
      LEFT JOIN themes t ON db.theme_id = t.id
      ORDER BY db.created_at DESC
    `)
    console.log(`Found ${result.rows.length} dessert boxes`)
    res.status(200).json(result.rows)
  } catch (error) {
    console.error('Error fetching dessert boxes:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get a single dessert box by ID
export const getDessertBoxById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(`
      SELECT 
        db.*,
        dt.name as dessert_type_name,
        dt.base_price,
        f.name as flavor_name,
        f.price_modifier as flavor_modifier,
        po.name as packaging_name,
        po.price_modifier as packaging_modifier,
        diet.name as dietary_name,
        diet.price_modifier as dietary_modifier,
        t.name as theme_name,
        t.price_modifier as theme_modifier
      FROM dessert_boxes db
      LEFT JOIN dessert_types dt ON db.dessert_type_id = dt.id
      LEFT JOIN flavors f ON db.flavor_id = f.id
      LEFT JOIN packaging_options po ON db.packaging_id = po.id
      LEFT JOIN dietary_options diet ON db.dietary_id = diet.id
      LEFT JOIN themes t ON db.theme_id = t.id
      WHERE db.id = $1
    `, [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dessert box not found' })
    }
    
    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error('Error fetching dessert box:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Create a new dessert box
export const createDessertBox = async (req, res) => {
  try {
    console.log('Creating dessert box with data:', req.body)
    const { 
      dessert_type_id, 
      flavor_id, 
      packaging_id, 
      dietary_id, 
      theme_id, 
      quantity, 
      custom_message,
      total_price 
    } = req.body
    
    console.log('Parsed fields:', { dessert_type_id, flavor_id, packaging_id, dietary_id, theme_id, quantity, custom_message, total_price })
    
    // Validate required fields
    if (!dessert_type_id || !flavor_id || !packaging_id || !dietary_id || !theme_id || !quantity || !total_price) {
      console.log('Validation failed - missing required fields')
      return res.status(400).json({ 
        error: 'Missing required fields: dessert_type_id, flavor_id, packaging_id, dietary_id, theme_id, quantity, and total_price are required' 
      })
    }
    
    const result = await pool.query(`
      INSERT INTO dessert_boxes (
        dessert_type_id, flavor_id, packaging_id, dietary_id, theme_id, 
        quantity, custom_message, total_price
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `, [dessert_type_id, flavor_id, packaging_id, dietary_id, theme_id, quantity, custom_message, total_price])
    
    console.log('Successfully created dessert box:', result.rows[0])
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Error creating dessert box:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Update a dessert box
export const updateDessertBox = async (req, res) => {
  try {
    const { id } = req.params
    const { 
      dessert_type_id, 
      flavor_id, 
      packaging_id, 
      dietary_id, 
      theme_id, 
      quantity, 
      custom_message,
      total_price 
    } = req.body
    
    // Check if dessert box exists
    const existingBox = await pool.query('SELECT * FROM dessert_boxes WHERE id = $1', [id])
    if (existingBox.rows.length === 0) {
      return res.status(404).json({ error: 'Dessert box not found' })
    }
    
    const result = await pool.query(`
      UPDATE dessert_boxes SET 
        dessert_type_id = $1, 
        flavor_id = $2, 
        packaging_id = $3, 
        dietary_id = $4, 
        theme_id = $5, 
        quantity = $6, 
        custom_message = $7,
        total_price = $8,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9 RETURNING *
    `, [dessert_type_id, flavor_id, packaging_id, dietary_id, theme_id, quantity, custom_message, total_price, id])
    
    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error('Error updating dessert box:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Delete a dessert box
export const deleteDessertBox = async (req, res) => {
  try {
    const { id } = req.params
    
    // Check if dessert box exists
    const existingBox = await pool.query('SELECT * FROM dessert_boxes WHERE id = $1', [id])
    if (existingBox.rows.length === 0) {
      return res.status(404).json({ error: 'Dessert box not found' })
    }
    
    await pool.query('DELETE FROM dessert_boxes WHERE id = $1', [id])
    
    res.status(200).json({ message: 'Dessert box deleted successfully' })
  } catch (error) {
    console.error('Error deleting dessert box:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
