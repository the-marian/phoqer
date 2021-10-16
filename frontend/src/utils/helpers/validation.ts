// validation regex
export const mailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[_#?!@$%^&*-]).{6,}$/;
// check if string is valid number
export const numberValidation = (text: string): boolean => {
    if (text === '') return false;
    if (/\D/.test(text.replace(/\./, ''))) return true;
    return !+text;
};
// check empty fields in object (useful for form validation)
export const isEmpty = <T>(value: T): [string, string][] =>
    Object.entries(value).filter((item: [string, string]): boolean => !item[1].trim());
