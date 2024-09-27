import React from 'react';
import { Truck } from '../types';

interface TruckDetailsProps {
    truck: Truck;
    onSelectTruck: (truck: Truck) => void;
    onDeleteTruck: (truckId: string) => void;
}

const TruckDetails: React.FC<TruckDetailsProps> = ({ truck, onSelectTruck, onDeleteTruck }) => {
    return (
        <div className="truck-details">
            <h2>Truck: {truck.name}</h2>
            <p>
                Current Weight: {truck.currentWeight} kg / {truck.maxWeight} kg
            </p>
            <button onClick={() => onSelectTruck(truck)}>Select Truck</button>
            <button onClick={() => onDeleteTruck(truck.id)}>Delete Truck</button>
            {/* Display list of products in the truck here */}
        </div>
    );
};

export default TruckDetails;