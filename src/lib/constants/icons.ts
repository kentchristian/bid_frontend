
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CiCircleCheck, CiCirclePlus } from "react-icons/ci";
import { FaCloudUploadAlt, FaRegChartBar } from "react-icons/fa";
import { FiEdit2, FiEye, FiMinus, FiPlus, FiSearch, FiTrash2, FiX } from 'react-icons/fi';
import { GoArrowDown, GoArrowUp, GoSidebarCollapse } from "react-icons/go";
import { IoIosTrendingUp, IoMdWarning } from "react-icons/io";
import { IoReceiptOutline, IoTrendingDownSharp } from "react-icons/io5";
import { MdArrowDropDown, MdArrowDropUp, MdCancel, MdClose, MdCompareArrows, MdDashboard, MdInventory, MdMenu, MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
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
  reverseArrows: MdCompareArrows,
  receipt: IoReceiptOutline,
  edit: FiEdit2,
  show: FiEye,
  delete: FiTrash2,
  search: FiSearch,
  miniClose: FiX,
  upload: FaCloudUploadAlt,
  cancel: MdCancel,
  circlePlus: CiCirclePlus,
  minus: FiMinus,
  plus: FiPlus,
  


  // Visiblitye MUI 
  visbilityOn: Visibility,
  visibilityOff: VisibilityOff,


  // Ranked Icons
  first: first,
  second: second,
  third: third,

};
