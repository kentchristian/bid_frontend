import { Box, Modal } from '@mui/material';

type CenteredModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: number | string;
};

const CenteredModal = ({
  open,
  onClose,
  children,
  maxWidth = 500,
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
          maxWidth: maxWidth,
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default CenteredModal;
