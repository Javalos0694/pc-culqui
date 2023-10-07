import saveCardRequest from "@/models/services/Request/saveCardRequest";
import getCardResponse from "@/models/services/Response/getCardResponse";
import axios, { AxiosRequestConfig } from "axios";

class CardService {
    private url: string

    constructor() {
        // this.url = "http://localhost:3000/card"
        this.url = process.env.VUE_APP_BASE_URL
    }

    async saveCard(request: saveCardRequest): Promise<string> {
        const config: AxiosRequestConfig = {
            url: this.url,
            method: 'POST',
            data: request,
        }

        const response = await axios(config);
        const data = await response.data;

        if (!data.token) return '';
        return data.token;
    }

    async getCard(token: string): Promise<getCardResponse> {
        const config: AxiosRequestConfig = {
            url: this.url,
            method: 'GET',
            responseType: 'json',
            headers: {
                token: token
            }
        }
        const response = await axios(config);
        const data = await response.data;

        if (!data.card) throw "Fail get card"

        return data.card as getCardResponse
    }
}

export default CardService;