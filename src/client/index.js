import './styles/header.scss';
import './styles/base.scss';
import './styles/main.scss';
import './styles/responsive.scss';
import './styles/form.scss';
import { handleSubmit } from './js/handleSubmit'
import { validateForm } from './js/checkFormInput'
import background from '../assets/background.jpg'

const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY

console.log(validateForm)
console.log(DARKSKY_API_KEY)

export { 
    handleSubmit,
    validateForm
}