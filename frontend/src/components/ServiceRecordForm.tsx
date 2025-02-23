import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

interface ServiceRecordFormProps {
  vin: string
  onSuccess?: () => void
}

const ServiceRecordForm: React.FC<ServiceRecordFormProps> = ({ vin, onSuccess }) => {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    service_type: '',
    service_date: new Date().toISOString().split('T')[0],
    mileage: 0,
    description: '',
    performed_by: ''
  })

  const mutation = useMutation(
    async (data) => {
      await axios.post(`/api/vehicles/${vin}/service`, data)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['service-history', vin])
        queryClient.invalidateQueries(['due-services', vin])
        onSuccess?.()
        setFormData({
          service_type: '',
          service_date: new Date().toISOString().split('T')[0],
          mileage: 0,
          description: '',
          performed_by: ''
        })
      }
    }
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Service Type
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={formData.service_type}
          onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Service Date
        </label>
        <input
          type="date"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={formData.service_date}
          onChange={(e) => setFormData({ ...formData, service_date: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mileage
        </label>
        <input
          type="number"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={formData.mileage}
          onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Performed By
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          value={formData.performed_by}
          onChange={(e) => setFormData({ ...formData, performed_by: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={mutation.isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
      >
        {mutation.isLoading ? 'Saving...' : 'Record Service'}
      </button>
    </form>
  )
}

export default ServiceRecordForm 