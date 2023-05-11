import { urlDB } from '../Compartido/url.js';

export async function requestPost (nameServices, formData) {
    try {

        if(!nameServices || !formData) {
            return null;
        }

        const bodyPost = {
            method: 'POST',
            body: formData
        }

        const responsePOST = await fetch(urlDB.concat(nameServices), bodyPost);
        const response = responsePOST.text();
        if(response !== '0'){
            console.log('Save with exit', response)
            return response;
        }
        return '';


    } catch (err) {
        console.log(err);
    }

}
