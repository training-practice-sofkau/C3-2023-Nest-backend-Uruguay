//Clase abstracta nos permite definir un concepto abstracto, una clase abstracta por si misma no identifica algo concreto
//No puede ser instanciada directamente
//Definimos una clase Base en la jerarquía de clases 

export abstract class Base{
    abstract register(): void;
    abstract update(): void;
    abstract delete(): void;
    abstract findAll(): void;
    abstract findOneById(): void;
}