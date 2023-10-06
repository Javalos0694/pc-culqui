import db from "../database"
import { QueryTypes } from 'sequelize'
import ICard from "../models/interfaces/ICard";
import Card from "../models/Card";

class CardRepository {
    constructor() {
        this.getConnection();
    }

    async getConnection() {
        await db.authenticate();
    }

    async getCardByToken(token: string): Promise<ICard> {
        try {
            const query = 'SELECT * FROM GET_CARDINFOBYTOKEN(:token)';

            const [cards, metadata] = await db.query(query, {
                replacements: {
                    token: token
                },
                type: QueryTypes.RAW
            })

            if (!cards || cards.length == 0) throw "Card has not found"

            const card: ICard = cards[0] as ICard;
            if (card.deleted) throw "Card token has expired"

            return card;

        } catch (error) {
            throw error;
        }
    }

    async saveCard(card: ICard): Promise<number> {
        try {

            const { cardnumber, expirationmonth, expirationyear, cvv, emailuser, token } = card

            const cardSaved = await Card.create({
                card_number: cardnumber,
                cvv: cvv,
                expiration_month: expirationmonth,
                expiration_year: expirationyear,
                email: emailuser,
                token: token
            })

            if (cardSaved.dataValues.card_number) return 1;
            return 0;

        } catch (error) {
            throw error;
        }
    }
}

export default CardRepository