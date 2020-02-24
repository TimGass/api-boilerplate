import l from "../../common/logger";

export class Controller {
  me(req, res) {
    l.info('MeController.me()');
    let copy = req.user.toObject();
    delete copy.password;
    return res.status(200).json(copy);
  }
}
export default new Controller();
