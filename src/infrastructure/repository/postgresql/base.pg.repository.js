import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('postgres://postgres:123456@localhost:5432/postgres') 

export class BasePgRepository {
    
    implementsInterface(obj, interfaceObj) {
        for (const method in interfaceObj) {
            if (!(method in obj) || 
                typeof obj[method] !== 'function') {
                return false;
            }
        }
        return true;
    }

    define() {
        throw TypeError('not defined');
    }
}

export function Classes(bases) {
    class Bases {
      constructor() {
        bases.forEach(base => Object.assign(this, new base()));
      }
    }
    bases.forEach(base => {
      Object.getOwnPropertyNames(base.prototype)
      .filter(prop => prop != 'constructor')
      .forEach(prop => Bases.prototype[prop] = base.prototype[prop])
    })
    return Bases;
  }