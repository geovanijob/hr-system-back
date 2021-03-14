import { Router } from 'express';
import EmployeRepository from '../repositories/EmployeRepository';
import CreateEmployeService from '../services/CreateEmployeService';
import DeleteEmployeService from '../services/DeleteEmployeService';

const employeesRouter = Router();
const employeRepository = new EmployeRepository();


employeesRouter.get('/', (request, response) => {
    const employees = employeRepository.all();

    return response.json(employees);
})

employeesRouter.post('/', async (request, response) => {
    try {
        const { firstName, lastName, salary } = request.body;
        const createEmploye = new CreateEmployeService(employeRepository);

        const employe = await createEmploye.execute({ firstName, lastName, salary });

        return response.json(employe);
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }

});

employeesRouter.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const deleteEmploye = new DeleteEmployeService(employeRepository);

        const deleted = await deleteEmploye.execute(id);
        return response.json(deleted);
    } catch (err) {
        return response.status(400).json({ error: err.message })
    }


})
export default employeesRouter;