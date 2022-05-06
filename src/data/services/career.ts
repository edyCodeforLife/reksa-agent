import axios from 'axios';

export const careerService = {
    sendApplication: (params: any) => {
        let url = '/career/register';
        //
        let data = new FormData();
        data.append('fullName', params.name);
        data.append('email', params.email);
        data.append('description', params.message);
        data.append('cv', params.file);
        data.append('jobCategory', params.jobName);
        data.append('mobilePhone', params.phone);

        return axios.post(url, data);
    },
};
