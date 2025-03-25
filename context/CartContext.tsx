"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  stock?: number;
}

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "INCREMENT"; payload: number }
  | { type: "DECREMENT"; payload: number }
  | { type: "SET_CART"; payload: CartItem[] };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_CART":
      return { items: action.payload };

    case "ADD_TO_CART":
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (exists) {
        const maxQuantity = action.payload.stock ?? Infinity;
        const newQuantity = Math.min(
          exists.quantity + action.payload.quantity,
          maxQuantity
        );

        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: newQuantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload &&
          (!item.stock || item.quantity < item.stock)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    default:
      return state;
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // İlk açılışta sadece bir kez localStorage'tan oku
  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      dispatch({ type: "SET_CART", payload: JSON.parse(stored) });
    }
  }, []);

  // Değişiklik oldukça localStorage'a yaz
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
