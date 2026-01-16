import { useState, useEffect } from 'react';
import { API_URL } from '../config';
import ProductFormModal from './ProductFormModal';
import type { Product } from '../types';

const MAX_PRODUCTS = 3;

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const isAddDisabled = products.length >= MAX_PRODUCTS;

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6">
        <p className="text-gray-400">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Products</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          disabled={isAddDisabled}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          title={isAddDisabled ? `Maximum ${MAX_PRODUCTS} products allowed` : 'Add new product'}
        >
          Add Product
        </button>
      </div>

      {isAddDisabled && (
        <p className="text-yellow-400 text-sm mb-4">
          Maximum of {MAX_PRODUCTS} products reached
        </p>
      )}

      {products.length === 0 ? (
        <p className="text-gray-400">No products yet. Create your first product!</p>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg"
            >
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-600 rounded flex items-center justify-center text-gray-400">
                  No img
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-white font-medium">{product.name}</h3>
                {product.description && (
                  <p className="text-gray-400 text-sm">{product.description}</p>
                )}
                <p className="text-indigo-400 font-bold">
                  ${(product.price / 100).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductCreated={fetchProducts}
      />
    </div>
  );
};

export default ProductList;
