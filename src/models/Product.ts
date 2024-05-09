import { Category } from "../App";

class Product {
    
    constructor(
        public id: number,
        public discription: string,
        public amount: number,
        public category: Category
    ) {}
}

export default Product;