import { Button, CircularProgress, Tooltip } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef, useState } from 'react';
import { icons } from '../../lib/constants/icons';
import { Typography } from '../common/Typography';
import { ReportContent } from './ReportContent';
import { ReportPreviewModal } from './ReportPreviewModal';

interface ReportActionsProps {
  compact?: boolean;
}

export const ReportActions = ({ compact = false }: ReportActionsProps) => {
  const [reportPreviewOpen, setReportPreviewOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadReportRef = useRef<HTMLDivElement>(null);

  const handlePreviewOpen = () => setReportPreviewOpen(true);
  const handlePreviewClose = () => setReportPreviewOpen(false);

  const handleDirectDownload = async () => {
    if (!downloadReportRef.current) return;
    setIsDownloading(true);

    const element = downloadReportRef.current;

    // 1. Temporarily apply the safe hex color override class
    element.classList.add('html2canvas-print-target');

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = pageWidth;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;
      const imageData = canvas.toDataURL('image/png');

      let heightLeft = imageHeight;
      let position = 0;
      pdf.addImage(imageData, 'PNG', 0, position, imageWidth, imageHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imageHeight;
        pdf.addPage();
        pdf.addImage(imageData, 'PNG', 0, position, imageWidth, imageHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`inventory-sales-bi-report-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Failed to generate report PDF:', error);
    } finally {
      // 2. Remove it immediately so your visual theme doesn't disrupt
      element.classList.remove('html2canvas-print-target');
      setIsDownloading(false);
    }
  };

  const buttonSx = compact
    ? {
        minWidth: 0,
        height: 32,
        px: 1.25,
        color: 'var(--main-text)',
        borderColor: 'var(--card-border)',
        backgroundColor: 'var(--card)',
        '&:hover': {
          borderColor: 'var(--sidebar-muted)',
          backgroundColor: 'var(--sidebar-hover)',
        },
      }
    : {
        height: 40,
        color: 'var(--invert-text)',
        backgroundColor: 'var(--accent-positive)',
        '&:hover': {
          backgroundColor: 'var(--accent-positive-hover)',
          color: 'var(--invert-text)',
        },
      };

  return (
    <>
      <div className="flex items-center gap-2">
        <Tooltip title="Preview report" arrow>
          <Button
            variant="outlined"
            startIcon={<icons.show size={15} />}
            onClick={handlePreviewOpen}
            sx={{
              ...buttonSx,
              minWidth: compact ? 0 : 96,
              color: 'var(--main-text)',
              borderColor: 'var(--card-border)',
              backgroundColor: 'var(--card)',
            }}
          >
            {!compact && <Typography variant="body-sm">Preview</Typography>}
          </Button>
        </Tooltip>

        <Tooltip title="Download report" arrow>
          <Button
            variant={compact ? 'outlined' : 'contained'}
            startIcon={
              isDownloading ? (
                <CircularProgress size={14} color="inherit" />
              ) : (
                <icons.download size={15} />
              )
            }
            onClick={handleDirectDownload}
            disabled={isDownloading}
            sx={buttonSx}
          >
            {!compact && (
              <Typography variant="body-sm">
                {isDownloading ? 'Downloading...' : 'Download Report'}
              </Typography>
            )}
          </Button>
        </Tooltip>
      </div>

      {/* Hidden container positioned completely off-screen for processing html2canvas background renders */}
      <div
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          overflow: 'hidden',
          height: 0,
          width: 0,
        }}
      >
        <ReportContent ref={downloadReportRef} />
      </div>

      <ReportPreviewModal
        open={reportPreviewOpen}
        onClose={handlePreviewClose}
      />
    </>
  );
};
