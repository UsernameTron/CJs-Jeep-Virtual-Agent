import React from 'react'

interface TireProps {
  tires: {
    size: string
    front_pressure_psi: number
    rear_pressure_psi: number
    front_pressure_kpa: number
    rear_pressure_kpa: number
    last_rotation_date?: string
    last_rotation_miles?: number
  }
}

const TireSpecs: React.FC<TireProps> = ({ tires }) => {
  if (!tires) return null

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Tire Specifications</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Size</p>
          <p className="font-medium">{tires.size}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Front Pressure</p>
            <p className="font-medium">{tires.front_pressure_psi} PSI</p>
            <p className="text-sm text-gray-500">({tires.front_pressure_kpa} kPa)</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Rear Pressure</p>
            <p className="font-medium">{tires.rear_pressure_psi} PSI</p>
            <p className="text-sm text-gray-500">({tires.rear_pressure_kpa} kPa)</p>
          </div>
        </div>

        {tires.last_rotation_date && (
          <div>
            <p className="text-sm text-gray-600">Last Rotation</p>
            <p className="font-medium">
              {new Date(tires.last_rotation_date).toLocaleDateString()}
            </p>
            {tires.last_rotation_miles && (
              <p className="text-sm text-gray-500">
                at {tires.last_rotation_miles.toLocaleString()} miles
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TireSpecs 