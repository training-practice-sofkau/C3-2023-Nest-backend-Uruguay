
interface AccountStrategy {
  calculateInterest(balance: number): number;
}

//Crear las clases concretas para cada estrategia
class CurrentAccount implements AccountStrategy {
  calculateInterest(balance: number): number {
    return balance * 0.01;
  }
}

class SavingsAccount implements AccountStrategy {
  calculateInterest(balance: number): number {
    return balance * 0.05;
  }
}

//Usar la estrategia en la clase BankAccount
class BankAccount {
  private balance: number;
  private strategy: AccountStrategy;

  constructor(strategy: AccountStrategy) {
    this.strategy = strategy;
  }

  deposit(amount: number) {
    this.balance += amount;
  }

  withdraw(amount: number) {
    this.balance -= amount;
  }

  getInterest(): number {
    return this.strategy.calculateInterest(this.balance);
  }
}

//Usar la clase BankAccount
const currentAccount = new BankAccount(new CurrentAccount());
currentAccount.deposit(1000);
console.log(currentAccount.getInterest()); // 10

const savingsAccount = new BankAccount(new SavingsAccount());
savingsAccount.deposit(1000);
console.log(savingsAccount.getInterest()); // 50



