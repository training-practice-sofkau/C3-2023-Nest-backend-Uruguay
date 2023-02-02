interface ICiudad {
    nombreCiudad(): void;
}

class Madrid implements ICiudad {
    nombreCiudad(): void {
        console.log("Madrid");
    }
}

class Barcelona implements ICiudad {
    nombreCiudad(): void {
        console.log("Barcelona");
    }
}

class Valencia implements ICiudad {
    nombreCiudad(): void {
        console.log("Valencia");
    }
}

class FactoryCiudad {
    static readonly MADRID: string = "Madrid";
    static readonly BARCELONA: string = "Barcelona";
    static readonly VALENCIA: string = "Valencia";

    static create(entity: string): ICiudad {
        switch (entity) {
            case FactoryCiudad.MADRID:
                return new Madrid();
            case FactoryCiudad.BARCELONA:
                return new Barcelona();
            case FactoryCiudad.VALENCIA:
                return new Valencia();
            default:
                throw new Error("Ciudad no válida");
        }
    }
}

const ciudad: ICiudad = FactoryCiudad.create(FactoryCiudad.MADRID);
ciudad.nombreCiudad();