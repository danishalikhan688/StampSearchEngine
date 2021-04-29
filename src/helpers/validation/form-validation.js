export const validate = (field) => {
    const validate = (field === null || field === "" || field === undefined) ? false : true;

    return validate
}
export const validateArray = (field) => {
    const validate = (field === null || field === [] || field === undefined) ? false : true;

    return validate
}
export const validateObject = (fields) => {
    for (const field in fields) {
        if (!validate(fields[field])) {
            return false
        }
    }
    return true
}
export const validateArrayObject = (fields) => {
    for (const field in fields) {
        if (!validateArray(fields[field])) {
            return false
        }
    }
    return true
}