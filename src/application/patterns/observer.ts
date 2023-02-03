interface Client {
    name: string;
}

class News {
    private readonly database: Array<Client>;

    constructor(){
      this.database = new Array<Client>();
    }

    public subscribe(objeto: Client){
        this.database.push(objeto);
    }

    public unsuscribe(objeto: Client){
        const index = this.database.findIndex( (data) => data == objeto );
        this.database.splice(index, 1);
    }

    public notify(){
        this.database.forEach((suscriber) => {
            console.log(suscriber.name + ": new notification!")
        });
    }
}

class Jose implements Client {
    name = "Jose";
}

class Eva implements Client {
    name = "Eva";
}

class Josefina implements Client {
    name = "Josefina";
}

const channel = new News();

channel.subscribe(Jose);
channel.subscribe(Eva);
channel.subscribe(Josefina);
channel.unsuscribe(Eva);
channel.notify();