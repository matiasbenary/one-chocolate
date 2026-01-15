import { useState, useEffect } from "react";
import type { CryptoTransaction } from "../types";
import { API_URL } from "../config";

const formatCurrency = (cents: number | null) => {
  if (cents === null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "text-green-400";
    case "pending":
      return "text-yellow-400";
    case "failed":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

const CryptoTransactionsTable = () => {
  const [transactions, setTransactions] = useState<CryptoTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);

      const token = localStorage.getItem("authToken");

      const response = await fetch(`${API_URL}/crypto-transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setTransactions(data.transactions);

      setLoading(false);
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="px-8 py-8 bg-gray-800 rounded-2xl shadow-xl">
        <div className="text-center text-gray-400">Loading crypto transactions...</div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="px-8 py-8 bg-gray-800 rounded-2xl shadow-xl">
        <div className="text-center text-gray-400">No crypto transactions found</div>
      </div>
    );
  }

  return (
    <div className="px-8 py-8 bg-gray-800 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">
        Crypto Transaction History
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-300 font-medium">
                ID
              </th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">
                Email
              </th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">
                Product
              </th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">
                Amount
              </th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">
                Status
              </th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">
                Transaction ID
              </th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">
                NEAR Tx Hash
              </th>
              <th className="text-left py-3 px-4 text-gray-300 font-medium">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-3 px-4 text-gray-400">#{transaction.id}</td>
                <td className="py-3 px-4 text-gray-400 text-sm">
                  {transaction.email}
                </td>
                <td className="py-3 px-4 text-white">
                  {transaction.product_name || "N/A"}
                </td>
                <td className="py-3 px-4 text-white font-medium">
                  {formatCurrency(transaction.amount_cents)}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`capitalize font-medium ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-400 text-sm font-mono">
                  {transaction.transacction_id ?
                    transaction.transacction_id.substring(0, 8) + '...' :
                    'N/A'}
                </td>
                <td className="py-3 px-4 text-gray-400 text-sm font-mono">
                  {transaction.near_transaction_hash ? (
                    <a
                      href={`https://nearblocks.io/es/txns/${transaction.near_transaction_hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 hover:underline"
                    >
                      {transaction.near_transaction_hash.substring(0, 8)}...
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="py-3 px-4 text-gray-400">
                  {formatDate(transaction.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTransactionsTable;
