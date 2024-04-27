import { ReactNode } from 'react';
import Logo from './Logo';

interface Props {
  children: ReactNode;
}

function Navbar({ children }: Props) {
  return (
    <nav className='nav-bar'>
      <Logo />
      {/* <Search /> */}
      {children}
    </nav>
  );
}

export default Navbar;
