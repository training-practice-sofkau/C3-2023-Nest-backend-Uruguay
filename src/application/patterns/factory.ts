interface PCPart {
    encender(): string;
}

abstract class PCMaker {

    public abstract corsairFactory(): PCPart;

    public create(): PCPart {
        const product = this.corsairFactory();
        return product
    }
}

class RAMCreator extends PCMaker {

    public corsairFactory(): PCPart {
        return new RAM();
    }
}

class SSDCreator extends PCMaker {
    public corsairFactory(): PCPart {
        return new SSD();
    }
}

class CPUCreator extends PCMaker {
    public corsairFactory(): PCPart {
        return new CPU();
    }
}

class RAM implements PCPart {
    public encender(): string {
        return 'RAM encendida';
    }
}

class SSD implements PCPart {
    public encender(): string {
        return 'SSD encendida';
    }
}

class CPU implements PCPart {
    public encender(): string {
        return 'CPU encendida';
    }
}


function clientCode(pcmaker: PCMaker): PCPart{
    return (pcmaker.create());
}

console.log(clientCode(new RAMCreator()).encender());
console.log(clientCode(new SSDCreator()).encender());
console.log(clientCode(new CPUCreator()).encender());