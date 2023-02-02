import { DocumentTypeEntity } from '../../persistence/entities/document-type.entity';
import { DocumentTypeFactoryI, DocuemntTypeFactory } from '../../FactoryPattern/DocumentType/document-type-factory';
export interface DocumentTypeStrategy {
    assignAccountType(): DocumentTypeEntity;
}

export class NationalIdStrategy implements DocumentTypeStrategy {

    assignAccountType(): DocumentTypeEntity {
        const documentTypeFactory = new DocuemntTypeFactory();
        return documentTypeFactory.createAccountType({name: 'National ID'});
    }

}

export class PassportStrategy implements DocumentTypeStrategy {

    assignAccountType(): DocumentTypeEntity {
        const documentTypeFactory = new DocuemntTypeFactory();
        return documentTypeFactory.createAccountType({name: 'Passport ID'});
    }

}

export class DocumentTypeContext {
    private strategy: DocumentTypeStrategy;

    constructor(strategy: DocumentTypeStrategy) {
        this.strategy = strategy;
    }

    assignAccountTypeStrategy(): DocumentTypeEntity {
        return this.strategy.assignAccountType();
    }
}