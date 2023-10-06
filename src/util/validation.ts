import ICard from "../models/interfaces/ICard";

export const validateToken = (token?: string): boolean => {
    try {
        const pattern = /^[a-zA-Z0-9]{16}$/;

        if (!token) throw "Token is require"
        if (token.length < 16) throw "Invalid token"
        if (!pattern.test(token)) throw "Invalid token"

        return true;

    } catch (error) {
        throw error;
    }
}

const validateCardNumber = (cardNumber: number): boolean => {
    const sanitizedInput = cardNumber.toString().replace(/\D/g, '');

    let checksum = 0;
    let doubleDigit = false;

    for (let i = sanitizedInput.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedInput.charAt(i), 10);

        if (doubleDigit) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        checksum += digit;
        doubleDigit = !doubleDigit;
    }

    return checksum % 10 === 0;
}

const validateCvv = (cvv: number): boolean => {
    const pattern = /^[0-9]{3,4}$/
    if (!pattern.test(cvv.toString()))
        return false;

    return true
}

const validateExpirationYear = (expiration_year: string): boolean => {
    const pattern = /^[0-9]{4}$/
    if (!pattern.test(expiration_year))
        return false

    const year = Number.parseInt(expiration_year);
    const current_year = new Date(Date.now()).getFullYear();
    const year_limit_max = current_year + 5;
    const year_limit_min = current_year - 5;

    if (year < year_limit_min || year > year_limit_max)
        return false;

    return true;
}

const validateExpirationMonth = (expiration_month: string): boolean => {
    const pattern = /^[0-9]{1,2}$/

    if (!pattern.test(expiration_month))
        return false;

    const monthNumber = Number.parseInt(expiration_month);
    if (monthNumber < 1 || monthNumber > 12)
        return false;

    return true;
}

export const validateBodyRequest = (body: ICard): boolean => {
    try {
        const { cardnumber, emailuser, expirationmonth, expirationyear, cvv } = body;

        if (!validateCardNumber(cardnumber))
            throw "Invalid card"

        if (!validateExpirationMonth(expirationmonth))
            throw "Invalid expiration month"

        if (!validateCvv(cvv || 0))
            throw "Invalid CVV"

        if (!validateExpirationYear(expirationyear))
            throw "Invalid expiration year"

        return true;

    } catch (error) {
        throw error;
    }
}