interface FormatCryptoAmountParams {
  amount: number
  round?: boolean
  locale?: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

export const formatCryptoAmount = ({
  amount,
  round = false,
  locale = 'en-US',
  minimumFractionDigits = 2,
  maximumFractionDigits = 4,
}: FormatCryptoAmountParams): string => {
  const numberFormat = new Intl.NumberFormat([locale], {
    maximumFractionDigits,
    minimumFractionDigits,
  })

  let updatedAmount = amount

  if (round) {
    updatedAmount = Math.round(amount)
  }

  return numberFormat.format(updatedAmount)
}
