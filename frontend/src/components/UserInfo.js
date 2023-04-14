import React, { useState } from 'react';
import Balance from './Balance';

const UserInfo = ({ userInfo }) => {
  const [balanceUpdate, setBalanceUpdate] = useState(false);

  return (
    <div>
      <h1>Rewards</h1>

      {userInfo !== null ? (
        <p>Welcome, {userInfo.username}!</p>
      ) : (
        <p>Loading...</p>
      )}
      {userInfo !== null ? (
        <p>Your Wallet Address: {userInfo.wallet_address}</p>
      ) : (
        <p>Loading...</p>
      )}

      <Balance userInfo={userInfo} balanceUpdate={balanceUpdate} setBalanceUpdate={setBalanceUpdate} />
    </div>
  );
};

export default UserInfo;
