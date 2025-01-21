"use client";

import { useState } from "react";

import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { InputGroup } from "@/components/InputGroup";

type Discount = {
  id: string;
  value: string;
};

export default function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discounts, setDiscounts] = useState<Discount[]>([
    { id: "1", value: "" },
    { id: "2", value: "" },
  ]);

  const addDiscount = () => {
    setDiscounts((prev) => [...prev, { id: Date.now().toString(), value: "" }]);
  };

  const updateDiscount = (id: string, value: string) => {
    setDiscounts((prev) =>
      prev.map((discount) =>
        discount.id === id ? { ...discount, value } : discount,
      ),
    );
  };

  const removeDiscount = (id: string) => {
    setDiscounts((prev) => prev.filter((discount) => discount.id !== id));
  };

  function calculateDiscount() {
    return (
      (1 -
        discounts.reduce((acc, discount) => {
          const discountValue = Number.parseFloat(discount.value);
          if (isNaN(discountValue)) return acc;
          return acc * (1 - discountValue / 100);
        }, 1)) *
      100
    ).toFixed(2);
  }

  const calculateFinalPrice = () => {
    const originalPrice = Number.parseFloat(price);
    if (isNaN(originalPrice))
      return { finalPrice: "0.00", totalDiscount: calculateDiscount() };

    const finalPrice = discounts.reduce((acc, discount) => {
      const discountValue = Number.parseFloat(discount.value);
      if (isNaN(discountValue)) return acc;
      return acc * (1 - discountValue / 100);
    }, originalPrice);

    const totalDiscount = ((originalPrice - finalPrice) / originalPrice) * 100;

    return {
      finalPrice: finalPrice.toFixed(2),
      totalDiscount: totalDiscount.toFixed(2),
    };
  };

  const { finalPrice, totalDiscount } = calculateFinalPrice();

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Calculadora de Descuentos de Productos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="price">Precio Original:</Label>
          <InputGroup
            id="price"
            type="number"
            prefix="$"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ingresa el precio"
          />
        </div>
        <div className="space-y-2">
          <Label>Descuentos (%):</Label>
          {discounts.map((discount) => (
            <div
              key={discount.id}
              className="relative flex w-full items-center gap-2"
            >
              <InputGroup
                type="number"
                suffix="%"
                value={discount.value}
                onChange={(e) => updateDiscount(discount.id, e.target.value)}
                placeholder="Ingresa el descuento"
                className="w-full text-right"
              />
              <Button
                variant="outline"
                size="icon"
                className="shrink-0"
                onClick={() => removeDiscount(discount.id)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            onClick={addDiscount}
            variant="outline"
            className="w-full text-muted-foreground transition-colors hover:text-foreground"
          >
            <Plus className="mr-2 h-4 w-4" /> Agregar Descuento
          </Button>
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Precio Final: ${finalPrice}</p>
          <p className="font-semibold">Descuento Total "Real": {totalDiscount}%</p>
        </div>
      </CardContent>
    </Card>
  );
}
