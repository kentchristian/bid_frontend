import { Tooltip, type TooltipProps } from '@mui/material';
import { cn } from '../../lib/helpers/cn';

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
  className?: string;
  tooltipPlacement?: TooltipProps['placement'];
  tooltipProps?: Omit<TooltipProps, 'title' | 'children'>;
}

const TruncatedText = ({
  text,
  maxLength = 23,
  className,
  tooltipPlacement = 'top',
  tooltipProps,
}: TruncatedTextProps) => {
  const safeText = text ?? '';
  const normalizedMaxLength = Math.max(1, maxLength);
  const isTruncated = safeText.length > normalizedMaxLength;
  const displayText = isTruncated
    ? `${safeText.slice(0, normalizedMaxLength)}...`
    : safeText;

  const showTooltip = isTruncated && safeText.length > 0;

  return (
    <Tooltip
      title={safeText}
      placement={tooltipPlacement}
      arrow
      disableHoverListener={!showTooltip}
      disableFocusListener={!showTooltip}
      disableTouchListener={!showTooltip}
      {...tooltipProps}
    >
      <span className={cn('inline-block max-w-full', className)}>
        {displayText}
      </span>
    </Tooltip>
  );
};

export default TruncatedText;
