import { IController, IRequest, IResponse } from "../interfaces/IController";

export class ListLeadsController implements IController {
    async handle(request: IRequest): Promise<IResponse> {
        console.log(request);
        return {
            statusCode: 200,
            body: {
                leads: [
                    { id: "1", name: "Zezinho" },
                    { id: "2", name: "Fernandinho" },
                    { id: "3", name: "Carlinhos" },
                ],
            },
        };
    }
}