import { BadRequestException, ForbiddenException, HttpException, Injectable } from '@nestjs/common';

import { PaginationModel } from '../../models';
import { AccountEntity, AccountTypeEntity } from '../../persistence/entities';
import { AccountRepository, AccountTypeRepository } from '../../persistence/repositories';
import { AccountDto } from '../../dtos';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly accountTypeRepository: AccountTypeRepository) {}

  /**
   * Crear una cuenta
   */
  createAccount(account: AccountDto): AccountEntity {
    let newAccount = new AccountEntity();

    newAccount = {
      ...newAccount,
      ...account
    };

    return this.accountRepository.register(newAccount);
  }

  /**
   * Obtener el balance de una cuenta
   */
  getBalance(accountId: string): number {
    const account = this.accountRepository.findOneById(accountId);
    return account.balance;
  }

  /**
   * Agregar balance a una cuenta
   */
  addBalance(accountId: string, amount: number): void {
    try {
      if(amount <= 0) throw new BadRequestException('The amount must be greater than 0');

      let accountUpdated = this.accountRepository.findOneById(accountId);
      accountUpdated.balance += amount;
      this.accountRepository.update(accountId, accountUpdated);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /**
   * Remover balance de una cuenta
   */
  removeBalance(accountId: string, amount: number): void {
    try {
      if (this.verifyAmountIntoBalance(accountId, amount)) {
        let accountUpdated = this.accountRepository.findOneById(accountId);
        accountUpdated.balance -= amount;
        this.accountRepository.update(accountId, accountUpdated);
      }
      else {
        throw new ForbiddenException('The amount to remove cannot be greater than the balance');
      }
      
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /**
   * Verificar la disponibilidad de un monto a retirar en una cuenta
   */
  verifyAmountIntoBalance(accountId: string, amount: number): boolean {
    if(this.accountRepository.findOneById(accountId).balance >= amount) {
      return true;
    }
    return false;
  }

  /**
   * Obtener el estado de una cuenta
   */
  getState(accountId: string): boolean {
    return this.accountRepository.findOneById(accountId).state;
  }

  /**
   * Cambiar el estado de una cuenta
   */
  changeState(accountId: string, state: boolean): void {
    try {
      let accountUpdated = this.accountRepository.findOneById(accountId);
      accountUpdated.state = state;
      this.accountRepository.update(accountId, accountUpdated);

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /**
   * Obtener el tipo de cuenta de una cuenta
   */
  getAccountType(accountId: string): AccountTypeEntity {
    return this.accountRepository.findOneById(accountId).accountType;
  }

  /**
   * Cambiar el tipo de cuenta a una cuenta
   */
  changeAccountType(
    accountId: string,
    accountTypeId: string,
  ): AccountTypeEntity {
    try {
      let accountUpdated = this.accountRepository.findOneById(accountId);
      let newAccountType = this.accountTypeRepository.findOneById(accountTypeId);
      accountUpdated.accountType = newAccountType;

      this.accountRepository.update(accountId, accountUpdated);

      return newAccountType;

    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  /**
   * Borrar una cuenta
   */
  deleteAccount(accountId: string): void {
    this.accountRepository.delete(accountId);
  }
  
  /**
   * Borrar una cuenta de forma lógica
   */
  softDeleteAccount(accountId: string): void {
    const accountUpdated = this.accountRepository.findOneById(accountId);
    accountUpdated.deletedAt = Date.now();
    this.accountRepository.update(accountId, accountUpdated);
  }

  /**
   * Obtener todas las cuentas
   */
  findAllAccounts(pagination?: PaginationModel): AccountDto[] {
    const accounts = this.accountRepository.findAll();
    let accountsPaginated: AccountDto[] =[];

    if(pagination) {
      return accountsPaginated = accounts.slice(pagination.offset, pagination.limit);
    }
    return accounts;
  }

  /**
   * Obtener una cuenta por id
   */
  findOneAccountById(id: string): AccountDto {
    const account = this.accountRepository.findOneById(id);
    return account;
  }

  /**
   * Actualizar información de una cuenta
   */
  updatedAccount(id: string, account: AccountDto): AccountEntity {
    return this.accountRepository.update(id, account);
  }
}