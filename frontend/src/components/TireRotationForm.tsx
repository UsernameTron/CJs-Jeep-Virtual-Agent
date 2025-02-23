import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

interface TireRotationFormProps {
  vin: string
  currentMileage: number
  onSuccess?: () => void
}

const TireRotationForm: React.FC<TireRotationFormProps> = ({
  vin,
  currentMileage,
  onSuccess
}) => {
  const queryClient = useQueryClient()
  
  const mutation = useMutation(
    async () => {
      await axios.post(`/api/vehicles/${vin}/tires/record-rotation`, {
        mileage: currentMileage
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tire-rotation', vin])
        onSuccess?.()
      }
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">
          Record tire rotation at current mileage: {currentMileage.toLocaleString()} miles
        </p>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
        >
          {mutation.isLoading ? 'Recording...' : 'Record Tire Rotation'}
        </button>
      </div>
    </form>
  )
}

export default TireRotationForm 