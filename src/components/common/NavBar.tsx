"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const tools: { title: string; href: string; description: string }[] = [
  {
    title: "Mobx",
    href: "https://mobx.js.org",
    description:
      "Simple, scalable state management. MobX is a standalone library.",
  },
  {
    title: "ShadCn",
    href: "https://ui.shadcn.com/",
    description:
      "Components libary for quickly building beautiful and accessible websites and applications.",
  },
];

// Must be a glassmorphism style
export function NavBar() {
  return (
    <NavigationMenu className="hidden md:flex md:justify-center md:items-center md:space-x-4">
      <NavigationMenuList className="flex justify-center items-center space-x-4">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="nav__item">
            Me
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Vinicius
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      I've been a software developer for four years. I use
                      React, Node, and BabylonJS daily to create interactive and
                      immersive interfaces for users.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="https://www.linkedin.com/in/viniskonicezny/"
                title="Linkedin"
              >
                My linkedin profile
              </ListItem>
              <ListItem href="https://github.com/Visko93" title="Github">
                My github profile
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="nav__item">
            Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {tools.map((tool) => (
                <ListItem key={tool.title} title={tool.title} href={tool.href}>
                  {tool.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a href="/docs" target="_blank" rel="noopener">
            <NavigationMenuLink className="nav__item">
              Documentation
            </NavigationMenuLink>
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
