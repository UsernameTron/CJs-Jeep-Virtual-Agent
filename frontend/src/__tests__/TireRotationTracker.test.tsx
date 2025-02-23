import { render, screen } from '@testing-library/react';
import TireRotationTracker from '../components/TireRotationTracker';
import '@testing-library/jest-dom';

describe('TireRotationTracker', () => {
    const mockTireData = {
        last_rotation_date: '2024-01-01',
        last_rotation_miles: 50000,
        recommended_interval: 6000
    };

    it('renders tire rotation information', () => {
        render(<TireRotationTracker tireData={mockTireData} currentMileage={53000} />);
        expect(screen.getByText(/Last Rotation/i)).toBeInTheDocument();
        expect(screen.getByText(/50,000 miles/i)).toBeInTheDocument();
    });

    it('shows due status when rotation is needed', () => {
        render(<TireRotationTracker tireData={mockTireData} currentMileage={56500} />);
        expect(screen.getByText(/Rotation Due/i)).toBeInTheDocument();
        expect(screen.getByText(/500 miles overdue/i)).toBeInTheDocument();
    });

    it('shows upcoming status when within warning threshold', () => {
        render(<TireRotationTracker tireData={mockTireData} currentMileage={55000} />);
        expect(screen.getByText(/Upcoming Rotation/i)).toBeInTheDocument();
        expect(screen.getByText(/1,000 miles until next rotation/i)).toBeInTheDocument();
    });

    it('handles invalid date formats gracefully', () => {
        const invalidData = {
            ...mockTireData,
            last_rotation_date: 'invalid-date'
        };
        render(<TireRotationTracker tireData={invalidData} currentMileage={53000} />);
        expect(screen.getByText(/Date information unavailable/i)).toBeInTheDocument();
    });

    it('displays time-based recommendations', () => {
        const currentDate = new Date('2024-07-01');
        jest.useFakeTimers().setSystemTime(currentDate);
        
        render(<TireRotationTracker tireData={mockTireData} currentMileage={53000} />);
        expect(screen.getByText(/6 months since last rotation/i)).toBeInTheDocument();
        
        jest.useRealTimers();
    });

    it('handles missing tire data gracefully', () => {
        render(<TireRotationTracker tireData={null} currentMileage={53000} />);
        expect(screen.getByText(/No tire rotation data available/i)).toBeInTheDocument();
    });
}); 