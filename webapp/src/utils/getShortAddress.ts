export const getShortAddress = (addr?: string) => {
  if (!addr) {
    return null;
  }
  return (
    addr.substring(0, 5) +
    "..." +
    addr.substring(addr.length - 4, addr.length)
  )
};