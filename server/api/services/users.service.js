import l from '../../common/logger';
import { User } from '../../common/models/User';

class UsersService {
    async create(body) {
        l.info(`${this.constructor.name}.create()`);
        const userData = {
            username: body.username,
            password: body.password,
        };
        let result = await User.create(userData)
            .catch(err => {
                if (err.message.slice(0, 6) !== 'E11000') l.error(err);
                return err;
            });
        if (result instanceof Error) return result;
        let clone = result.toObject();
        delete clone.password;
        return clone;
    }
}

export default new UsersService();