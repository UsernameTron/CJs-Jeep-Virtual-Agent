import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { format, parseISO } from 'date-fns'

interface ServiceRecord {
  service_type: string
  service_date: string
  mileage: number
  description?: string
  performed_by?: string
}

interface MaintenanceTrackerProps {
  vin: string
  currentMileage: number
}

const MaintenanceTracker: React.FC<MaintenanceTrackerProps> = ({ vin, currentMileage }) => {
  const { data: serviceHistory } = useQuery(['service-history', vin], async () => {
    const { data } = await axios.get(`/api/vehicles/${vin}/service`)
    return data as ServiceRecord[]
  })

  const { data: dueServices } = useQuery(['due-services', vin, currentMileage], async () => {
    const { data } = await axios.get(`/api/vehicles/${vin}/maintenance/due?mileage=${currentMileage}`)
    return data
  })

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Maintenance Due</h2>
        {dueServices && dueServices.length > 0 ? (
          <ul className="space-y-3">
            {dueServices.map((service, index) => (
              <li key={index} className="flex items-center justify-between">
                <span className="font-medium text-red-600">{service.service_type}</span>
                <span>Due at {service.interval_miles.toLocaleString()} miles</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-600">No maintenance currently due</p>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Service History</h2>
        {serviceHistory && serviceHistory.length > 0 ? (
          <div className="space-y-4">
            {serviceHistory.map((record, index) => (
              <div key={index} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{record.service_type}</h3>
                    <p className="text-sm text-gray-600">
                      {format(parseISO(record.service_date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <span className="text-sm">
                    {record.mileage.toLocaleString()} miles
                  </span>
                </div>
                {record.description && (
                  <p className="text-sm text-gray-600 mt-2">{record.description}</p>
                )}
                {record.performed_by && (
                  <p className="text-sm text-gray-500 mt-1">
                    Performed by: {record.performed_by}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No service history available</p>
        )}
      </div>
    </div>
  )
}

export default MaintenanceTracker 