import { FormBuilder, FormGroup } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";

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
        public en_name = [RxwebValidators.required({message: 'You must enter a product name.'})],
        public rus_name = [RxwebValidators.required({message: 'Необходимо ввести название товара.'})],
        public en_descr = [
            RxwebValidators.minLength({
                value: 1,
                message: 'Description must contain at least 1 line.'
            })
        ],
        public rus_descr = [
            RxwebValidators.minLength({
                value: 1,
                message: 'Описание должно содержать не менее 1 строки.'
            })
        ],
        public en_title = [RxwebValidators.required({message: 'You must enter a product short description.'})],
        public rus_title = [RxwebValidators.required({message: 'Необходимо ввести краткое описание товара.'})],
        public cat = [RxwebValidators.required({message: 'Необходимо выбрать пол потребителя.'})],
        public price = [
            RxwebValidators.required({message: 'Необходимо указать цену товара.'}),
            RxwebValidators.minNumber({value: 1, message: 'Цена должна быть больше 0.'})
        ],
        public type = [RxwebValidators.required({message: 'Необходимо указать категорию товара.'})],
        public variants = {
            color: [RxwebValidators.required({message: 'Необходимо указать цвет товара.'})],
            sizes: [RxwebValidators.minLength({value: 1, message: 'Необходимо указать размеры товара.'})],
            photo: [RxwebValidators.required({message: 'Необходимо добавить фото товара.'})]
        },
    ) { }
}

export class ProductFormGroupModel {
    constructor (product: IProduct) {
        const _fb = new FormBuilder;
        const productValidation = new ProductValidation;

        Object.keys(product).forEach(k => {
            switch (k) {
                case 'variants':
                    const vars = product.variants.map(variant => {
                        const varsObj = {};

                        Object.keys(variant).forEach(key => {
                            if (key === 'sizes') {
                                varsObj[key] = _fb.array(variant[key].map(size => _fb.control(size)), productValidation.variants[key])
                            } else {
                                varsObj[key] = [variant[key], productValidation.variants[key]];
                            }
                        });

                        return _fb.group(varsObj);
                    });

                    this[k] = _fb.array(vars);
                    break;

                case 'en_descr':
                case 'rus_descr':
                    this[k] = _fb.array(product[k].map(line => _fb.control(line)));
                    break;

                default:
                    this[k] = [product[k]];

                    if (k in productValidation) {
                        this[k].push(productValidation[k]);
                    }
            }
        });

        return _fb.group(this);
    }

    static makeVariantFG(photo: string, color: string, sizes: string[]): FormGroup {
        const _fb = new FormBuilder;
        const productValidation = new ProductValidation;

        const newVar = {
            sizes : _fb.array(sizes.map(size => _fb.control(size)), productValidation.variants.sizes),
            photo  : [photo, productValidation.variants.photo],
            color : [color, productValidation.variants.color]
        };

        return _fb.group(newVar);
    }
}
