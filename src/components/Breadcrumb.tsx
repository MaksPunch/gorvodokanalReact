import { ChevronRightIcon } from "@heroicons/react/20/solid";
import React from "react";

interface PropTypes extends React.ComponentPropsWithoutRef<"nav"> {
  pages: { name: string; onClick: () => void; current: boolean }[];
}

export default function Breadcrumb({ pages }: PropTypes) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center gap-4">
        {pages.map((page, index) => (
          <li key={page.name}>
            <div className="flex items-center gap-4">
              <span
                onClick={page.onClick}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 cursor-pointer"
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </span>
              {index < pages.length - 1 ? (
                <ChevronRightIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
              ) : (
                ""
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
