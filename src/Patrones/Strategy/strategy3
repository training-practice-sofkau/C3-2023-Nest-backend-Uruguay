interface Comida {
  tipo(platoName: string): string;
}

class Vegetariana implements Comida {
    tipo(platoName: string): string {
    return `${platoName} Comida Vegetariana`;
  }
}

class Vegana implements Comida {
    tipo(platoName: string): string {
    return `${platoName} Comida Vegana`;
  }
}

class Carnivora implements Comida {
    tipo(platoName: string): string {
    return `${platoName} Comida Carnivora`;
  }
}


class Comidas {
  private strategy: Comida;
  
  constructor(strategy: Comida) {
    this.strategy = strategy;
  }

  setAttackStrategy(strategy: Comida) {
    this.strategy = strategy;
  }

  tipo(): string {
    return this.strategy.tipo(this.tipo.name);
  }


}

const Ensalada = new Comidas(new Vegana());
console.log(Ensalada.tipo()); // Comida Vegana

const EnsaladaConHuevo = new Comidas(new Vegetariana());
EnsaladaConHuevo.setAttackStrategy(new Vegetariana());
console.log(EnsaladaConHuevo.tipo()); // Comida Vegetariana

const EnsaladaConPollo = new Comidas(new Carnivora());
EnsaladaConPollo .setAttackStrategy(new Carnivora());
console.log(EnsaladaConPollo .tipo()); // Comida Carnivora 