interface LogoIconProps {
  width?: number;
  height?: number;
}

export default function LogoIcon({ height, width }: LogoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 40}
      height={height || 40}
      version="1.1"
      viewBox="0 0 291.801 291.801"
      xmlSpace="preserve"
    >
      <path
        fill="#FB9879"
        d="M226.145 27.338L165.33 188.585l-6.656-31.802c-11.233-36.671-46.5-76.543-85.861-96.364l55.7 204.044h65.684L291.801 27.34c0-.002-65.656-.002-65.656-.002z"
      ></path>
      <path
        fill="#FA7B91"
        d="M136.965 51.473c-3.674-15.008-19.348-23.633-33.252-24.125H1.049L0 32.089c80.08 19.512 137.494 70.881 159.294 127.392L136.965 51.473z"
      ></path>
    </svg>
  );
}
