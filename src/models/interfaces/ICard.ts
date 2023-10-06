interface ICard {
    cardnumber: number,
    cvv?: number,
    expirationmonth: string,
    expirationyear: string,
    emailuser: string,
    deleted?: boolean,
    token?: string
}

export default ICard;