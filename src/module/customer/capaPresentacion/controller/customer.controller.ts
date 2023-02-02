import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from '../../capaLogicaDeNegocio/service/customer.service';
import { CustomerEntity } from '../../capaDeDato/entity/customer.entity';
import { CustomerDto } from '../../capaLogicaDeNegocio/dto';
import { DocumentTypeEntity } from '../../capaDeDato/entity';
import { DocumentTypeDto } from '../../capaLogicaDeNegocio/dto/documentType.dto';

@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService : CustomerService ){}


    @Post("/create")//HECHO
    createCustomer(@Body() customer : CustomerDto){
        return this.customerService.createCustomer(customer);
    }

    @Put(`/update/:id`) //HECHO
    updatedCustomer(@Param(`id`) id : string,
    @Body() newCustomer : CustomerDto)
    :CustomerEntity{
        return this.customerService.updatedCustomer(id,newCustomer);
    }

    @Get(`/getInfo/:id`) // HECHO
    getCustomerInfo(@Param(`id`) customerId: string): CustomerEntity {
        return this.customerService.getCustomerInfo(customerId);
    }

    @Post(`/document-type/create`)
    createDocumentType(@Body()documentType : DocumentTypeDto):DocumentTypeEntity{
        return this.customerService.createDocumentType(documentType);
    }

    @Get(`/all`)//Hay que pasarle por parametro con pagination ,HECHO SIN EL PAGINATION
    findAll(): CustomerEntity[] {
        return this.customerService.findAll();
    }
    @Get(`/document-type/find-all`)//Hay que pasarle por parametro con pagination ,HECHO SIN EL PAGINATION
    findAllDocumentType(): DocumentTypeEntity[] {
        return this.customerService.findAllDocumentType();
    }

    @Get(`/document-type/find-id/:id`)//Hay que pasarle por parametro con pagination ,HECHO SIN EL PAGINATION
    findDocumentType(@Param(`id`) id : string): DocumentTypeEntity {
        return this.customerService.findByIdDocumentType(id);
    }

    @Get(`/credeciales/:email/:password`)
    findOneByEmailAndPassword(@Param("email")email: string,@Param("password")password: string):CustomerEntity{
        return this.customerService.findOneByEmailAndPassword(email,password);   
    }


    @Delete(`/deleteSof/:id/:soft`)
    deleteCustomerSof(@Param(`id`)customerId: string,
    @Param(`soft`) soft?: boolean): void {
        return this.customerService.deleteCustomer(customerId,soft);
    }
    
    @Delete(`/deleteHard/:id`)
    deleteCustomerHard(@Param(`id`)customerId: string): void {
        return this.customerService.deleteCustomer(customerId);

    }

    @Put(`/changeState/:customerId/:state`)
    changeState(@Param(`customerId`)customerId: string ,
    @Param(`state`)state: boolean): void {
        return this.customerService.changeState(customerId,state);
    }



    @Get(`/unsubscribe/:id`)
    unsubscribe(@Param(`id`) id: string): boolean {
        return this.customerService.unsubscribe(id);
    }

    

    
   

    
  

    







}
