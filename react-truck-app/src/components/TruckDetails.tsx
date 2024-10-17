import React from 'react';
import { Truck } from '../types';

interface TruckDetailsProps {
    truck: Truck;
    selected: boolean;
    onSelectTruck: (truck: Truck) => void;
    onDeleteTruck: (truckId: string) => void;
    displaysOnHeader: boolean;
}

const TruckDetails: React.FC<TruckDetailsProps> = ({ truck, selected, onSelectTruck, onDeleteTruck, displaysOnHeader }) => {

    const truckPercentage = ((truck.currentWeight / truck.maxWeight) * 100).toFixed(0) + '%';
    const truckFillColor = selected ? 'blue' : 'lightgreen';
    const linearGradient = 'linear-gradient(to left, ' + truckFillColor + ' ' + truckPercentage + ', rgba(0,0,0,0) ' + truckPercentage + ')';


    return (
        <div className="truck-details">
            <div className="truck-main-block">
                <h2>{truck.name} {selected && !displaysOnHeader && (
                    <span> - Selected </span>
                )}</h2>
                <div className="truck-info">
                    <div className="calc-truck-percentage" style={{ backgroundImage: linearGradient }} >{truckPercentage}</div>
                    <p className="weight-info">
                        Current Weight: {truck.currentWeight} / {truck.maxWeight} kg
                    </p>
                </div>
            </div>
            {!selected && (
                <button className="btn" onClick={() => onSelectTruck(truck)}>Select Truck</button>
            )}
            {!displaysOnHeader && (
                <button className="btn"  onClick={() => onDeleteTruck(truck.id)}>Delete Truck</button>
            )}
        </div>
    );
};

export default TruckDetails;