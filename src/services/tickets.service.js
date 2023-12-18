import{ticketsDao} from "./../constants/index.js"

export class ticketsService{
    static async createTicket(ticketInfo){
        return await ticketsDao.createTicket(ticketInfo);
    };
}