import Image from 'next/image';
import Link from 'next/link';
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from 'react-icons/io5';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { SidebarItem, LogoutButton } from '..';

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    icon: <IoCheckboxOutline />,
    label: 'Rest TODOS',
    href: '/dashboard/rest-todos',
  },
  {
    icon: <IoListOutline />,
    label: 'Server Actions',
    href: '/dashboard/server-todos',
  },
  {
    icon: <IoCodeWorkingOutline />,
    label: 'Cookies',
    href: '/dashboard/cookies',
  },
  {
    icon: <IoBasketOutline />,
    label: 'Products',
    href: '/dashboard/products',
  },
  {
    icon: <IoPersonOutline />,
    label: 'Perfil',
    href: '/dashboard/profile',
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const username = user?.name || 'No name';
  const userImage = user?.image || '/images/avatar.png';
  const userRoles = user?.roles || ['client'];

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              width={150}
              height={150}
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={userImage}
            alt=""
            className="m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={150}
            height={150}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {username}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">
            {userRoles.join(', ')}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem key={item.href} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
