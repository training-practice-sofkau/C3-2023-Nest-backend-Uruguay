interface Ataque {
    hacer(): string[]
}

class AK47 implements Ataque {
    public hacer(): string[]{
        return ['disparar'];
    }
}

class BolaDeFuego implements Ataque {
    public hacer(): string[]{
        return ['quemar'];
    }
}

class CadaSegundo {

    private daño: Ataque;

    constructor(daño: Ataque){
        this.daño = daño;
    }

    public setDaño(daño: Ataque){
        this.daño = daño;
    }

    public aplicardaño(): void{
        console.log(this.daño.hacer());
    }

}

const segundo = new CadaSegundo(new AK47());
segundo.aplicardaño()
segundo.setDaño(new BolaDeFuego());
segundo.aplicardaño()