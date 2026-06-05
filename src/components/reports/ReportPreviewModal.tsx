import { Button, CircularProgress, Dialog } from '@mui/material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useRef, useState } from 'react';
import { icons } from '../../lib/constants/icons';
import { Typography } from '../common/Typography';
import { ReportContent } from './ReportContent';

type ReportPreviewModalProps = {
  open: boolean;
  onClose: () => void;
};

export const ReportPreviewModal = ({
  open,
  onClose,
}: ReportPreviewModalProps) => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReport = async () => {
    if (!reportRef.current) return;
    setIsDownloading(true);

    const element = reportRef.current;

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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      PaperProps={{
        sx: {
          height: '92vh',
          color: 'var(--main-text)',
          backgroundColor: 'var(--card)',
        },
      }}
    >
      <div className="flex items-center justify-between border-b border-[color:var(--card-border)] px-5 py-4">
        <div>
          <Typography variant="h3">Report Preview</Typography>
          <Typography
            variant="body-sm"
            className="text-[color:var(--sidebar-muted)]"
          >
            Inventory & Sales BI report PDF
          </Typography>
        </div>
        <Button
          onClick={onClose}
          sx={{
            minWidth: 0,
            color: 'var(--main-text)',
            borderColor: 'var(--card-border)',
          }}
          variant="outlined"
        >
          <icons.close size={18} />
        </Button>
      </div>

      <div className="flex-1 overflow-auto bg-neutral-100 p-5">
        <ReportContent ref={reportRef} />
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-[color:var(--card-border)] px-5 py-4">
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ color: 'var(--main-text)', borderColor: 'var(--card-border)' }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          onClick={handleDownloadReport}
          disabled={isDownloading}
          startIcon={
            isDownloading ? (
              <CircularProgress size={14} color="inherit" />
            ) : (
              <icons.download size={15} />
            )
          }
          sx={{
            color: 'var(--invert-text)',
            backgroundColor: 'var(--accent-positive)',
            '&:hover': { backgroundColor: 'var(--accent-positive-hover)' },
          }}
        >
          Download Report
        </Button>
      </div>
    </Dialog>
  );
};
