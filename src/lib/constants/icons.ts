
import { FaRegChartBar } from "react-icons/fa";
import { GoArrowDown, GoArrowUp, GoSidebarCollapse } from "react-icons/go";
import { IoIosTrendingUp } from "react-icons/io";
import { IoTrendingDownSharp } from "react-icons/io5";
import { MdArrowDropDown, MdArrowDropUp, MdDashboard, MdInventory, MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { TbLayoutSidebarLeftCollapse, TbReportSearch } from "react-icons/tb";

export const icons = {
  expand: GoSidebarCollapse,
  collapse: TbLayoutSidebarLeftCollapse,
  dashboard: MdDashboard,
  sales: FaRegChartBar,
  inventory: MdInventory,
  reports: TbReportSearch,
  lightMode: MdOutlineLightMode,
  darkMode: MdOutlineDarkMode,
  trendUp: IoIosTrendingUp,
  trendDown: IoTrendingDownSharp,
  mdArrowUp: MdArrowDropUp,
  mdArrowDown: MdArrowDropDown,
  arrowUp: GoArrowUp,
  arrowDown: GoArrowDown,

};
