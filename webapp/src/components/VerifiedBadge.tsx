import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 48 48" {...props}>
    <path
      fill="#42a5f5"
      d="m29.62 3 3.433 5.308 6.314.316.319 6.313 5.311 3.43-2.881 5.628L45 29.62l-5.308 3.433-.316 6.314-6.313.319-3.43 5.311-5.628-2.881L18.38 45l-3.433-5.308-6.314-.316-.319-6.313-5.311-3.43 2.881-5.628L3 18.38l5.308-3.433.316-6.314 6.313-.319 3.43-5.311 5.628 2.881z"
    />
    <path
      fill="#fff"
      d="m21.396 31.255-6.497-6.495 2.122-2.121 4.407 4.407 9.568-9.274 2.088 2.154z"
    />
  </svg>
)
export { SvgComponent as VerifiedBadge }
