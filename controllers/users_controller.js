import { usersService } from "../services/users_service.js"

class UsersController {
    create = async (req, res, err) => {
        const { name, password, role } = req.body;
        const user = await usersService.createUser(name, password, role);

        if(user.error) {
            return res.status(400).json(user.error);
        }
        return res.status(200).json({
            message: `User ${user.name} created successfully`
        });
    }

    login = async (req, res, err) => {
        const { name, password } = req.body;
        const user = await usersService.login(name, password);

        if(user.error) {
            return res.status(400).json(user.error);
        }

        return res.status(200).json(user);
    }
}

export const usersController = new UsersController();