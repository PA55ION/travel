function validateForm(inputDate) {
    let regex = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/i;
    return regex.test(inputDate)
}

export { validateForm }