// import React from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { inputsCustomizations } from './customizations/inputs';
// import { dataDisplayCustomizations } from './customizations/dataDisplay';
// import { feedbackCustomizations } from './customizations/feedback';
// import { navigationCustomizations } from './customizations/navigation';
// import { surfacesCustomizations } from './customizations/surfaces';
// import { colorSchemes, typography, shadows, shape } from './themePrimitives';

// export default function AppTheme(props) {
//   const { children, disableCustomTheme, themeComponents } = props;

//   const theme = React.useMemo(() => {
//     return disableCustomTheme
//       ? {}
//       : createTheme({
//           cssVariables: {
//             colorSchemeSelector: 'data-mui-color-scheme',
//             cssVarPrefix: 'template',
//           },
//           colorSchemes,
//           typography,
//           shadows,
//           shape,
//           components: {
//             ...inputsCustomizations,
//             ...dataDisplayCustomizations,
//             ...feedbackCustomizations,
//             ...navigationCustomizations,
//             ...surfacesCustomizations,
//             ...themeComponents,
//           },
//         });
//   }, [disableCustomTheme, themeComponents]);

//   if (disableCustomTheme) {
//     return <>{children}</>;
//   }

//   return (
//     <ThemeProvider theme={theme} disableTransitionOnChange>
//       {children}
//     </ThemeProvider>
//   );
// }
