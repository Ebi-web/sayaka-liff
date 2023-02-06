import axios from "axios";
import {API_ENDPOINT} from "./api";

const path = '/users';
const endpoint = API_ENDPOINT + path;

type RegisterRequest = {
    access_token: string
}

export class UserService {
    static register(access_token: string) {
        return axios.post(`${endpoint}/register`, createRegisterRequest(access_token));
    }
}

function createRegisterRequest(access_token: string): RegisterRequest {
    return {
        access_token: access_token
    }
}