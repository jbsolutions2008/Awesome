

let reg = /^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const isValidEmail = (email: string) => reg.test(email);
const validateWhiteSpace = (name: string) => name === '';
export default {
    isValidEmail,
    validateWhiteSpace,
}