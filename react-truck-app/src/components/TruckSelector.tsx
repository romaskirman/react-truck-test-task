import React from 'react';
import { Truck } from '../types';

interface TruckSelectorProps {
    selectedTruck: Truck | null;
    allTrucks: Truck[];
    onSelectTruck: (truck: Truck) => void;
    onCreateTruck: () => void;
    onDeleteTruck: (truckId: string) => void;
}

const TruckSelector: React.FC<TruckSelectorProps> = ({
    selectedTruck,
    allTrucks,
    onSelectTruck,
    onCreateTruck,
    onDeleteTruck,
}) => {
    return (
        <div className="truck-selector">
            <h2>Select Truck</h2>
            <select value={selectedTruck?.id || ''} onChange={(e) => onSelectTruck(JSON.parse(e.target.value))}>
                <option value="">Select Truck</option>
                {allTrucks.map(truck => (
                    <option value={JSON.stringify(truck)}>
                        {truck.name}
                    </option>
                ))}              
            </select>
            <button onClick={onCreateTruck}>Create Truck</button>
            {selectedTruck && (
                <button onClick={() => onDeleteTruck(selectedTruck.id)}>
                    Delete Truck
                </button>
            )}
        </div>
    );
};

export default TruckSelector;