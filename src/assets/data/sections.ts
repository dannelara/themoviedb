import SectionHref from "interfaces/SectionHref";
import home_icon from "assets/images/HomeIcon.png";
import discover_icon from "assets/images/DiscoverIcon.png";

const sections: SectionHref[] = [
  {
    name: "Home",
    href: "/",
    icon_path: home_icon,
  },
  {
    name: "Discover",
    href: "/discovery",
    icon_path: discover_icon,
  },
];

export default sections;
