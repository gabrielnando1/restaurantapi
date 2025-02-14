export class MenuEntity {
    constructor(id, name, description, price, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category
    }


    isValidName() {
        if (!(this.name) || !(this.name.trim())) {
            return false;
        }
        return true;
    }

    isValidDescription() {
        if (!(this.description) || !(this.description.trim())) {
            return false;
        }
        return true;
    }
    

    isValidPrice() {
        if (!(this.price) || (this.price <= 0)) {
            return false;
        }
        return true;
    }

    isValidCategory() {
        if (!(this.category) || !(this.category.trim())) {
            return false;
        }
        return Object.values(CategoryEnum).includes(this.category);
    }

}


export const CategoryEnum = {
    STARTER: 'starter',
    MAIN_COURSE: 'main_course',
    DESSERT: 'dessert',
    DRINK: 'drink'
  };
  
  