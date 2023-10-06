import { APIGatewayProxyHandler } from 'aws-lambda'
import CardRepository from '../../repository/cardRepository'

import { validateToken } from '../../util/validation';

export const getCardByToken: APIGatewayProxyHandler = async (event) => {

    try {
        const token = event.headers.token;
        validateToken(token);
        const cardRepository = new CardRepository();

        const card = await cardRepository.getCardByToken(token || '')

        return {
            statusCode: 200,
            body: JSON.stringify({ card })
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: error })
        }
    }
}

