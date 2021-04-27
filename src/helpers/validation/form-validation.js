export const validate = (field) => {
    const validate = (field === null || field === "" || field === undefined) ? false : true;
 
    return validate
}