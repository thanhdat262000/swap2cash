import { Button, Dropdown } from 'antd';
import { URL } from 'constants/routes';
import Link from 'next/link';
import React from 'react';

const renderItems: any = (listItem: any) =>
  listItem.map((item: any, index: number) => ({
    key: index,
    label: (
      <Link href={item.link}>
        <a>
          <span className=" font-semibold text-secondary text-lg cursor-pointer hover:text-primary transition ease-out duration-300">
            {item.name}
          </span>
        </a>
      </Link>
    ),
  }));
function DropdownHeader({ text, listItem }: any) {
  return (
    <Dropdown menu={{ items: renderItems(listItem) }} placement="bottom" className="dropdown-header-menu">
      <span className="font-bold text-secondary text-lg cursor-pointer hover:text-black">{text}</span>
    </Dropdown>
  );
}

export default DropdownHeader;
