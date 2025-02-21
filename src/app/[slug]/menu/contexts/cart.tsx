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
    decreaseProductQuantity: (productId: string) => void,
    increaseProductQuantity: (productId: string) => void,
    removeProduct: (productId: string) => void,
}

export const CartContext =  createContext<ICartContext>({
    isOpen: false,
    products: [],
    toggleCart: () => {},
    addProduct: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    removeProduct: () => {},
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

    const decreaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {
                if(prevProduct.id !== productId)
                    return prevProduct;

                if (prevProduct.quantity === 1){
                    return prevProduct;
                }
                return {...prevProduct, quantity: prevProduct.quantity - 1}
                

            })
        })
    }

    const increaseProductQuantity = (productId: string) => {
        setProducts(prevProducts => {
            return prevProducts.map(prevProduct => {
                if(prevProduct.id !== productId)
                    return prevProduct;

                return {...prevProduct, quantity: prevProduct.quantity + 1}
                

            })
        })
    }

    const removeProduct = (productId: string) => {
        setProducts(prevProducts => prevProducts.filter(prevProduct => prevProduct.id !== productId))
    }

    return (
        <CartContext.Provider
        value={{
            isOpen,
            products,
            toggleCart,
            addProduct,
            decreaseProductQuantity,
            increaseProductQuantity,
            removeProduct,
        }}  
        >{children}</CartContext.Provider>
    )
}