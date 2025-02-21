"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription,SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import CartSheet from "../../components/cart-sheet";
import { CartContext } from "../../contexts/cart";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true;
                    avatarImageUrl: true;
                };
            };
        };
    }>;
}

const ProductDetails = ({ product}: ProductDetailsProps) => {
    const { toggleCart, addProduct} = useContext(CartContext);
    const [quantity, setQuantity] = useState<number>(1);
    const handleDecreaseQuantity = () => setQuantity((prev) => {if (prev=== 1){ return 1} return prev - 1});
    const handleIncreaseQuantity = () => setQuantity((prev) => prev + 1);
    const handleAddToCart = () =>{
        addProduct({
            ...product,
            quantity,
        });
        toggleCart();
    }
    return (  
        <>
        <div className="relative z-50 rounded-t-3xl py-5 mt-[-1.5rem] p-5 flex flex-col flex-auto overflow-hidden">
            <div className="flex-auto overflow-hidden">
    
                {/* RESTAURANTE */}
                <div className="flex items-center gap-1.5">
                    <Image src={product.restaurant.avatarImageUrl} alt={product.restaurant.name} width={16} height={16} className="rounded-full"/>
                    <p className="gap-1 text-xs text-muted-foreground">{product.restaurant.name}</p>
                </div>
            
                {/* NOME DO PRODUTO */}
                <h2 className="text-xl font-semibold mt-1">{product.restaurant.name}</h2>

                {/* PREÇO E QUANTIDADE */}
                <div className="flex justify-between mt-2 items-center mt-3">                        
                    <h3 className="font-semibold text-xl">
                        {formatCurrency(product.price)}
                    </h3>
                    <div className="flex gap-3 items-center text-center">
                        <Button variant="outline" className="h-8 w-8 rounded-xl" onClick={handleDecreaseQuantity}>
                            <ChevronLeftIcon/>
                        </Button>
                        <p className="w-4">{quantity}</p>
                        <Button variant="destructive" className="h-8 w-8 rounded-xl" onClick={handleIncreaseQuantity}>
                            <ChevronRightIcon/>
                        </Button>
                    </div>
                </div>

            <ScrollArea className="h-full">
                                {/* SOBRE */}
                                <div className="mt-6 space-y-3">
                    <h4 className="font-semibold">Sobre</h4>
                    <p className="text-sm text-muted-foreground">
                        {product.description}

                    </p>
                </div>

                {/* INGREDIENTES */}
            <div className="mt-6 space-y-3">
                <div className="flex items-center gap-1">
                    <ChefHatIcon size={18} />
                    <h4 className="font-semibold">Ingredientes</h4>
                </div>
                <ul className="text-sm text-muted-foreground px-2">
                    {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="list-disc list-inside">
                        {ingredient.trim()}
                    </li>
                    ))}
                </ul>
                
                </div>
            </ScrollArea>
            </div>

            <Button className="w-full rounded-full mt-2" onClick={handleAddToCart}>
                Adicionar à sacola
            </Button>

        </div>
        <CartSheet/>
        </>
    );
}
 
export default ProductDetails;