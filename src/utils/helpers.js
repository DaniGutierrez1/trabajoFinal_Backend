import { faker,Faker,es,en} from "@faker-js/faker";

const {database,commerce,image,string}=faker;

const generateProduct=()=>{
    return{
        id:database.mongodbObjectId(),
        title:commerce.productName(),
        price:parseFloat(commerce.price({min:3000,max:10000})),
        stock:parseFloat(string.numeric(2)),
        image:image.url(),
        code:string.alphanumeric(10),
        description:commerce.productDescription()
    }
};

//generateProduct();

export const generateCart=()=>{
    const numberOfProducts =parseInt(string.numeric(1));
    let products = [];
    for (let i=0;i<numberOfProducts;i++){
        const newProduct = generateProduct();
        products.push(newProduct);
    };
    return{
        cart:products
    }
}