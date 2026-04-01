import { Typography } from '../common/Typography';

interface HeaderContentProps {
  title: string;
  description?: string;
}

export default function HeaderContent({
  title,
  description,
}: HeaderContentProps) {
  return (
    <div className="flex flex-col gap-2 mb-10">
      <Typography variant="h3">{title}</Typography>
      <Typography variant="caption" className="inline">
        {description}
      </Typography>
    </div>
  );
}
