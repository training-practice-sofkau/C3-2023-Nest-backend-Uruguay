interface SuperHeroeStrategy {
  attack(heroeName: string): string;
}

class UseSuperPoder implements SuperHeroeStrategy {
  attack(heroeName: string): string {
    return `${heroeName} ataca usando un super poder!`;
  }
}

class UseArma implements SuperHeroeStrategy {
  attack(heroeName: string): string {
    return `${heroeName} ataca usando un arma!`;
  }
}

class UseObjeto implements SuperHeroeStrategy {
  attack(heroeName: string): string {
    return `${heroeName} ataca usando un objeto!`;
  }
}


class SuperHeroe {
  private strategy: SuperHeroeStrategy;
  
  constructor(strategy: SuperHeroeStrategy) {
    this.strategy = strategy;
  }

  setAttackStrategy(strategy: SuperHeroeStrategy) {
    this.strategy = strategy;
  }

  attack(): string {
    return this.strategy.attack(this.attack.name);
  }


}

const spiderman = new SuperHeroe(new UseSuperPoder());
console.log(spiderman.attack()); // spiderman ataca usando super poder

spiderman.setAttackStrategy(new UseArma());
console.log(spiderman.attack()); // spiderman ataca usando arma

spiderman.setAttackStrategy(new UseObjeto());
console.log(spiderman.attack()); // spiderman ataca usando un objeto 