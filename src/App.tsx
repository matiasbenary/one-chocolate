import { useState } from "react";
import type { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import GoogleLogin from "./components/GoogleLogin";
import ProductCard from "./components/ProductCard";
import PaymentSuccess from "./components/PaymentSuccess";
import TransactionsTable from "./components/TransactionsTable";

interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
  given_name?: string;
  family_name?: string;
}

const App = () => {
  const [user, setUser] = useState<GoogleUser | null>(() => {
    return JSON.parse(localStorage.getItem("googleUser") || "null");
  });

  const params = new URLSearchParams(window.location.search);
  const sid = params.get('session_id');

  const [showSuccess, setShowSuccess] = useState(!!sid);
  const [sessionId, setSessionId] = useState<string | null>(sid);

  const handleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      const googleUser = jwtDecode<GoogleUser>(credentialResponse.credential);
      setUser(googleUser);
      localStorage.setItem("googleUser", JSON.stringify(googleUser));
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("googleUser");
  };

  const handleContinueShopping = () => {
    setShowSuccess(false);
    setSessionId(null);
    window.history.replaceState({}, '', '/');
  };

  console.log(user);

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      {!user ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-xl px-8 py-10 bg-gray-800 rounded-2xl shadow-xl outline outline-white/15">
            <GoogleLogin onSuccess={handleLoginSuccess} />
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto space-y-6">
          <div className="px-8 py-8 bg-gray-800 rounded-2xl shadow-xl">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={user.picture}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Welcome, {user.name}!
                </h1>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
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
        <div className="max-w-4xl mx-auto mt-8">
            <TransactionsTable />
        </div>
      )}
    </div>
  );
};

export default App;
