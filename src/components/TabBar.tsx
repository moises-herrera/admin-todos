'use client';

import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

// https://tailwindcomponents.com/component/radio-buttons-1

interface TabBarProps {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar: FC<TabBarProps> = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelectedTab(tab);
    setCookie('selectedTab', tab.toString());
    router.refresh();
  };

  return (
    <div
      className={`grid w-full space-x-2 rounded-xl bg-gray-200 p-2 grid-cols-4`}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            checked={selectedTab === tab}
            onChange={() => {}}
            type="radio"
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
