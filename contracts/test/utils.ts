export function fakeCID(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 46;
  let result = 'Qm';

  for (let i = 0; i < length - 2; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
