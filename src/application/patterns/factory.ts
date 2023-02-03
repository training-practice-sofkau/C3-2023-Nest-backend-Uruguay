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

class GPUCreator extends PCMaker {
    public corsairFactory(): PCPart {
        return new GPU();
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

class GPU implements PCPart {
    public encender(): string {
        return 'GPU encendida';
    }
}


function crear(pcmaker: PCMaker): PCPart{
    return (pcmaker.create());
}

console.log(crear(new RAMCreator()).encender());
console.log(crear(new SSDCreator()).encender());
console.log(crear(new CPUCreator()).encender());
console.log(crear(new GPUCreator()).encender());