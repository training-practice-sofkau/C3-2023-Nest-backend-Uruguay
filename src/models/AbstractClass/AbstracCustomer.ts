export abstract class AbstracCustomers {

    private email: string;
    private phone: string;

    constructor(email: string, phone : string) {
        this.email =email;
        this.phone =phone;
    }

    /**
     * Declaracion de metodo abstracto.
     * Nota: Toda clase abstracta debe contener al menos un metodo abstracto.
     * Las clases abstractas no pueden tener instancias de ellas mismas.
     */

    abstract: string
    public metodoAbstracto() {
        
    }

}