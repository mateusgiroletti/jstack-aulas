export function isEmailValid(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

export function formatPhone(phoneNumber) {
    return phoneNumber
        .replace(/\D/g, "")
        .replace(/^(\d{2})\B/, "($1) ")
        .replace(/(\d{1})?(\d{4})(\d{4})/, "$1$2-$3");
}

export function delay(milliseconds = 500) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}