export function formatBalance(value: number, decimals: number) {
  const balanceFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    minimumIntegerDigits: 1,
    useGrouping: true,
  });

  return balanceFormatter.format(value);
}
