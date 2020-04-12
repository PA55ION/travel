
function countdown(countdownDate) {
    const todayDate = new Date();
    const distance = countdownDate- todayDate;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));

    return days;
    
}


export { countdown }