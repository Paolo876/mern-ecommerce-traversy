export default (input) => {
    if(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(input)) return true;

    return false
}