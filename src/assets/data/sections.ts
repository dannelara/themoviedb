import SectionHref from "interfaces/Sections";
import home_icon from "assets/images/HomeIcon.png";
import discover_icon from "assets/images/DiscoverIcon.png";

const sections: SectionHref[] = [
  {
    name: "Home",
    href: "#home",
    icon_path: home_icon,
  },
  {
    name: "Discover",
    href: "#discover",
    icon_path: discover_icon,
  },
];

export default sections;
