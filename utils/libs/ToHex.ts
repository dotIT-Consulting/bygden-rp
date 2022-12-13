const ToHex = (steamId: Number | string) => {
  const dec = String(steamId).toString().split('');
  const sum = []
  const hex = []
  while (dec.length) {
    //@ts-ignore
    let s = 1 * dec.shift()
    for (let i = 0; s || i < sum.length; i++) {
      s += (sum[i] || 0) * 10
      sum[i] = s % 16
      s = (s - sum[i]) / 16
    }
  }
  while (sum.length) {
    //@ts-ignore
    hex.push(sum.pop().toString(16))
  }
  return hex.join('')
};

export {
  ToHex
}