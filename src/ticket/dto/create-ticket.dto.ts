import { IsBiggerThan } from '../../../shared/customValidation/customTicketValidation';
export class CreateTicketDto{
    hall_id: number;
    
    user_id: number;

    from: Date;
    
    @IsBiggerThan("from", {
        message: "Param *To* must be bigger than the *from*"
    })
    to: Date;

    title: string;
}