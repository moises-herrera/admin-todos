'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './SidebarItem.css';

interface SidebarItemProps {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const SidebarItem: FC<SidebarItemProps> = ({ label, href, icon }) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={`nav-link ${pathname === href ? 'active' : ''}`}
      >
        {icon}
        <span className="group-hover:text-gray-700">{label}</span>
      </Link>
    </li>
  );
};
