import UserDTO from '@/dto/UserDTO';
import store from '@/store';
import axios from 'axios';

async function getUsers() {
    try {
        const accessToken = store.state.accessToken; 
        const refreshToken = store.state.refreshToken;
        const response = await axios.get('http://localhost:9090/api/users/admin/fetch-users', {headers: { Authorization: "Bearer " + accessToken, Refresh: "Bearer " + refreshToken }});
        const users = response.data.map(userData => new UserDTO({
            name: userData.name,
            email: userData.email,
            role: userData.role,
            verified: userData.verified,
        }));
        return users;
    } catch(error) {
        return [];
    }
}

export { getUsers }