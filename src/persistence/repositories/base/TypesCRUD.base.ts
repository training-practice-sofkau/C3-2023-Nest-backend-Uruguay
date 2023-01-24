import { ITypes } from "../interfaces/ITypes.interface";
import { GeneralCRUD } from './GeneralCRUD.base';

export abstract class TypesCRUD extends GeneralCRUD implements ITypes {
    name: string;
    state: boolean;
    constructor(){
        super();
    }
}