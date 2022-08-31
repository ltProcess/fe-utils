//贪心
function minCoinChange(coins, amount) {
  let total = 0,
    result = [];
  const len = coins.length;
  const sortCoins = coins.sort((a, b) => b - a);
  for (let i = 0; i < len; i++) {
    let coin = sortCoins[i];
    while (total + coin <= amount) {
      result.push(coin);
      total += coin;
    }
  }
  console.log(result);
  return result;
}
minCoinChange([1, 5, 11], 15);
