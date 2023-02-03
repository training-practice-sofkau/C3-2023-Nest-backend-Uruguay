export interface AbstractProduct {
    method(param?: any) : void;
}

export class ConcreteProductA implements AbstractProduct {
    method = (param?: any) => {
        return "Create All Account Types";
    }
}

export class ConcreteProductB implements AbstractProduct {
    method = (param?: any) => {
        return "Create All Document Types";
    }
}


export function createProduct(type: string) : AbstractProduct | any {
    if (type === "A") {
        return new ConcreteProductA();
    } else if (type === "B") {
        return new ConcreteProductB();
    }

    return null;
}

export function showFactory() : void {
    var a: AbstractProduct = createProduct("A");
    var b: AbstractProduct = createProduct("B");

    console.log(a.method());
    console.log(b.method());
};