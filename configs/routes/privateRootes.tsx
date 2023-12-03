import { ActivityIcon } from "@/components/icons/ActivityIcon";
import { DocumentIcon } from "@/components/icons/DocumentIcon";
import { PermissionIcon } from "@/components/icons/PermissionIcon";
import { ServiceIcon } from "@/components/icons/ServiceIcon";
import { SettingIcon } from "@/components/icons/SettingIcon";
import { UsersIcon } from "@/components/icons/UsersIcon";

export const privateRootes = [
  {
    url: "/users",
    label: "Utilisateurs",
    icon: <UsersIcon />,
  },
  {
    url: "/permissions",
    label: "Permissions",
    icon: <PermissionIcon />,
  },
  {
    url: "/activity",
    label: "Activité",
    icon: <ActivityIcon />,
  },
  {
    url: "/documents",
    label: "Documents",
    icon: <DocumentIcon />,
  },
  {
    url: "/services",
    label: "Services",
    icon: <ServiceIcon />,
  },
  {
    url: "/setting",
    label: "Paramètres",
    icon: <SettingIcon />,
  },
];
