interface PlaneIconProps {
  width?: number;
  height?: number;
}
export default function PlaneIcon({ height, width }: PlaneIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width || 800}
      height={height || 800}
      viewBox="0 -10.43 47.856 47.856"
    >
      <g fill="#ffff" data-name="4" transform="translate(-533.889 -162.466)">
        <path
          d="M581.745 181.466s0-11.137-8.378-11.137c-5.709 0-30.838 3.292-30.838 3.292l-3.748-5.155h-4.892l5.5 13h11.558l-4.766 8h4.42l8.512-8z"
          data-name="Path 207"
        ></path>
        <path
          d="M563.587 169.2l-11.262-6.737h-5.175l7.653 7.569z"
          data-name="Path 208"
        ></path>
      </g>
    </svg>
  );
}
