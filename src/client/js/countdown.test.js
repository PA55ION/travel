import { countdown } from './countdown'

test('if countdown function return number of days from user input', () => {
    const countdownDate = new Date('04/28/2020')
    const todayDate = new Date();
    const distance = countdownDate - todayDate;
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // return days
    const result = countdown(countdownDate) 
    expect(result).toBe(days);
});
