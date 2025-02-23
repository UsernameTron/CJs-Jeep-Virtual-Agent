import React from 'react'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import VehicleSpecifications from '../components/VehicleSpecifications'

const queryClient = new QueryClient()

test('renders vehicle specifications', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <VehicleSpecifications vin="1J4FA24198L641772" />
    </QueryClientProvider>
  )
  
  expect(screen.getByText(/Loading/i)).toBeInTheDocument()
}) 