interface IProduct {
    id: number;
    title: string;
    cat: string;
    type: string;
    price: number;
    rus_name: string;
    rating: number;
    img: string;
    color: string[];
    size: string[];
}
export class Product implements IProduct {
    id: number;
    title: string;
    cat: string;
    type: string;
    price: number;
    rus_name: string;
    img: string;
    rating: number;
    color: string[];
    size: string[];
}
