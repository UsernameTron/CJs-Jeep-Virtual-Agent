import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import TireRotationTracker from './TireRotationTracker'
import TireRotationForm from './TireRotationForm'
import PayloadCalculator from './PayloadCalculator'

interface Vehicle {
  vin: string
  model_year: number
  model: string
  trim?: string
  body_style?: string
  engine?: {
    type: string
    displacement_cc: number
    horsepower: number
  }
  tires?: {
    front_left: string
    front_right: string
    rear_left: string
    rear_right: string
  }
  capacity?: {
    max_payload_lbs: number
    max_payload_kg: number
  }
  maintenance?: {
    oil_changes: number
    tire_rotations: number
  }
}

const fetchVehicleData = async (vin: string): Promise<Vehicle> => {
  const { data } = await axios.get(`/api/vehicles/${vin}`)
  return data
}

const VehicleSpecifications: React.FC<{vin: string}> = ({ vin }) => {
  const [currentMileage, setCurrentMileage] = useState(0)
  const { data, isLoading, error } = useQuery(
    ['vehicle', vin],
    () => fetchVehicleData(vin!)
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading vehicle data</div>
  if (!data) return <div>No vehicle found</div>

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Current Mileage
        </label>
        <input
          type="number"
          value={currentMileage}
          onChange={(e) => setCurrentMileage(parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EngineSpecs engine={data.engine} />
        <TireSpecs tires={data.tires} />
        <CapacityInfo capacity={data.capacity} />
        <MaintenanceSchedule maintenance={data.maintenance} />
        
        <TireRotationTracker 
          vin={vin} 
          currentMileage={currentMileage} 
        />
        <PayloadCalculator vin={vin} />
      </div>

      <div className="mt-8 space-y-6">
        <TireRotationForm
          vin={vin}
          currentMileage={currentMileage}
        />
        <ServiceRecordForm vin={vin} />
      </div>
    </div>
  )
}

export default VehicleSpecifications 