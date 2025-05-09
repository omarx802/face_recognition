"use client"

import * as React from "react"
import { ChevronsUpDown, LogOut, Settings, User as UserIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type User = {
  name: string
  email: string
  avatar: string
}

export default function UserProfileMenu({
  className,
  user,
}: {
  className?: string
  user: User
}) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (item: string) => {
    setOpen(false)
    switch (item) {
      case "account":
        console.log("Go to account")
        break
      case "settings":
        console.log("Go to settings")
        break
      case "logout":
        console.log("Logging out")
        break
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage src={user.avatar} alt={user.name} className="grayscale" />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          {user.name}
          <ChevronsUpDown className="ml-auto opacity-50 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={() => handleSelect("account")}>
                <UserIcon className="mr-2 h-4 w-4" />
                Account
              </CommandItem>
              <CommandItem onSelect={() => handleSelect("settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </CommandItem>
              <Separator />
              <CommandItem onSelect={() => handleSelect("logout")}>
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
