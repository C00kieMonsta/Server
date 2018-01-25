import { Request, Response, Router } from 'express';
import * as User from '../store/users';

export class UserRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public all(req: Request, res: Response): void {
        User.getAll().then((data) => {
            res.status(200).json({ data });
        })
        .catch((error) => {
            res.json({ error });
        })
    }

    public routes() {
        this.router.get('/', this.all);
    }
}

const userRoutes: UserRouter = new UserRouter();
userRoutes.routes();

export default userRoutes.router;