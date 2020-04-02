import './styles/header.scss';
import './styles/base.scss';
import './styles/main.scss';
import './styles/responsive.scss';
import './styles/form.scss';
import { handleSubmit } from './js/handleSubmit'
import { validateForm } from './js/checkFormInput'
import background from '../assets/background.jpg'

console.log(validateForm)



export { 
    handleSubmit,
    validateForm
}