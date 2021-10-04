const Account = require('./accounts-model');

async function checkAccountPayload(req, res, next) {
  try {
    if (req.body.name === undefined || req.body.budget === undefined) {
      req.error = { message: "name and budget are required" }
      next();
    } else if (typeof req.body.name !== 'string') {
      req.error = { message: "name of account must be a string" }
      next();
    } else if (req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
      req.error = { message: "name of account must be between 3 and 100" }
      next();
    } else if (typeof req.body.budget !== 'number') {
      req.error = { message: "budget of account must be a number" }
      next();
    } else if (req.body.budget < 0 || req.body.budget > 1000000) {
      req.error = { message: "budget of account is too large or too small" }
      next();
    }
    const trimmed = req.body.name.trim();
    req.body = { name: trimmed, budget: req.body.budget };
    next();
  } catch (error) {
    next(error)
  }
}

async function checkAccountNameUnique(req, res, next) {
  try {
    if (!req.error) {
      const accounts = await Account.getAll();
      accounts.forEach((account) => {
        if (account.name === req.body.name) {
          req.error = { message: "that name is taken" };
        }
      });
    }
    next();
  } catch (error) {
    next(error)
  }
}

async function checkAccountId(req, res, next) {
  try {
    const accountMaybe = await Account.getById(req.params.id);
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

module.exports = { checkAccountId, checkAccountPayload, checkAccountNameUnique }