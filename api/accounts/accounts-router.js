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
      const newAccount = await Account.create(req.account);
      res.status(201).json(newAccount);
    }
  } catch (err) {
    next(err);
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
