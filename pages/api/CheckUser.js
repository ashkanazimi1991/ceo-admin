import axios from "axios"
import { MainLink } from "../../components/BaseUrl/BaseUrl"
import { getCookie } from 'cookies-next';

export default function handler(req, res) {
    if (getCookie('token', { req, res })){
        axios.get(`${MainLink}/user_t_d/`, {
            headers: {
                'Authorization': 'Token ' + getCookie('token', { req, res }),
            }
        }).then(response => res.status(200).json(response.data))
    }else{
        res.status(400).json(false)
    }
}
