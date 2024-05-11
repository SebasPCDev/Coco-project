import ICompaniesErrorInfo from "../types/companiesFormErrorInterface";
import ICompaniesInfo from "../types/companiesFormInterface";

export default function companyValidation(values: ICompaniesInfo): ICompaniesErrorInfo {
    let errors: ICompaniesErrorInfo = {};
    if (!values.name) {
        errors.name = "El nombre es requerido";        
    } else if (!/^(?=\S)(?!.*[^\x20-\x7E])(?=.{3,50}$)[a-zA-Z ]+$/.test(values.name)) {
        errors.name = "El nombre es inválido";
    } else if (!values.lastname) {
        errors.lastname = "El apellido es requerido";
    } else if (!/^(?=\S)(?!.*[^\x20-\x7E])(?=.{3,50}$)[a-zA-Z ]+$/.test(values.lastname)) {
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
    /* Implementar Agregar país y ciudades */    
    /* } else if (!values.country || values.country.length > 50) {
        errors.country = "Country is required and must be at most 50 characters";
    } else if (!values.city || values.city.length > 50) {
        errors.city = "City is required and must be at most 50 characters";*/
    /* Implementar array de horas que Sebas pasó */
    } else if (!values.quantityBeneficiaries && values.quantityBeneficiaries !== 0) {
        errors.quantityBeneficiaries = "Es necesario agregar la cantidad de beneficiarios";
    } else if (isNaN(values.quantityBeneficiaries) || values.quantityBeneficiaries < 0) {
        errors.quantityBeneficiaries = "Es necesario que al menos tengas un beneficiario";
    } else if (!values.businessSector) {
        errors.businessSector = "Es necesario el sector";
    } else if (!/^.{3,50}$/.test(values.businessSector)) {
        errors.businessSector = "Es necesario el sector";
    } else if (!values.size && values.size !== 0) {
        errors.size = "Es necesario el tamaño";
    } if (values.message && values.message.length > 255) {
        errors.message = "Message must be at most 255 characters long";
    }
    return errors;    
}