const router = require('express').Router();
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware')
const Account = require('./accounts-model');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    if (accounts) {
      res.status(200).json(accounts);
    } else {
      res.status(200).json([]);
    }
  } catch (err) {
    next(err);
  }
})

router.get('/:id', checkAccountId, (req, res) => {
  if (req.account) {
    res.json(req.account);
  } else {
    res.status(404).json({ message: "account not found" });
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    if (req.error) {
      res.status(400).json(req.error);
    } else {
      const newAccount = await Account.create(req.body);
      res.status(201).json(newAccount);
    }
  } catch (err) {
    next(err);
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  if (req.account) {
    if (req.error === undefined) {
      Account.updateById(req.params.id, req.body)
        .then(account => {
          res.status(200).json(account);
        })
        .catch(next)
    } else {
      res.status(400).json(req.error);
    }
  } else {
    res.status(404).json({ message: "account not found" });
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    if (req.account) {
      const account = await Account.deleteById(req.params.id);
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: "account not found" });
    }
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
