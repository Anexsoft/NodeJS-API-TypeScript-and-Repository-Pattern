import { Request, Response } from 'express';
import { route, POST } from 'awilix-express';
import { IdentityService } from '../services/identity.service';
import { BaseController } from '../common/controllers/base.controller';
import { UserCreateDto } from '../dtos/user.dto';

@route('/identity')
export default class IdentityController extends BaseController {
    constructor(private identityService: IdentityService) {
        super();
    }

    @route('/authenticate')
    @POST()
    async index(req: Request, res: Response) {
        try {
            const result = await this.identityService.authenticate(
                req.body.email, req.body.password
            );

            res.send(result);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/create')
    @POST()
    async create(req: Request, res: Response) {
        try {
            await this.identityService.create({
                email: req.body.email,
                password: req.body.password
            } as UserCreateDto);

            res.status(204);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}