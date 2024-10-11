import React, { useState, useEffect } from 'react';
import { Truck, Product } from './types';
import ProductCard from './components/ProductCard';
import TruckList from './components/TruckList';
import './styles.scss';
import TruckDetails from './components/TruckDetails';

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
            <header>
                <button className="btn" onClick={handleAddTruck}>Add Truck</button>
                {selectedTruck && (  
                    <div>
                        <TruckDetails
                            truck={selectedTruck}
                            selected={true}
                            onSelectTruck={handleSelectTruck}
                            onDeleteTruck={handleDeleteTruck}
                            displaysOnHeader={true}
                        />
                    </div>                                  
                )}
                {showSelectTruckError && (
                    <p style={{ color: 'red' }}>To add product select truck firstly!</p>
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