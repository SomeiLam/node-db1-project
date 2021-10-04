const Account = require('./accounts-model')

exports.checkAccountPayload = async (req, res, next) => {

}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

async function checkAccountId(req, res, next) {
  try {
    const accountMaybe = await Account.getById(req.params.id);
    console.log(accountMaybe)
    if (accountMaybe) {
      req.account = accountMaybe;
      next();
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { checkAccountId }