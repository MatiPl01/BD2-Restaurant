import { Router } from 'express';


interface Controller {
    PATH: string;
    router: Router;
}


export default Controller;
