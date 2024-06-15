import UserDTO from '@/dto/UserDTO';
import store from '@/store';
import axios from 'axios';

const accessToken = store.state.accessToken; 
const refreshToken = store.state.refreshToken;

async function getUsers() {
    
    try {
        const response = await axios.get('http://localhost:9090/api/users/admin/fetch-users', {headers: { Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken }});
        const users = response.data.map(userData => new UserDTO({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            verified: userData.isVerified,
        }));
        return users;
    } catch(error) {
        return [];
    }
}

async function createUser(username, email, password, role) {
    try {
        console.log(role);
        const response = await axios.post('http://localhost:9090/api/users/admin/create-user', 
        {name : username, email: email, password: password, role: role},
        {headers: { Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken }});
        return response.data;
    } catch(error) {
        return false;
    }
}

async function editUser(id, name, email, role) {
    try {
        console.log(id + " " + name + " " + email + " " + role);
        const response = await axios.put('http://localhost:9090/api/users/admin/edit-user', 
        {id: id, name : name, email: email, role: role},
        {headers: { Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken }});
        return response.data;
    } catch(error) {
        return false;
    }
}

async function delUsers(userDtos) {
    try {
        console.log(userDtos);
        
    } catch(error) {
        return false;
    }
}
export { getUsers, createUser, editUser, delUsers }