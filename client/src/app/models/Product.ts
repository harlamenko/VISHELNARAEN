import { Validators } from "@angular/forms";

export class Variant {
    constructor(
        public color: string = null,
        public sizes: string[] = null,
        public photo: string = null
    ) {}
}

export interface IProduct {
    cat: string;
    en_descr: string[];
    en_name: string;
    en_title: string;
    id: number;
    next_id: number;
    prev_id: number;
    price: number;
    rating: number;
    rus_descr: string[];
    rus_name: string;
    rus_title: string;
    type: string;
    variants: Variant[];
    created_at: Date;
    updated_at: Date;
}

export class Product {
    constructor(
        public cat: string = null,
        public en_descr: string[] = null,
        public en_name: string = null,
        public en_title: string = null,
        public id: number = null,
        public next_id: number = null,
        public prev_id: number = null,
        public price: number = null,
        public rating: number = null,
        public rus_descr: string[] = null,
        public rus_name: string = null,
        public rus_title: string = null,
        public type: string = null,
        public variants: Variant[] = null,
        public created_at: Date = null,
        public updated_at: Date = null,
    ) {}
}

export class ProductValidation {
    constructor(
        public en_name = [Validators.required],
        public rus_name = [Validators.required],
        public en_descr = [Validators.required, Validators.minLength(1)],
        public rus_descr = [Validators.required, Validators.minLength(1)],
        public en_title = [Validators.required, Validators.minLength(1)],
        public rus_title = [Validators.required, Validators.minLength(1)],
        public cat = [Validators.required],
        public price = [Validators.required, Validators.min(1)],
        public type = [Validators.required],
        public variants = {
            color: [Validators.required],
            sizes: [Validators.required],
            photo: [Validators.required]
        },
    ) { }
}