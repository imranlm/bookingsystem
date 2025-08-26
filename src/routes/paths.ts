//export const rootPaths = {
export const rootPaths = {
  root: '/',
  pagesRoot: 'pages',
  authRoot: 'auth',
  errorRoot: 'error',
};

// export const paths = {
//   booking: '/booking',
//   // Add other paths as needed
// };

export default {
  login: `/${rootPaths.authRoot}/login`,
  signup: `/${rootPaths.authRoot}/sign-up`,
  newbooking: `/${rootPaths.authRoot}/newbooking`,
  viewbookings: `/${rootPaths.pagesRoot}/viewbookings`,
  asset: `/${rootPaths.pagesRoot}/asset`,
};
