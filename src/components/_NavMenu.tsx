import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@components/_dropdown-menu.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@components/_avatar.tsx";
import { Button } from "@components/_button.tsx";
import type { KeyboardEvent } from "react";
import { MenuIcon } from "lucide-react";
import { navItems } from "@/helper";

export default function NavMenu() {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    console.log(event);
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "h") {
      window.location.href = "/";
    }
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
      window.location.href = "/about";
    }
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "c") {
      window.location.href = "/contact";
    }
  }
  function logoClick(): void {
    if (window.location.pathname === "/") {
      window.location.reload();
    } else {
      window.location.href = "/";
      window.location.reload();
    }
  }
  return (
    <div
      tabIndex={0}
      className="flex flex-row items-center justify-center gap-9"
      onKeyDown={handleKeyDown}
    >
      <Button variant="default" size="icon-lg" onClick={logoClick}>
        <Avatar>
          <AvatarImage
            src="https://hadoop.apache.org/elephant.png"
            alt="Hadoop Logo"
          />
          <AvatarFallback>AH</AvatarFallback>
        </Avatar>
        <span>Big Data</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon-lg"
            className="bg-transparent border-0 hover:bg-transparent focus:bg-transparent"
          >
            <MenuIcon color="white" size="42" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {navItems.map((item) => {
            return (
              <DropdownMenuItem key={item.display}>
                <Button asChild variant="link" size="lg">
                  <a href={item.path}>
                    {item.icon && <item.icon />}
                    {item.display}
                  </a>
                </Button>
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
