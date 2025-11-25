export function calculatePointsForAmount(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return 0;
  const dollars = Math.floor(amount);
  let points = 0;

  if (dollars > 100) {
    points += (dollars - 100) * 2; // over 100
    points += 50; // from 50 to 100 => 50 * 1
  } else if (dollars > 50) {
    points += (dollars - 50) * 1;
  }
  return points;
}

export function aggregateRewards(transactions) {
  const customers = {};

  for (const transaction of transactions) {
    const { customerId, customerName, date, amount } = transaction;
    if (!customerId) continue;

    const monthKey = new Date(date)?.toISOString()?.slice(0, 7);
    const pts = calculatePointsForAmount(amount);

    if (!customers[customerId]) {
      customers[customerId] = {
        customerId,
        customerName,
        monthly: {},
        total: 0
      };
    }

    customers[customerId].monthly[monthKey] = (customers[customerId]?.monthly[monthKey] || 0) + pts;
    customers[customerId].total += pts;
  }

  return { customers };
}
