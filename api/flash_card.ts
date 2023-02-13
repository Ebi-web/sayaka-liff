import axios from "axios";
import type {Liff} from "@line/liff";

const path = '/flash-cards';
const endpoint = process.env.API_ENDPOINT + path;

type CreateRequest = {
    front: string,
    back: string
}

export class FlashCardService {
    liff: Liff;

    constructor(args: { liff: Liff}) {
        this.liff = args.liff;
    }

    create(args: { front: string, back: string }) {
        return axios.post(`${endpoint}`, createCreateRequest(args), {
            headers: {
                Authorization: `Bearer ${this.liff.getIDToken()}`
            }
        });
    }

    index() {
        return axios.get(`${endpoint}`, {
            headers: {
                Authorization: `Bearer ${this.liff.getIDToken()}`
            }
        });
    }
}

function createCreateRequest(args: { front: string, back: string }): CreateRequest {
    return {
        front: args.front,
        back: args.back
    }
}