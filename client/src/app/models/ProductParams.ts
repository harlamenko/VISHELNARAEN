interface IProductParams {
    sex?: string;
    type?: string;
};

export class ProductParams implements IProductParams {
    sex?: string;
    type?: string;
    constructor() {
        this.type = null;
        this.sex = null;
    }
}