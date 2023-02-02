interface Superhero {
  name: string;
  powers: string[];
}

class Superman implements Superhero {
  name = 'Superman';
  powers = ['Volar', 'Vision laser', 'super fuerza'];
}

class Batman implements Superhero {
  name = 'Batman';
  powers = ['Inteligencia', 'Armas', 'Combate'];
}

class WonderWoman implements Superhero {
  name = 'Wonder Woman';
  powers = ['Super fuerza', 'Volar', 'Combate'];
}

class SuperheroFactory {
  static createSuperhero(type: string): Superhero {
    switch (type) {
      case 'Superman':
        return new Superman();
      case 'Batman':
        return new Batman();
      case 'WonderWoman':
        return new WonderWoman();
      default:
        throw new Error(`${type} is not a valid superhero`);
    }
  }
}

const superhero1 = SuperheroFactory.createSuperhero('Superman');
console.log(superhero1.name); // Superman
console.log(superhero1.powers); //['Volar', 'Vision laser', 'super fuerza']

const superhero2 = SuperheroFactory.createSuperhero('Batman');
console.log(superhero2.name); // Batman
console.log(superhero2.powers); // ['Inteligencia', 'Armas', 'Combate'];

const superhero3 = SuperheroFactory.createSuperhero('WonderWoman');
console.log(superhero3.name); // Wonder Woman
console.log(superhero3.powers); //['Super fuerza', 'Volar', 'Combate'];