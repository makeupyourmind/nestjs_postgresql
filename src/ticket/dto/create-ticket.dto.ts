export class CreateTicketDto{
    hall_id: number;
    
    user_id: number;

    from: Date;

    to: Date;

    title: string;
}