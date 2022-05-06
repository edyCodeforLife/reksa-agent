import {ProductService} from '../../../data/business/product/product';

let instance = null;
class SingletonModuleScopedInstance {
    data: object = {};
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    getData(key: any) {
        return this.data[key];
    }

    setData(key: any, data: any) {
        this.data[key] = data;
        return this.data[key];
    }
}

export default SingletonModuleScopedInstance;