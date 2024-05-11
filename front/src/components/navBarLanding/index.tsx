// NavLink.tsx
import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavBarLanding: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="text-zinc-50 hover:text-zinc-50 hover:bg-zinc-900 px-6 py-4 rounded-md text-3xl font-semibold transition duration-300"
    >
      {children}
    </Link>
  );
};

export default NavBarLanding;