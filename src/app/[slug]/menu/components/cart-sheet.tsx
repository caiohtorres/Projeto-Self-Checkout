import { useContext, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";
import FinishOrderDialog from "./finish-order-dialog";

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);
  return (
    <>
      <Sheet open={isOpen} onOpenChange={toggleCart}>
        <SheetContent className="w-[80%]">
          <SheetHeader className="text-left">
            <SheetTitle>Sacola</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex h-full flex-col py-5">
            <div className="flex-auto">
              {products.map((product) => (
                <CartProductItem key={product.id} product={product} />
              ))}
            </div>
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-sm font-semibold">
                    {formatCurrency(total)}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Button
              className="w-full rounded-full"
              onClick={() => setFinishOrderDialogIsOpen(true)}
            >
              Finalizar pedido
            </Button>
            <FinishOrderDialog
              open={finishOrderDialogIsOpen}
              onOpenChange={setFinishOrderDialogIsOpen}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartSheet;
