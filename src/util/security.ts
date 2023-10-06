export const generateToken = (): string => {
    const pattern = /^[a-zA-Z0-9]{16}$/;

    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    while (!pattern.test(token)) {
        token = '';

        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters.charAt(randomIndex);
        }
    }

    return token
}