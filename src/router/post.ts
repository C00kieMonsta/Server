import { Request, Response, Router } from 'express';
import * as Post from '../store/posts';

export class PostRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public all(req: Request, res: Response): void {
        Post.getAll().then((data) => {
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

const postRoutes: PostRouter = new PostRouter();
postRoutes.routes();

export default postRoutes.router;