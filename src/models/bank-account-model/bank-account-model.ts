export abstract class BankAccountModel {

    
    acc_id : number;
    customer_id : number;
    type_Account_id : number;
    balance: number;
    daletedAt?: Date | number ;
    
    
    algunMetodoAbstracto() {
        throw new Error("Esto es un metodo abstracto");
    }



}
