import { urlDB } from '../Compartido/url.js';

export async function getProductos () {

    try {
        const responseGet = await fetch(urlDB.concat('consultarProductos'))
        const response = responseGet.text();
        return response;

    }catch (err) {
        console.log(err)
    }
    
}