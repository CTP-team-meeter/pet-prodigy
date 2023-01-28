/**
 * @file custom.d.ts
 * @author Kevin do Canto
 * @version 1.0
 * @date Created on January 22,2023
 * @description Declare the NavLink component from 'react-router-dom' package with activeClassName prop.
 */

import 'react-router-dom';

declare module 'react-router-dom' {
  export interface NavLinkProps extends LinkProps {
    exact?: boolean;
    activeClassName?: string;
  }
}
