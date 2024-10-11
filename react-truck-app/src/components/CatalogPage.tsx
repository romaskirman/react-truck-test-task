import React, { useState, useEffect } from 'react';
import { Truck, Product } from '../types';
import ProductCard from './ProductCard';
import TruckList from './TruckList';
import '../styles.scss';
import TruckDetails from './TruckDetails';

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

const CatalogPage = () => {
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

    const handleAddTruck = () => {

        let newTruckId: string;

        if (trucks.length > 0) {
            newTruckId = (Number(trucks[trucks.length - 1].id.charAt(trucks[trucks.length - 1].id.length - 1)) + 1).toString();

        }
        else {
            newTruckId = '1';
        }

        const newTruck: Truck = {
            id: 'truck' + newTruckId,
            name: 'Truck ' + newTruckId,
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
            <header className="header">
                <div className="header-info">
                    <button className="btn add-truck-btn" onClick={handleAddTruck}>Add Truck</button>
                    {selectedTruck && (
                        <div>
                            <TruckDetails
                                truck={selectedTruck}
                                selected={true}
                                onSelectTruck={handleSelectTruck}
                                onDeleteTruck={handleDeleteTruck}
                                displaysOnHeader={true} />
                        </div>
                    )}
                </div>
                {showSelectTruckError && (
                    <p className="error-info">To add product select truck firstly!</p>
                )}
                {showFullTruckError && (
                    <p className="error-info">Product was not added! This truck is full, decrease quantity or select another truck</p>
                )}
            </header>
            <main className="main-container">
                <TruckList
                    allTrucks={trucks}
                    selectedTruck={selectedTruck}
                    onSelectTruck={handleSelectTruck}
                    onDeleteTruck={handleDeleteTruck} />

                <div className="product-catalog">
                    <hr className="product-catalog-line"></hr>
                    <div className="product-list">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddProduct={handleAddProduct} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CatalogPage;