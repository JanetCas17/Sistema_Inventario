import {createContext} from 'react';

const UserContext = createContext({
    id: null,
    user: null,
    password: null
})


export default UserContext;