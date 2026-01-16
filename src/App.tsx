import { useState } from "react";
import ProductCard from "./components/ProductCard";
import PaymentSuccess from "./components/PaymentSuccess";
import TransactionsTable from "./components/TransactionsTable";
import CryptoTransactionsTable from "./components/CryptoTransactionsTable";
import ProductList from "./components/ProductList";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const { user, loading, login, logout } = useAuth();

  const params = new URLSearchParams(window.location.search);
  const sid = params.get('session_id');

  const [showSuccess, setShowSuccess] = useState(!!sid);
  const [sessionId, setSessionId] = useState<string | null>(sid);

  const handleContinueShopping = () => {
    setShowSuccess(false);
    setSessionId(null);
    window.history.replaceState({}, '', '/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {!user ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-xl px-8 py-10 bg-gray-800 rounded-2xl shadow-xl outline outline-white/15">
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-bold text-white">Welcome to Chocolate Shop</h1>
              <p className="text-gray-400">Sign in with Google to continue</p>
              <button
                onClick={login}
                className="w-full px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold rounded-lg transition-colors flex items-center justify-center gap-3"
              >
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto space-y-6">
          <div className="px-8 py-8 bg-gray-800 rounded-2xl shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Welcome, {user.name}!
                </h1>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          {showSuccess && sessionId ? (
            <PaymentSuccess
              sessionId={sessionId}
              onContinue={handleContinueShopping}
            />
          ) : (
            <ProductCard userEmail={user.email} />
          )}
        </div>
      )}

      {user && (
        <div className="max-w-6xl mx-auto mt-8 space-y-8">
            <ProductList />
            <TransactionsTable />
            <CryptoTransactionsTable />
        </div>
      )}
    </div>
  );
};

export default App;
