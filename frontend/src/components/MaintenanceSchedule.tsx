import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

interface MaintenanceItem {
  service_type: string
  interval_miles: number
  interval_months: number | null
  specification: string
}

interface MaintenanceProps {
  vin: string
  maintenance: MaintenanceItem[]
}

const MaintenanceSchedule: React.FC<MaintenanceProps> = ({ vin, maintenance }) => {
  const { data: serviceHistory } = useQuery(['maintenance', vin], async () => {
    const { data } = await axios.get(`/api/vehicles/${vin}/maintenance`)
    return data
  })

  return (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Maintenance Schedule</h2>
      <div className="space-y-4">
        {maintenance.map((item, index) => (
          <div key={index} className="border-b pb-2">
            <h3 className="font-medium">{item.service_type}</h3>
            <p>Interval: {item.interval_miles} miles</p>
            {item.interval_months && (
              <p>or {item.interval_months} months</p>
            )}
            <p className="text-sm text-gray-600">{item.specification}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MaintenanceSchedule 