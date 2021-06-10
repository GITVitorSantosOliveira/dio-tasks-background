import userController from './app/controllers/UserController'
require('dotenv').config('src/env')
import express from 'express'
import Queue from './app/lib/Queue'
import BullBoard from 'bull-board';

const app = express();
BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

app.use(express.json());

app.post('/users', userController.store)

app.use('/admin/queues', BullBoard.UI)

app.listen(process.env['PORT'], () => {
    console.log('listening on port ' + process.env['PORT']);
})
