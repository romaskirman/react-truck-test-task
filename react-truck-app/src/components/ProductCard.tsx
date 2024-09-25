import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    onAddProduct: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddProduct }) => {
    const [quantity, setQuantity] = useState(0);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.target.value, 10));
    };

    const handleAddProduct = () => {
        onAddProduct(product, quantity);
    };

    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Weight: {product.weight} kg</p>
            <div>
                <input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
                <button onClick={handleAddProduct}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;