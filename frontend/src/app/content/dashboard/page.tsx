
import { Badge } from "@/components/ui/badge"
import { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/data-range-picker"
import { MainNav } from "@/components/main-nav"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { Search } from "@/components/search"
import { ModeToggle } from "@/components/mode-toggle"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import UserProfileMenu from "@/components/user-nav"

import data from "../../../../public/data.json"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard of Face Recognition Project",
}

const user = {
  name: "Alicia Koch",
  email: "alicia@example.com",
  avatar: "https://avatar.vercel.sh/alicia.png",
}


export default function DashboardPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <UserProfileMenu user={user}/>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ModeToggle />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>

              <TabsTrigger value="overview" className="gap-1">
                Overview
              </TabsTrigger>
              <TabsTrigger value="registered" className="gap-1">
                Registered{" "}
                <Badge
                  variant="secondary"
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                >
                  2
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-1">
                Analytics{" "}
                <Badge
                  variant="secondary"
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground/30"
                >
                  1
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-1" disabled>
                Notifications
              </TabsTrigger>

            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <SectionCards />
                    <DataTable data={data} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="registered" className="space-y-4">
              ---mehdy
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-4 lg:px-6">
                      <ChartAreaInteractive />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>                     
          </Tabs>
        </div>
      </div>
    </>
  )
}