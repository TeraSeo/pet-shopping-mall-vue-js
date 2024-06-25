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
            isVerified: userData.isVerified,
        }));
        return users;
    } catch(error) {
        return [];
    }
}

async function createUser(username, email, password, role) {
    try {
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
        const response = await axios.put('http://localhost:9090/api/users/admin/edit-user', 
        {id: id, name : name, email: email, role: role},
        {headers: { Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken }});
        return response.data;
    } catch(error) {
        return false;
    }
}

async function delUsers(users) {
    try {
        const ids = users.map(user => user.id);
        const response = await axios.delete('http://localhost:9090/api/users/admin/delete-users', 
        {   
            headers: { userIds: ids, Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken } 
        });
        return response.data;
    } catch(error) {
        return false;
    }
}

export { getUsers, createUser, editUser, delUsers }