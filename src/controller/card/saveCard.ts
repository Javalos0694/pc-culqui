import { APIGatewayProxyHandler } from 'aws-lambda';
import ICard from '../../models/interfaces/ICard';
import CardRepository from '../../repository/cardRepository'

import { generateToken } from '../../util/security';
import { validateBodyRequest } from '../../util/validation';

export const saveCardApi: APIGatewayProxyHandler = async (event) => {
    try {
        const { card_number, cvv, email, expiration_month, expiration_year } = JSON.parse(event.body || '')

        const card: ICard = {
            cardnumber: card_number,
            cvv,
            emailuser: email,
            expirationmonth: expiration_month,
            expirationyear: expiration_year,
            token: generateToken()
        }

        validateBodyRequest(card);

        const cardRepository = new CardRepository();
        const saved = await cardRepository.saveCard(card);

        if (saved == 0) return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" })
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ msg: "Card saved", token: card.token })
        }

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Contact admin" })
        }
    }
}