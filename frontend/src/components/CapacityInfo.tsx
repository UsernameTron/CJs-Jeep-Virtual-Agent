import React from 'react'

interface CapacityProps {
  capacity: {
    front_occupants: number
    rear_occupants: number
    payload_lbs: number
    payload_kg: number
    gvwr_lbs: number
    gvwr_kg: number
    curb_weight_lbs: number
    curb_weight_kg: number
    towing_capacity_lbs: number
    towing_capacity_kg: number
  }
}

const CapacityInfo: React.FC<CapacityProps> = ({ capacity }) => {
  return (
    <div className="border p-4 rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Vehicle Capacity</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">Occupants</h3>
          <p>Front: {capacity.front_occupants}</p>
          <p>Rear: {capacity.rear_occupants}</p>
        </div>
        <div>
          <h3 className="font-medium">Payload</h3>
          <p>{capacity.payload_lbs} lbs</p>
          <p>{capacity.payload_kg} kg</p>
        </div>
        <div>
          <h3 className="font-medium">GVWR</h3>
          <p>{capacity.gvwr_lbs} lbs</p>
          <p>{capacity.gvwr_kg} kg</p>
        </div>
        <div>
          <h3 className="font-medium">Towing Capacity</h3>
          <p>{capacity.towing_capacity_lbs} lbs</p>
          <p>{capacity.towing_capacity_kg} kg</p>
        </div>
      </div>
    </div>
  )
}

export default CapacityInfo 