import { Chip } from "@mui/material";
import { icons } from "../../lib/constants/icons";
import { cn } from "../../lib/helpers/cn";
import { useMode } from "../../lib/store/useMode";
import { Typography } from "../common/Typography";


interface TotalRevenueCardProps { 
  title: string;
  totalRevenueToday: number;
  totalRevenueYesterday: number;

}
const TotalRevenueCard = ({
  title,
  totalRevenueToday,
  totalRevenueYesterday,
}: TotalRevenueCardProps) => {

  const trendUp = totalRevenueToday > totalRevenueYesterday;
  const trendPercentage = "12%"
  const sign = trendUp ? "+" : "-";

  const { mode } = useMode();

  alert(mode);

  return (
    <div className={cn(
      "flex flex-col gap-2 p-2 border border-gray-500 rounded-md w-full",
      "shadow-lg shadow-black/20",
      mode === "dark" ? "bg-[#282828]" : "bg-[#f3f3f3]"
      )}>
      <div className="flex flex-row justify-between items-center">
         <Typography>{title}</Typography>
         <Chip 
          label={trendPercentage}
          sx={{
            background: "#00784f",
            color: "white",
          }}
         />
      </div>

      <div className="flex flex-row gap-2 items-center"> 
        <Typography variant="h3">₱ {totalRevenueToday}</Typography>
        {trendUp ? <icons.trendUp color="green"/> : <icons.trendDown color="red"/>}
      </div>
      
      <Typography><span className={cn(
        trendUp ? "text-green-500" : "text-red-500"
      )}>{sign}</span>{trendPercentage} vs Yesterday</Typography>
    
    </div>
  )
}

export default TotalRevenueCard