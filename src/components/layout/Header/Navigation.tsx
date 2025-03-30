'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/categories' },
  { name: 'Add Business', href: '/business/add' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex space-x-8">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
              isActive
                ? 'border-b-2 border-primary text-gray-900'
                : 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}; 