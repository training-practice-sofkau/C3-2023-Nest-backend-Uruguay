import { IGeneral } from '../interfaces/IGeneral.interface';

export abstract class GeneralCRUD implements IGeneral{
    id: string;
    deletedAt: number | Date | null;

    register(entity: IGeneral): IGeneral {
        throw new Error('This method is not implemented');
      }
    
    update(id: string, entity: IGeneral): IGeneral {
        throw new Error('This method is not implemented');
      }
    
    delete(id: string, soft?: boolean): void {
        throw new Error('This method is not implemented');
      }
    
    findAll(): IGeneral[] {
        throw new Error('This method is not implemented');
      }
    
    findOneById(id: string): IGeneral {
        throw new Error('This method is not implemented');
      }
}