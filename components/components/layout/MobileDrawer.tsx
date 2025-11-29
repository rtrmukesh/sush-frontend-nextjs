"use client";
import { useRouter } from "next/navigation";
import { MENUS } from "./NavMenuData";
import { motion } from "framer-motion";

type MobileDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function MobileDrawer({ open, setOpen }: MobileDrawerProps) {
  const router = useRouter();
  if (!open) return null;

  const handleNavigate = (route: string) => {
    router.push(route);
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50"
      onClick={() => setOpen(false)}
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.4 }}
        className="w-[75%] bg-white dark:bg-neutral-900 h-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {MENUS.map((menu) => (
          <div key={menu.title} className="mb-6">
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {menu.title}
            </p>

            {menu.items.map((item) => (
              <p
                key={item?.name}
                className="py-2 text-lg text-gray-900 dark:text-gray-200 font-medium"
                onClick={() => handleNavigate(item?.route)}
              >
                {item?.name}
              </p>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
