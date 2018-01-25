import { Request, Response, Router } from 'express';
import * as uuid from 'uuid';
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
        }).catch((error) => {
            res.status(500).json({ error });
        })
    }

    public create(req: Request, res: Response): void {
        const { userId, postContent } = req.body;

        if (!userId || !postContent) {
            res.status(400).send();
            return;
        }

        const postId = uuid.v4();
        const createdAt = Date.now();

        Post.create(postId, userId, createdAt, postContent).then((data) => {
            res.status(200).json({ data });
        }).catch((error) => {
            res.status(500).json({ error });
        })
    }

    public routes() {
        this.router.get('/', this.all);
        this.router.post('/', this.create);
    }
}

const postRoutes: PostRouter = new PostRouter();
postRoutes.routes();

export default postRoutes.router;