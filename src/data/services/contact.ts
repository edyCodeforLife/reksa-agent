import axios from 'axios';
import querystring from 'querystring';

export const contactService = {
    sendContactUs: (params: any) => {
        let url = '/contact/save';
        //
        // let data = new FormData();
        // data.append('name', params.name);
        // data.append('email', params.email);
        // data.append('message', params.message);

        return axios.post(url, querystring.stringify(params));
    },
}
