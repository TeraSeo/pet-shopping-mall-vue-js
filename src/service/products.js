import ProductDTO from "@/dto/ProductDTO";
import store from "@/store";
import axios from "axios";

const accessToken = store.state.accessToken; 
const refreshToken = store.state.refreshToken;

async function addProduct(name, quantity, price, category, subCategory, image, deliveryFee) {
    try {
        const user_id = store.state.userId;
        const response = await axios.post('http://localhost:9090/api/product/add/product', 
        {name : name, quantity: quantity, price: price, category: category, subCategory: subCategory, deliveryFee: deliveryFee, image: image, user_id: user_id, imagePath: ''},
        {   
            headers: { 'Content-Type': 'multipart/form-data', Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken } 
        });
        return response.data;
    } catch(error) {
        return false;
    }
}

async function editProduct(id, name, quantity, price, category, subCategory, image, deliveryFee, imagePath) {
    try {
        console.log(imagePath)
        if (image == '') {
            const response = await axios.put('http://localhost:9090/api/product/edit/product/without/image', 
            {id: id, name : name, quantity: quantity, price: price, category: category, subCategory: subCategory, deliveryFee: deliveryFee},
            {   
                headers: { Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken } 
            });
            return response.data;
        }
        else {
            const response = await axios.put('http://localhost:9090/api/product/edit/product', 
            {id: id, name : name, quantity: quantity, price: price, category: category, subCategory: subCategory, deliveryFee: deliveryFee, image: image, imagePath: imagePath},
            {   
                headers: { 'Content-Type': 'multipart/form-data', Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken } 
            });
            return response.data;
        }
    } catch(error) {
        return false;
    }
}

async function getAllProducts() {
    try {
        const response = await axios.get('http://localhost:9090/api/product/get/products', 
        {   
            headers: { Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken } 
        });
        const products = response.data.map(productData => new ProductDTO({
            id: productData.id,
            category: productData.category,
            deliveryFee: productData.deliveryFee,
            image: productData.image,
            imagePath: productData.imagePath,
            name: productData.name,
            price: productData.price,
            quantity: productData.quantity,
            subCategory: productData.subCategory,
            user_id: productData.user_id,
        }));
        return products;
    } catch(error) {
        return [];
    }
}

async function delProducts(products) {
    try {
        const ids = products.map(product => product.id);
        const imagePaths = products.map(product => product.imagePath);
        const response = await axios.delete('http://localhost:9090/api/product/delete/products', 
        {   
            headers: { productIds: ids, imagePaths: imagePaths, Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken } 
        });
        return response.data;
    } catch(error) {
        return false;
    }
}

async function getProductsBySubCategory(category, subCategory) {
    const response = await axios.get('http://localhost:9090/api/product/get/by/sub/category', 
    {   
        params: {
            'category': category,
            'subCategory': subCategory
        },
        headers: { Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken } 
    });
    const products = response.data.map(productData => new ProductDTO({
        id: productData.id,
        category: productData.category,
        deliveryFee: productData.deliveryFee,
        image: productData.image,
        imagePath: productData.imagePath,
        name: productData.name,
        price: productData.price,
        quantity: productData.quantity,
        subCategory: productData.subCategory,
        user_id: productData.user_id,
    }));
    return products;
}

export { addProduct, editProduct, getAllProducts, delProducts, getProductsBySubCategory }