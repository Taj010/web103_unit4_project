import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewDessertBoxes from './pages/ViewDessertBoxes'
import EditDessertBox from './pages/EditDessertBox'
import CreateDessertBox from './pages/CreateDessertBox'
import DessertBoxDetails from './pages/DessertBoxDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateDessertBox title='Sweet Creations | Create Box' />
    },
    {
      path:'/dessert-boxes',
      element: <ViewDessertBoxes title='Sweet Creations | View Boxes' />
    },
    {
      path: '/dessert-boxes/:id',
      element: <DessertBoxDetails title='Sweet Creations | Box Details' />
    },
    {
      path: '/edit/:id',
      element: <EditDessertBox title='Sweet Creations | Edit Box' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App