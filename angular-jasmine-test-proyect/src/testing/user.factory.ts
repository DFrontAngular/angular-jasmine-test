import { User } from "../app/core/services/user"

export function createMockUsers(overrides? : Partial<User>){
    const defaultItem : User = {
      id: 1,
      name: 'Juan Pérez',
      username: 'juanp',
      email: 'juan@test.com',
      address: {
        street: 'Calle Falsa',
        suite: 'Apt. 123',
        city: 'Madrid',
        zipcode: '28080',
        geo: { lat: '0', lng: '0' }
      },
      phone: '123456789',
      website: 'juan.com',
      company: {
        name: 'EmpresaX',
        catchPhrase: 'Innovando siempre',
        bs: 'tech'
      }
    }

    return {
        ...defaultItem,...overrides
    }
}

