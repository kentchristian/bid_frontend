
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegChartBar } from "react-icons/fa";
import { GoArrowDown, GoArrowUp, GoSidebarCollapse } from "react-icons/go";
import { IoIosTrendingUp, IoMdWarning } from "react-icons/io";
import { IoTrendingDownSharp } from "react-icons/io5";
import { MdArrowDropDown, MdArrowDropUp, MdClose, MdDashboard, MdInventory, MdMenu, MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { TbLayoutSidebarLeftCollapse, TbReportSearch } from "react-icons/tb";
import { first, second, third } from "../../assets/rank-icons";


export const icons = {
  expand: GoSidebarCollapse,
  collapse: TbLayoutSidebarLeftCollapse,
  dashboard: MdDashboard,
  sales: FaRegChartBar,
  inventory: MdInventory,
  reports: TbReportSearch,
  lightMode: MdOutlineLightMode,
  darkMode: MdOutlineDarkMode,
  menu: MdMenu,
  close: MdClose,
  trendUp: IoIosTrendingUp,
  trendDown: IoTrendingDownSharp,
  mdArrowUp: MdArrowDropUp,
  mdArrowDown: MdArrowDropDown,
  arrowUp: GoArrowUp,
  arrowDown: GoArrowDown,
  logout: RiLogoutCircleLine,
  warning: IoMdWarning,
  check: CiCircleCheck,

  // Visiblitye MUI 
  visbilityOn: Visibility,
  visibilityOff: VisibilityOff,


  // Ranked Icons
  first: first,
  second: second,
  third: third,

};
