import React from 'react';
import { Truck } from '../types';

interface TruckDetailsProps {
    truck: Truck;
}

const TruckDetails: React.FC<TruckDetailsProps> = ({ truck }) => {
    return (
        <div className="truck-details">
            <h2>Truck: {truck.name}</h2>
            <p>
                Current Weight: {truck.currentWeight} kg / {truck.maxWeight} kg
            </p>
            {/* Display list of products in the truck here */}
        </div>
    );
};

export default TruckDetails;