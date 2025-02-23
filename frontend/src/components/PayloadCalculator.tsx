import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

interface PayloadCalculatorProps {
  vin: string
}

const PayloadCalculator: React.FC<PayloadCalculatorProps> = ({ vin }) => {
  const [occupants, setOccupants] = useState(1)
  
  const { data, isLoading, error } = useQuery(
    ['payload', vin, occupants],
    async () => {
      const { data } = await axios.get(
        `/api/vehicles/${vin}/calculations/payload?occupants=${occupants}`
      )
      return data
    }
  )

  if (isLoading) return <div>Calculating...</div>
  if (error) return <div>Error calculating payload</div>

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Payload Calculator</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Occupants
          </label>
          <input
            type="number"
            min="1"
            max="5"
            value={occupants}
            onChange={(e) => setOccupants(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        {data && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Available Payload:</p>
              <p className="font-medium">{data.available_payload_lbs.toLocaleString()} lbs</p>
              <p className="text-sm text-gray-500">
                ({data.available_payload_kg.toLocaleString()} kg)
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Passenger Weight:</p>
              <p className="font-medium">
                {data.total_passenger_weight_lbs.toLocaleString()} lbs
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PayloadCalculator 