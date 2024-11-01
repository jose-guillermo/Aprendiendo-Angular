export interface Product {
    description: string;
    price: number;
}

const phone: Product = {
    description: "Nokia A1",
    price: 150.0
}

const tablet: Product = {
    description: "iPad Air",
    price: 250.0
}

interface TaxCalcultaionOptions {
    tax: number;
    products: Product[];
}
// function taxCalculation({tax, products}: TaxCalcultaionOptions): [number, number]{
export function taxCalculation(options: TaxCalcultaionOptions): [number, number]{
    const {tax, products} = options;
    let total = 0;
    products.forEach(({price})=>{    
        total += price;
    });

    return [total, total * tax];
}

const shoppingCart = [phone, tablet];
const tax = 0.15;

const [total, taxTotal] = taxCalculation({
    products: shoppingCart,
    tax: tax,
});

// console.log("Total", total);
// console.log("tax", taxTotal);
