export function formatPlayCount(playCount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal'
  }).format(playCount);
}
