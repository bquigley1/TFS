import React, { useState, useEffect } from 'react';

const Balance = ({ userInfo, balanceUpdate, setBalanceUpdate }) => {
  const [balance, setBalance] = useState(null);
  
  useEffect(() => {
    if (!userInfo) {
      return;
    }

    const getBalance = async () => {
      const response = await fetch(`http://ec2-3-137-214-39.us-east-2.compute.amazonaws.com:3000/api/balance/user/${userInfo.username}`);
      const data = await response.json();
      setBalance(data);
    };

    getBalance();

    // Set up an interval to update the balance every 5 seconds
    const intervalId = setInterval(getBalance, 5000);

    // Remove the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [userInfo]);

  useEffect(() => {
    if (balanceUpdate) {
      const getBalance = async () => {
        const response = await fetch(`http://ec2-3-137-214-39.us-east-2.compute.amazonaws.com:3000/api/balance/user/${userInfo.username}`);
        const data = await response.json();
        setBalance(data);
      };
      
      getBalance();
      setBalanceUpdate(false);
    }
  }, [balanceUpdate, setBalanceUpdate, userInfo]);

  useEffect(() => {

    if (!userInfo) {
      return;
    }
    // Dispatch a custom event with the balance when it updates
    const balanceEvent = new CustomEvent(userInfo.wallet_address, { detail: balance });
    window.dispatchEvent(balanceEvent);
  }, [balance, userInfo]);




  return (
    <p>Your Current Balance: {balance} TFS Coin</p>
  );
};

export default Balance;
