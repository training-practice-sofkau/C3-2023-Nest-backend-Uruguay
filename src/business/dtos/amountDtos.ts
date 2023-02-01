import {  IsNumber } from 'class-validator';

export class baseDto {
  amount: number;
  state: boolean;
  accountTypeId: string
  soft: boolean
}