"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

const data = {
  navDoc: [
    { title: "Dashboard", url: "/content/dashboard" },
    { title: "Analytics", url: "/content/analytics" },
    { title: "Registered", url: "/content/registered" },

  ],
};


export function SiteHeader() {
  const pathname = usePathname();
  const itemTitle =
    data.navDoc.find((item) => item.url === pathname)?.title || "Unknown";

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{itemTitle}</h1>
      </div>
    </header>
  )
}
