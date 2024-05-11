import ICoworkingsErrorInfo from "../types/coworkingFormErrorInterface";
import ICoworkingsInfo from "../types/coworkingsFormInterface";

export default function coworkingValidation(values: ICoworkingsInfo): ICoworkingsErrorInfo {    
    let errors: ICoworkingsErrorInfo = {};
        if (!values.name) {
            errors.name = "El nombre es requerido";        
        } else if (!/^(?=\S)(?!.*[^\x20-\x7E])(?=.{2,50}$)[a-zA-Z ]+$/.test(values.name)) {
            errors.name = "El nombre es inválido";
        } else if (!values.lastname) {
            errors.lastname = "El apellido es requerido";
        } else if (!/^(?=\S)(?!.*[^\x20-\x7E])(?=.{2,50}$)[a-zA-Z ]+$/.test(values.lastname)) {
            errors.lastname = "El apellido es inválido";
        } else if (!values.phone) {
            errors.phone = "El teléfono es requerido";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "El correo es requerido";
        } else if (!/^\w{1,15}$/.test(values.identification)) {
            errors.identification = "La identificación es inválida";
        } else if (!/^.{5,50}$/.test(values.position)) {
            errors.position = "La posición debe tener entre 5 y 50 caracteres";
        } else if (!/^.{3,50}$/.test(values.companyName)) {
            errors.companyName = "El nombre de la empresa debe tener entre 3 y 50 caracteres";
        } else if (!/\S+@\S+\.\S+/.test(values.companyEmail)) {
            errors.companyEmail = "El correo de la empresa es requerido";
        } else if (!values.companyPhone) {
            errors.companyPhone = "El teléfono de la empresa es requerido";
        } else if (!/^.{5,255}$/.test(values.address)) {    
            errors.address = "La dirección debe tener entre 5 y 255 caracteres";
        } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(values.website)) {
            errors.website = "El sitio web es inválido";
        /* Implementar array de horas que Sebas pasó */    
        } else if (!values.open) {
            errors.open = "La hora de apertura es requerida";
        /* Implementar array de horas que Sebas pasó */      
        } else if (!values.close) {
            errors.close = "La hora de cierre es requerida";
        } else if (values.capacity <= 0) {
            errors.capacity = "La capacidad debe ser mayor a 0";
        } if (values.message && values.message.length > 255) {
            errors.message = "Message must be at most 255 characters long";
        }
        return errors; 
}