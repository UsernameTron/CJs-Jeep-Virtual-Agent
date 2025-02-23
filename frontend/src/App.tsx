import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VehicleSpecifications from './components/VehicleSpecifications'

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <h1 className="text-xl font-semibold">Jeep Specifications</h1>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/vehicles/:vin" element={<VehicleSpecifications />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App 