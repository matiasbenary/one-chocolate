import { useState } from 'react';
import { API_URL } from '../config';

interface ProductCardProps {
  userEmail: string | null;
}

const ProductCard = ({ userEmail }: ProductCardProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuyNow = async () => {
    if (!userEmail) {
      setError('Please log in first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/create-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          productName: 'prod_Tkes10326hp9lj',
          amount: "100", 
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment session');
      }

      const session = await response.json();
        console.log(session);
      window.location.href = session.sessionUrl;
    
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <img
        src="/chocolate-product.png"
        alt="Dark Chocolate"
        className="w-full h-64 object-cover object-center"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2">Dark Chocolate</h3>
        <p className="text-2xl font-bold text-indigo-400 mb-4">$1</p>
        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}
        <button
          onClick={handleBuyNow}
          disabled={loading}
          className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
