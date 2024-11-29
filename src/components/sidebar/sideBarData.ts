import {
  ComponentBooleanIcon,
  RocketIcon,
  ViewGridIcon,
} from "@radix-ui/react-icons";
import { PlusCircle, Settings2Icon } from "lucide-react";

// Sidebar data with role-based access control
export const sidebarData = [
  {
    routerNames: ["/stock-page"],
    name: "Stock",
    icon: ViewGridIcon,
    subMenu: null,
    roles: ["admin", "manager", "user"], // Accessible to all roles
  },
  {
    routerNames: ["/cart-page"],
    name: "Cart",
    icon: RocketIcon,
    subMenu: null,
    roles: ["admin", "manager", "user"], // Accessible to all roles
  },
  {
    routerNames: ["/manager-page"],
    name: "Manager",
    icon: ComponentBooleanIcon,
    subMenu: null,
    roles: ["admin", "manager"], // Accessible to admin and manager only
  },
  {
    routerNames: ["/admin"],
    name: "Setting",
    icon: Settings2Icon,
    subMenu: null,
    roles: ["admin"], // Accessible to admin only
  },
  {
    routerNames: ["/register"],
    name: "Add User",
    icon: PlusCircle ,
    subMenu: null,
    roles: ["admin"],
  },
];
