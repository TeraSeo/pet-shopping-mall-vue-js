import store from "@/store";
import axios from "axios";

const accessToken = store.state.accessToken; 
const refreshToken = store.state.refreshToken;

async function addProduct(name, summary, quantity, price, category, subCategory, image, deliveryFee) {
    try {
        const user_id = store.state.email;

        const response = await axios.post('http://localhost:9090/api/product/add/product', 
        {name : name, summary: summary, quantity: quantity, price: price, category: category, subCategory: subCategory, deliveryFee: deliveryFee, image: image, user_id: user_id},
        {   
            headers: { 'Content-Type': 'multipart/form-data', Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken } 
        });
        return response.data;
    } catch(error) {
        return false;
    }
}

async function getAllProducts() {
    try {
        console.log('s')
        return true;
    } catch(error) {
        return false;

    }
}

export { addProduct, getAllProducts }