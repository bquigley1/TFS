const transferService = require("../services/transfers.service");

const postTransferUsernames = async (req, res, next) => {
  const { from, to, amount } = req.body;

  if (!from || !to || !amount || (amount && amount <= 0)) {
    res.sendStatus(400) && next();
    return;
  }

  if (
    req.user.userInfo.username.toLowerCase() !== from.toLowerCase() &&
    req.user.userInfo.is_admin == 0
  ) {
    res.sendStatus(401) && next();
    return;
  }

  try {
    let transferResponse = await transferService.transferTokensUsernames(
      from,
      to,
      amount
    );
    let { toBal, fromBal } = transferResponse;
    if (fromBal == -1) {
      res.sendStatus(400) && next();
    } else {
      res.status(200).json(transferResponse) && next();
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500) && next();
  }
};

module.exports = {
  postTransferUsernames,
};
