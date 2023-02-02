export interface Strategy {
    execute(): void;
}

export class Context {
    private strategy: Strategy;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    public executeStrategy(): void {
        this.strategy.execute();
    }
}



export class ConcreteStrategy1 implements Strategy {
    public execute(): void {
        
        console.log("Create Basic Account Types");
        
    }
} 

export class ConcreteStrategy2 implements Strategy {
    public execute(): void {
        console.log("Create Basic Document Types");
    }
} 

export class ConcreteStrategy3 implements Strategy {
    public execute(): void {
        console.log("Do some other stuff!");
    }
} 

export function showStrategy() : void {
    var context: Context = new Context(new ConcreteStrategy1());
    context.executeStrategy();

    context = new Context(new ConcreteStrategy2());
    context.executeStrategy();

    context = new Context(new ConcreteStrategy3());
    context.executeStrategy();


}