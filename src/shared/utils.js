export function validateEmail(email) {
    // eslint-disable-next-line no-useless-escape
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    var re = /(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    return re.test(String(password));
}

export function validateCnicNo(cnicNo) {
    var re = /[0-9]{5}[-]{1}[0-9]{7}[-]{1}[0-9]{1}/
    return re.test(String(cnicNo))
}

export function validateContactNo(contactNo) {
    var re = /[0-9]{4}[-]{1}[0-9]{7}/
    return re.test(String(contactNo))
}