import React from 'react';
import { Truck } from '../types';
import TruckDetails from './TruckDetails';

interface TruckListProps {
    allTrucks: Truck[];
    selectedTruck: Truck | null;
    onSelectTruck: (truck: Truck) => void;
    onDeleteTruck: (truckId: string) => void;
}

const TruckList: React.FC<TruckListProps> = ({
    allTrucks,
    selectedTruck,
    onSelectTruck,
    onDeleteTruck,
}) => {



    return (
        <div className="truck-list">
            <h2>All trucks: </h2>
            {allTrucks.map(truck => (
                 <TruckDetails
                    truck={truck}
                    selected={truck.id === selectedTruck?.id}
                    onSelectTruck={onSelectTruck}
                    onDeleteTruck={onDeleteTruck}
                 />
            ))} 
            
            
        </div>
    );
};

export default TruckList;