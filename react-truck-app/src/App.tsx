import React, { useState, useEffect } from 'react';
import { Truck, Product } from './types';
import ProductCard from './components/ProductCard';
import TruckList from './components/TruckList';
//import './App.scss';

const trucksData = [
    { id: 'truck1', name: 'Truck 1', maxWeight: 10000, currentWeight: 0 },
    { id: 'truck2', name: 'Truck 2', maxWeight: 12000, currentWeight: 0 },
];

const productsData = [
    {
        id: 'product1',
        name: 'Product 1',
        imageUrl: 'https://via.placeholder.com/150',
        price: 10.99,
        weight: 10,
    },
    {
        id: 'product2',
        name: 'Product 2',
        imageUrl: 'https://via.placeholder.com/150',
        price: 15.99,
        weight: 15,
    },
    // ... more products
];

const App = () => {
    const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
    const [products, setProducts] = useState<Product[]>(productsData);
    const [trucks, setTrucks] = useState<Truck[]>(trucksData);
    const [showFullTruckError, setShowFullTruckError] = useState<boolean>(false);
    const [showSelectTruckError, setShowSelectTruckError] = useState<boolean>(false);

    useEffect(() => {
        // Load data from local storage or API if needed
    }, []);

    const handleAddProduct = (product: Product, quantity: number) => {
        if (selectedTruck) {
            const updatedWeight = selectedTruck.currentWeight + product.weight * quantity;

            if (updatedWeight <= selectedTruck.maxWeight) {
                const updatedTruck = {
                    ...selectedTruck,
                    currentWeight:
                        selectedTruck.currentWeight + product.weight * quantity,
                };
                setTrucks(
                    trucks.map((truck) => (truck.id === selectedTruck.id ? updatedTruck : truck))
                );
                setSelectedTruck(updatedTruck);
            }
            else {
                setShowFullTruckError(true);
                setTimeout(() => setShowFullTruckError(false), 5000);
            }
        }
        else {
            setShowSelectTruckError(true);
            setTimeout(() => setShowSelectTruckError(false), 5000);
        }
    };

    const handleSelectTruck = (truck: Truck) => {
        setSelectedTruck(truck);
    };

    const handleCreateTruck = () => {

        const newTruckId = 'truck ' + (trucks.length + 1).toString();
        const newTruck: Truck = {
            id: newTruckId,
            name: 'Truck ' + (trucks.length + 1).toString(),
            maxWeight: 10000,
            currentWeight: 0,
        };
        setTrucks([...trucks, newTruck]);
        setSelectedTruck(newTruck);
    };

    const handleDeleteTruck = (truckId: string) => {
        setTrucks(trucks.filter((truck) => truck.id !== truckId));
        setSelectedTruck(null);
    };

    return (
        <div className="app">
            <header>
                <button onClick={handleCreateTruck}>Create Truck</button>
                {selectedTruck && (                    
                    <div className="selected-truck-details">                        
                        <h2>Selected truck: {selectedTruck.name}</h2>
                        <p>
                            Current Weight: {selectedTruck.currentWeight} / {selectedTruck.maxWeight} kg
                        </p>
                        {showFullTruckError && (
                            <p color="red">Product was not added! This truck is full, decrease quantity or select another truck</p>
                        )}
                    </div>                    
                )}
                {showSelectTruckError && (
                    <p color="red">To add product select truck firstly!</p>
                )}
            </header>
            <main>
                <TruckList
                    allTrucks={trucks}
                    selectedTruck={selectedTruck}
                    onSelectTruck={handleSelectTruck}
                    onDeleteTruck={handleDeleteTruck}
                />
                
                <div className="product-catalog">
                    <h2>Product Catalog</h2>
                    <div className="product-list">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddProduct={handleAddProduct}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;