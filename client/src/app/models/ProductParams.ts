interface IProductParams {
    sex?: string;
    type?: string;
    count: number;
    lang?: string;
    qs?: string;
};

export class ProductParams implements IProductParams {
    sex?: string;
    type?: string;
    count: number;
    lang?: string;
    qs?: string;
    constructor() {
        this.type = null;
        this.sex = null;
    }
}