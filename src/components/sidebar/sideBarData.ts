import {  ComponentBooleanIcon, RocketIcon, ViewGridIcon } from "@radix-ui/react-icons";
import { LogOut } from "lucide-react";

export const sidebarData = [
  {
    routerNames: ["/stock-page"],
    name: "Stock",
    icon: ViewGridIcon,
    subMenu: null,
  },
  {
    routerNames: ["/cart-page"],
    name: "Cart",
    icon: RocketIcon,
    subMenu: null,
  },
  {
    routerNames: ["/manager-page"],
    name: "Manager",
    icon: ComponentBooleanIcon,
    subMenu: null,
  },
  {
    routerNames: ["/logout"],
    name: "Log Out",
    icon: LogOut,
    subMenu: null,
  
  },
];
