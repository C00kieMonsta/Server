import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';

import PostRouter from './router/post';
import UserRouter from './router/user';

class Server {

    // set app to be of type express.Application
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }
  
    // application config
    public config(): void {

        // express middleware
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(cors());

        // cors
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        }); 
    }

    // application routes
    public routes(): void {
        const router: express.Router = express.Router();

        this.app.use('/', router);
        this.app.use('/api/v1/posts', PostRouter);
        this.app.use('/api/v1/users', UserRouter);
    }
}

// export
export default new Server().app;