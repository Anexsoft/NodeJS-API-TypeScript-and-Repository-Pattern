import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';

@route('/')
export class DefaultController {
    @route('/')
    @GET()
    async index(req: Request, res: Response) {
        res.send('Running');
    }
}