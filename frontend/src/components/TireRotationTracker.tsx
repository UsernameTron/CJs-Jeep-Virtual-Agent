import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { format, parseISO } from 'date-fns'

interface TireRotationProps {
  vin: string
  currentMileage: number
}

const TireRotationTracker: React.FC<TireRotationProps> = ({ vin, currentMileage }) => {
  const { data: rotationStatus } = useQuery(
    ['tire-rotation', vin, currentMileage],
    async () => {
      const { data } = await axios.get(
        `/api/vehicles/${vin}/tires/rotation-status?mileage=${currentMileage}`
      )
      return data
    }
  )

  if (!rotationStatus) return null

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Tire Rotation Status</h2>
      
      <div className="space-y-4">
        <div className={`p-4 rounded-lg ${
          rotationStatus.rotation_due 
            ? 'bg-red-50 text-red-700' 
            : 'bg-green-50 text-green-700'
        }`}>
          <p className="font-medium">
            {rotationStatus.rotation_due 
              ? 'Tire rotation is due!' 
              : 'Tire rotation is not due yet'}
          </p>
          {rotationStatus.reason && (
            <ul className="mt-2 text-sm">
              {rotationStatus.reason.map((reason: string, index: number) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Next rotation due at:</p>
            <p className="font-medium">
              {rotationStatus.next_rotation_miles.toLocaleString()} miles
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Or by date:</p>
            <p className="font-medium">
              {format(parseISO(rotationStatus.next_rotation_date), 'MMM d, yyyy')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TireRotationTracker 