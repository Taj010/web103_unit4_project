import express from 'express'
import { 
  getDessertTypes, 
  getFlavors, 
  getPackagingOptions, 
  getDietaryOptions, 
  getThemes,
  getOptionsForDessertType 
} from '../controllers/dessertOptionsController.js'

const router = express.Router()

// GET /api/dessert-types - Get all dessert types
router.get('/dessert-types', getDessertTypes)

// GET /api/flavors - Get all flavors
router.get('/flavors', getFlavors)

// GET /api/packaging - Get all packaging options
router.get('/packaging', getPackagingOptions)

// GET /api/dietary - Get all dietary options
router.get('/dietary', getDietaryOptions)

// GET /api/themes - Get all themes
router.get('/themes', getThemes)

// GET /api/options/:dessertTypeId - Get all options for a specific dessert type
router.get('/options/:dessertTypeId', getOptionsForDessertType)

export default router
