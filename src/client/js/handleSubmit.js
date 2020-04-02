//Global variable 
const submit = document.getElementById('search-button');


export function handleSubmit(e) {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value
    console.log(location)
    console.log(date)

}

submit.addEventListener('click', handleSubmit)

