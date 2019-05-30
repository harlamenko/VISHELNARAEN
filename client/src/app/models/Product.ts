interface IProduct {
    id: number;
    title: string;
    cat: string;
    type: string;
    price: number;
    rus_name: string;
    rating: number;
    rus_descr: string[];
    en_descr: string[];
    variants: Variant[];
    sex?: any;
    en_name: string;
    next_id: number;
    prev_id: number;
}

export class Variant {
    color: string;
    sizes: string[];
    photo: string;

    constructor() {
        this.color = null;
        this.sizes = null;
        this.photo = null;
    }
}

export class Product implements IProduct {
    id: number;
    title: string;
    cat: string;
    type: string;
    price: number;
    rus_name: string;
    rating: number;
    rus_descr: string[];
    en_descr: string[];
    variants: Variant[];
    sex?: any;
    en_name: string;
    next_id: number;
    prev_id: number;
}
