import './styles/header.scss';
import './styles/base.scss';
import './styles/main.scss';
import './styles/responsive.scss';
import './styles/form.scss';
import { handleSubmit } from './js/handleSubmit'
import { validateForm } from './js/checkFormInput'
import { countdown } from './js/countdown'
// import background from '../media/background.jpg'
import './media/'



console.log(validateForm)



export { 
    handleSubmit,
    validateForm,
    countdown
}