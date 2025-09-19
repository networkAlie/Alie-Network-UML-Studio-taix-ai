
import React, { useMemo } from 'react';
import type { Diagram } from '../types';

interface SidebarProps {
  items: Diagram[];
  currentId: string;
  onSelect: (item: Diagram) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ items, currentId, onSelect }) => {
  const groups = useMemo(() => {
    const map = new Map<string, Diagram[]>();
    items.forEach((item) => {
      if (!map.has(item.group)) {
        map.set(item.group, []);
      }
      map.get(item.group)?.push(item);
    });
    return Array.from(map.entries());
  }, [items]);

  return (
    <aside className="w-full md:w-80 lg:w-96 shrink-0 space-y-4">
      {groups.map(([group, diagrams]) => (
        <div key={group} className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:bg-gray-900 dark:border-gray-800">
          <h2 className="mb-2 px-2 text-sm font-semibold tracking-wide text-gray-500 dark:text-gray-400">{group}</h2>
          <ul className="space-y-1">
            {diagrams.map((diagram) => (
              <li key={diagram.id}>
                <button
                  onClick={() => onSelect(diagram)}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm transition-colors duration-200 ${
                    currentId === diagram.id
                      ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {diagram.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
