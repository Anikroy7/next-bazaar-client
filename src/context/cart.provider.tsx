import React, { createContext, useContext, useReducer, useEffect } from "react";

export type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    vendorId: number
};

export type RemoveQuantity = {
    id: number
}

const initialCartState: CartItem[] = [];

const loadCartFromLocalStorage = (): CartItem[] => {
    try {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : initialCartState;
    } catch (error) {
        return initialCartState;
    }
};

type CartAction =
    | { type: "ADD_TO_CART"; payload: CartItem }
    | { type: "DECREMENT_QUANTITY"; payload: RemoveQuantity }
    | { type: "REMOVE_FROM_CART"; payload: number }
    | { type: "CLEAR_CART" };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
    switch (action.type) {
        case "ADD_TO_CART":
            const existingProductIndex = state.findIndex(
                (item) => item.id === action.payload.id
            );

            if (existingProductIndex >= 0) {
                return state.map((item, index) =>
                    index === existingProductIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...state, { ...action.payload, quantity: 1 }];
        case "DECREMENT_QUANTITY":
            const deexistingProductIndex = state.findIndex(
                (item) => item.id === action.payload.id
            );

            if (deexistingProductIndex >= 0) {
                return state.map((item, index) =>
                    index === deexistingProductIndex
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }

            return [...state];

        case "REMOVE_FROM_CART":
            return state.filter((item) => item.id !== action.payload);

        case "CLEAR_CART":
            return [];

        default:
            return state;
    }
};
const CartContext = createContext<{
    cart: CartItem[];
    dispatch: React.Dispatch<CartAction>;
}>({
    cart: initialCartState,
    dispatch: () => { },
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [cart, dispatch] = useReducer(cartReducer, loadCartFromLocalStorage());

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
