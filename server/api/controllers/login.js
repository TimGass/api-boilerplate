import l from '../../common/logger';

export class Controller {
  login(req, res) { 
    l.info('LoginController.login()');
    if(req.user.message){
      l.error(req.user.message);
      return res.status(401).json({ message: req.user.message, code: 'INVALID_CREDS' });
    }
    let copy = req.user.toObject();
    delete copy.user.password;
    return res.status(200).json(copy);
  }
}
export default new Controller();
