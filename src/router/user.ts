import { Request, Response, Router } from 'express';
import * as uuid from 'uuid';
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
        }).catch((error) => {
            res.status(500).json({ error });
        })
    }

    public create(req: Request, res: Response): void {
        const { firstName, lastName, email, picture } = req.body;

        console.log('Body', req.body);

        if (!email || !firstName || !lastName || !picture) {
            res.status(400).send();
            return;
        }

        const userId: string = uuid.v4();

        User.create(userId, firstName, lastName, email, picture).then((data) => {
            res.status(200).json({ data });
        }).catch((error) => {
            console.log(error);
            res.status(500).json({ error });
        })
    }

    public routes() {
        this.router.get('/', this.all);
        this.router.post('/', this.create);
    }
}

const userRoutes: UserRouter = new UserRouter();
userRoutes.routes();

export default userRoutes.router;