
import { DocumentTypeModel } from "../document-type-model/document-type-model";
import { AbstracCustomers } from "../AbstractClass/AbstracCustomer";
import { v4 as uuid } from 'uuid';


export class CustomerModel extends AbstracCustomers{
   
    ids = uuid();
    private id : number;
    private documentType: DocumentTypeModel;
    private document: string;
    private fullName: string;
    private password: string;
    private avatarUrl?: string ;
    private state = true;
    private daletedAt?: Date | number ;
    
    
    constructor(email: string, phone : string, id : number, documentType : DocumentTypeModel,
                document : string, fullname : string, password :string , avatarrUrl :string, state : boolean,
                 daletedAt : Date) {
        super(email,phone);
        this.id = id;
        this.documentType = documentType;
        this.document = document;
        this.fullName = fullname;
        this.password = password;
        this.avatarUrl = avatarrUrl;
        this.state = state;

    }

   
    public metodoAbstracto() {
        console.log('Hola, soy un metodo abstracto!')
    }

    algunMetodo() {
        console.log('Hola yo soy el metodo declarado en la interfaz iCustomer!')   
    }


}


