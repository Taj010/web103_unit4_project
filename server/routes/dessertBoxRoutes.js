import express from 'express'
import { 
  getAllDessertBoxes, 
  getDessertBoxById, 
  createDessertBox, 
  updateDessertBox, 
  deleteDessertBox 
} from '../controllers/dessertBoxController.js'

const router = express.Router()

// GET /api/dessert-boxes - Get all dessert boxes
router.get('/', getAllDessertBoxes)

// GET /api/dessert-boxes/:id - Get a specific dessert box by ID
router.get('/:id', getDessertBoxById)

// POST /api/dessert-boxes - Create a new dessert box
router.post('/', createDessertBox)

// PUT /api/dessert-boxes/:id - Update a dessert box
router.put('/:id', updateDessertBox)

// DELETE /api/dessert-boxes/:id - Delete a dessert box
router.delete('/:id', deleteDessertBox)

export default router
