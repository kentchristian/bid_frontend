import { Box, Button, Modal } from '@mui/material';
import { useEffect } from 'react';
import { icons } from '../../lib/constants/icons';
import { Typography } from './Typography';

type DynamicModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  minWidth?: number | string;
  title?: string;
};

const DynamicModal = ({
  open,
  onClose,
  children,
  minWidth = 500,
  title,
}: DynamicModalProps) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !open) return;

    const root = document.documentElement;
    const attr = 'data-modal-lock-count';
    const currentCount = Number(root.getAttribute(attr) ?? '0');
    const nextCount = currentCount + 1;

    root.setAttribute(attr, String(nextCount));
    root.classList.add('app-modal-open');

    return () => {
      const mountedCount = Number(root.getAttribute(attr) ?? '1');
      const updatedCount = Math.max(mountedCount - 1, 0);

      if (updatedCount === 0) {
        root.removeAttribute(attr);
        root.classList.remove('app-modal-open');
        return;
      }

      root.setAttribute(attr, String(updatedCount));
    };
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      disableScrollLock={false}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 300,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 0.5,
          p: 2,
          width: 'auto',
          minWidth: minWidth,
          maxHeight: '90vh',
          overflow: 'hidden',
          overscrollBehavior: 'contain',
        }}
      >
        <div className="flex flex-row items-center justify-between mb-2">
          <Typography variant="h3">{title}</Typography>
          <Button
            className="flex items-center justify-center"
            onClick={onClose}
            sx={{
              backgroundColor: 'var(--accent-negative)',
              color: 'var(--invert-text)',
              '&:hover': {
                // Option A: Use a specific hover variable if your theme has one
                backgroundColor: 'var(--accent-negative-hover)',
                color: 'var(--invert-text)',
                // Ensure the cursor changes
                cursor: 'pointer',
              },
            }}
          >
            <icons.close size={20} />
          </Button>
        </div>
        <hr className="border-t-[0.5px] border-gray-400/20 mb-4" />
        {children}
      </Box>
    </Modal>
  );
};

export default DynamicModal;
