import { pool } from './config/database.js'

const initDessertDatabase = async () => {
  try {
    console.log('Initializing dessert box database...')

    // Create dessert types table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS dessert_types (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        base_price DECIMAL(10,2) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create flavors table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS flavors (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price_modifier DECIMAL(10,2) DEFAULT 0.00,
        is_premium BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create packaging options table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS packaging_options (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price_modifier DECIMAL(10,2) DEFAULT 0.00,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create dietary options table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS dietary_options (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price_modifier DECIMAL(10,2) DEFAULT 0.00,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create themes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS themes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        price_modifier DECIMAL(10,2) DEFAULT 0.00,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Create dessert boxes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS dessert_boxes (
        id SERIAL PRIMARY KEY,
        dessert_type_id INTEGER REFERENCES dessert_types(id),
        flavor_id INTEGER REFERENCES flavors(id),
        packaging_id INTEGER REFERENCES packaging_options(id),
        dietary_id INTEGER REFERENCES dietary_options(id),
        theme_id INTEGER REFERENCES themes(id),
        quantity INTEGER NOT NULL DEFAULT 12,
        custom_message TEXT,
        total_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Insert initial dessert types
    await pool.query(`
      INSERT INTO dessert_types (name, base_price, description) VALUES
      ('Cookies', 15.00, 'Classic homemade cookies'),
      ('Cupcakes', 25.00, 'Moist and fluffy cupcakes'),
      ('Macarons', 35.00, 'Delicate French macarons'),
      ('Brownies', 20.00, 'Rich chocolate brownies')
      ON CONFLICT DO NOTHING
    `)

    // Insert initial flavors
    await pool.query(`
      INSERT INTO flavors (name, price_modifier, is_premium) VALUES
      ('Chocolate', 0.00, FALSE),
      ('Vanilla', 0.00, FALSE),
      ('Strawberry', 2.00, TRUE),
      ('Matcha', 3.00, TRUE),
      ('Red Velvet', 2.50, TRUE),
      ('Lemon', 1.50, FALSE),
      ('Caramel', 2.00, TRUE)
      ON CONFLICT DO NOTHING
    `)

    // Insert packaging options
    await pool.query(`
      INSERT INTO packaging_options (name, price_modifier, description) VALUES
      ('Basic Box', 0.00, 'Simple cardboard box'),
      ('Ribbon Wrap', 3.00, 'Elegant ribbon wrapping'),
      ('Custom Message Card', 5.00, 'Personalized message card included'),
      ('Gift Bag', 2.50, 'Decorative gift bag'),
      ('Premium Box', 8.00, 'Luxury gift box with bow')
      ON CONFLICT DO NOTHING
    `)

    // Insert dietary options
    await pool.query(`
      INSERT INTO dietary_options (name, price_modifier, description) VALUES
      ('Regular', 0.00, 'Standard ingredients'),
      ('Vegan', 4.00, 'Plant-based alternatives'),
      ('Gluten-Free', 3.00, 'No gluten ingredients'),
      ('Keto', 5.00, 'Low-carb, high-fat options'),
      ('Sugar-Free', 2.50, 'Sugar alternatives used')
      ON CONFLICT DO NOTHING
    `)

    // Insert themes
    await pool.query(`
      INSERT INTO themes (name, price_modifier, description) VALUES
      ('Classic', 0.00, 'Simple, elegant design'),
      ('Birthday', 3.00, 'Colorful birthday celebration'),
      ('Holiday', 4.00, 'Seasonal holiday decorations'),
      ('Romantic', 5.00, 'Romantic hearts and roses'),
      ('Minimalist', 1.00, 'Clean, modern aesthetic')
      ON CONFLICT DO NOTHING
    `)

    console.log('Dessert box database initialized successfully!')
  } catch (error) {
    console.error('Error initializing dessert database:', error)
    throw error
  }
}

// Run the initialization
initDessertDatabase()
  .then(() => {
    console.log('Database setup complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Database setup failed:', error)
    process.exit(1)
  })
