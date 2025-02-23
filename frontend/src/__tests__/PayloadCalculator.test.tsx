import { render, screen, fireEvent } from '@testing-library/react';
import PayloadCalculator from '../components/PayloadCalculator';
import '@testing-library/jest-dom';

describe('PayloadCalculator', () => {
    const mockVehicle = {
        vin: '1234567890',
        capacity: {
            payload: 1500,
            passengers: 5
        }
    };

    it('renders the calculator form', () => {
        render(<PayloadCalculator vehicle={mockVehicle} />);
        expect(screen.getByText(/Payload Calculator/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Number of Occupants/i)).toBeInTheDocument();
    });

    it('calculates available payload correctly', async () => {
        render(<PayloadCalculator vehicle={mockVehicle} />);
        
        const occupantsInput = screen.getByLabelText(/Number of Occupants/i);
        fireEvent.change(occupantsInput, { target: { value: '3' } });
        
        const calculateButton = screen.getByText(/Calculate/i);
        fireEvent.click(calculateButton);

        // Assuming average weight per person is 150 lbs
        const expectedPayload = 1500 - (3 * 150);
        expect(await screen.findByText(new RegExp(expectedPayload.toString()))).toBeInTheDocument();
    });

    it('shows error for invalid occupants', () => {
        render(<PayloadCalculator vehicle={mockVehicle} />);
        
        const occupantsInput = screen.getByLabelText(/Number of Occupants/i);
        fireEvent.change(occupantsInput, { target: { value: '6' } });
        
        const calculateButton = screen.getByText(/Calculate/i);
        fireEvent.click(calculateButton);

        expect(screen.getByText(/Exceeds maximum passenger capacity/i)).toBeInTheDocument();
    });

    it('validates input as numbers only', () => {
        render(<PayloadCalculator vehicle={mockVehicle} />);
        
        const occupantsInput = screen.getByLabelText(/Number of Occupants/i);
        fireEvent.change(occupantsInput, { target: { value: 'abc' } });
        
        expect(screen.getByText(/Please enter a valid number/i)).toBeInTheDocument();
    });
}); 