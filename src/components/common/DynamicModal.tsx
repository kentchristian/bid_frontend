import { Box, Button, Modal } from '@mui/material';
import { icons } from '../../lib/constants/icons';

type CenteredModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  minWidth?: number | string;
};

const CenteredModal = ({
  open,
  onClose,
  children,
  minWidth = 500,
}: CenteredModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
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
          overflowY: 'auto',
        }}
      >
        <div className="flex flex-row items-center justify-end">
          <Button
            className="flex items-center justify-center"
            onClick={onClose}
            sx={{
              backgroundColor: 'var(--accent-negative)',
            }}
          >
            <icons.close size={20} />
          </Button>
        </div>

        {children}
      </Box>
    </Modal>
  );
};

export default CenteredModal;
