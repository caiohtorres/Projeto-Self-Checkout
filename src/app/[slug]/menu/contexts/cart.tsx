"use client";
import { Product } from "@prisma/client";
import { projectUpdate } from "next/dist/build/swc/generated-native";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl">{
    quantity: number;
}

export interface ICartContext{
    isOpen: boolean;
    products: CartProduct[];
    toggleCart: () => void;
    addProduct: (product: CartProduct)=> void;
}

export const CartContext =  createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
})

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [products, setProducts] = useState<CartProduct[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCart= () =>{
        setIsOpen(prev => !prev);
    }

    const addProduct = (product: CartProduct) => {
        
        const productIsAlreadyOnTheCart = products.some(prevProducts => prevProducts.id === product.id)
            if (!productIsAlreadyOnTheCart){
                return setProducts([...products, product]);
            }
        setProducts(prevProducts => {
            return prevProducts.map(prevProducts => {
                if(prevProducts.id === product.id){
                    return {
                        ...prevProducts,
                        quantity: prevProducts.quantity + product.quantity
                    }
                }
                return prevProducts;
            })
        })
    }

    return (
        <CartContext.Provider
        value={{
            isOpen,
            products,
            toggleCart,
            addProduct,
        }}
        >{children}</CartContext.Provider>
    )
}