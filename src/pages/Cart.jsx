import React, { useEffect, useState } from 'react';

const Cart = () => {
  // State to hold the cart item from localStorage
  const [cartItem, setCartItem] = useState(null);

  // Fetch cart data from localStorage on component mount
  useEffect(() => {
    const categoryName = localStorage.getItem('cartCategory');
    const categories = {
      Chicken: "https://example.com/chicken.jpg",
      "Fish & Seafood": "https://example.com/fish.jpg",
      Mutton: "https://example.com/mutton.jpg",
      Eggs: "https://example.com/eggs.jpg",
      "Ready to Cook": "https://example.com/readytocook.jpg",
      "Cold Cuts": "https://example.com/coldcuts.jpg",
    };

    if (categoryName) {
      setCartItem({
        name: categoryName,
        imageUrl: categories[categoryName],
      });
    }
  }, []);

  // Generate a random discount and total price
  const randomDiscount = Math.floor(Math.random() * 20) + 5; // 5% to 25% discount
  const randomTotalAmount = (Math.random() * (100 - 50) + 50).toFixed(2); // random total between $50 and $100

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-pink-800 mb-6">Your Cart</h1>
      
      {cartItem ? (
        <div className="px-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center p-4">
            <img
              src={cartItem.imageUrl}
              alt={cartItem.name}
              className="w-24 h-24 object-cover rounded-lg mr-4"
            />
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold text-gray-800">{cartItem.name}</h2>
              <p className="text-gray-600 mt-2">Discount: <span className="text-green-600">{randomDiscount}% off</span></p>
              <p className="text-gray-800 mt-1 font-medium">Total Amount: <span className="text-blue-600">${randomTotalAmount}</span></p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}
      {/* "Order" Button fixed at the bottom */}
      <button 
        className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-pink-800 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-pink-700 transition"
        onClick={() => alert("Order placed!")}
      >
        Order
      </button>
    </div>
  );
};

export default Cart;
