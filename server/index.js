import './common/env';
import './common/passportConfig';
import Server from './common/server';
import routes from './routes';

export default new Server().router(routes).listen(process.env.PORT);
