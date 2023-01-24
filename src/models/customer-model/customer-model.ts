import { iCustomer } from "src/Interfaces/iCustomer";
import { DocumentTypeModel } from "../document-type-model/document-type-model";

export class CustomerModel implements iCustomer{
   

    id : number;
    documentType: DocumentTypeModel;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string ;
    state = true;
    daletedAt?: Date | number ;
    
    
    algunMetodo() {
        throw new Error("Method not implemented.");
    }


}






