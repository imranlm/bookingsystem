import { SvgIcon, SvgIconProps } from '@mui/material';

const NewBookingIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon width="18" height="18" viewBox="0 0 18 18" fill="none" {...props}>
      <path
        d="M15 2H3C2.44772 2 2 2.44772 2 3V15C2 15.5523 2.44772 16 3 16H15C15.5523 16 16 15.5523 16 15V3C16 2.44772 15.5523 2 15 2ZM3 1C1.89543 1 1 1.89543 1 3V15C1 16.1046 1.89543 17 3 17H15C16.1046 17 17 16.1046 17 15V3C17 1.89543 16.1046 1 15 1H3Z"
        fill="currentColor"
      />
      <path
        d="M9 5C9 4.44772 9.44772 4 10 4H13C13.5523 4 14 4.44772 14 5C14 5.55228 13.5523 6 13 6H10C9.44772 6 9 5.55228 9 5Z"
        fill="currentColor"
      />
      <path
        d="M11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7V10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10V7Z"
        fill="currentColor"
      />
      <path
        d="M10 9C9.44772 9 9 9.44772 9 10V12C9 12.5523 9.44772 13 10 13C10.5523 13 11 12.5523 11 12V10C11 9.44772 10.5523 9 10 9Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
};

export default NewBookingIcon;
