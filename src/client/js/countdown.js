
function countdown(departure) {
    const todayDate = new Date().getTime();
    const distance = departure- todayDate;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));

    return days
    
}


export { countdown }