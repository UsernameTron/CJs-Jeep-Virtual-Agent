import React from 'react'

interface EngineProps {
  engine: {
    type: string
    displacement_cc: number
    displacement_ci: number
    horsepower: number
    horsepower_rpm: number
    torque_lb_ft: number
    torque_rpm: number
    fuel_type: string
    fuel_capacity_gal: number
    fuel_capacity_l: number
  }
}

const EngineSpecs: React.FC<EngineProps> = ({ engine }) => {
  if (!engine) return null

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Engine Specifications</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Engine Type</p>
          <p className="font-medium">{engine.type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Displacement</p>
          <p className="font-medium">{engine.displacement_cc} cc</p>
          <p className="text-sm text-gray-500">({engine.displacement_ci} ci)</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Horsepower</p>
          <p className="font-medium">{engine.horsepower} hp</p>
          <p className="text-sm text-gray-500">@ {engine.horsepower_rpm} RPM</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Torque</p>
          <p className="font-medium">{engine.torque_lb_ft} lb-ft</p>
          <p className="text-sm text-gray-500">@ {engine.torque_rpm} RPM</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Fuel Type</p>
          <p className="font-medium">{engine.fuel_type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Fuel Capacity</p>
          <p className="font-medium">{engine.fuel_capacity_gal} gal</p>
          <p className="text-sm text-gray-500">({engine.fuel_capacity_l} L)</p>
        </div>
      </div>
    </div>
  )
}

export default EngineSpecs 