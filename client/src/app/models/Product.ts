interface IProduct {
    id: number;
    title: string;
    cat: string;
    type: string;
    price: number;
    rus_name: string;
    img: string;
}
export class Product implements IProduct {
    id: number;
    title: string;
    cat: string;
    type: string;
    price: number;
    rus_name: string;
    img: string;
}
