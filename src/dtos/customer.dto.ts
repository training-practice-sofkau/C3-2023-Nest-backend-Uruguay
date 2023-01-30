export class CustomerDto {
   
    id = uuid();
   
    documentType: DocumentTypeEntity;
   
    document: string;
   
    fullName: string;
    
    email: string;
    
    phone: string;
    
    password: string;
    
    avatarUrl?: string;

}