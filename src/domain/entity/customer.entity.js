export class CustomerEntity {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    isValidName() {
        if (!(this.name) || !(this.name.trim())) {
            return false;
        }
        return true;
    }

    isValidEMail() {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
        // Retorna true se o email corresponder ao padrão, caso contrário, retorna false
        return regex.test(this.email);
    }
}