import { IsBiggerThan } from '../../../shared/customValidation/customTicketValidation';

export class FindByParamsValidation {

  from: string;

  @IsBiggerThan("from", {
    message: "Param *To* must be bigger than the *from*"
  })
  to: string;
}