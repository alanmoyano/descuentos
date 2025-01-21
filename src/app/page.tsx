import DiscountCalculator from "@/components/DiscountCalculator";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Calculadora de Descuentos
      </h1>
      <DiscountCalculator />
    </main>
  );
}
