import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid, // Use Grid2 for modern MUI compatibility
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
// Using React Icons (Fi for Feather, Md for Material Design)
import { FiAlertTriangle, FiSave, FiUploadCloud, FiX } from 'react-icons/fi';

interface AddInventoryProps {
  open: boolean;
  onClose: () => void;
}

const AddInventory = ({ open, onClose }: AddInventoryProps) => {
  const [imageName, setImageName] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageName(e.target.files[0].name);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { borderRadius: 3, p: 1 },
      }}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" fontWeight="700">
          Add New Inventory Item
        </Typography>
        <IconButton onClick={onClose} size="small">
          <FiX size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderTop: '1px solid #eee' }}>
        <Box component="form" sx={{ mt: 1 }}>
          {/* Use 'container' and 'size' for Grid2 compatibility */}
          <Grid container spacing={3}>
            {/* SECTION 1: IDENTITY */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Product Name"
                variant="outlined"
                placeholder="e.g. Sony A7IV"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField fullWidth select label="Category" defaultValue="">
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="furniture">Furniture</MenuItem>
              </TextField>
            </Grid>

            {/* SECTION 2: FINANCIALS */}
            <Grid size={12}>
              <Divider textAlign="left">
                <Typography variant="caption" color="text.secondary">
                  PRICING
                </Typography>
              </Divider>
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Unit Price"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* SECTION 3: LOGISTICS */}
            <Grid size={12}>
              <Divider textAlign="left">
                <Typography variant="caption" color="text.secondary">
                  STOCK CONTROL
                </Typography>
              </Divider>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Current Stock" type="number" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField fullWidth label="Max Quantity" type="number" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Threshold"
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiAlertTriangle
                        size={16}
                        color="orange"
                        style={{ marginRight: 8 }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* SECTION 4: MEDIA */}
            <Grid size={12}>
              <Box
                sx={{
                  p: 3,
                  border: '2px dashed #e0e0e0',
                  borderRadius: 2,
                  textAlign: 'center',
                  bgcolor: '#fafafa',
                  transition: '0.2s',
                  '&:hover': {
                    bgcolor: '#f5f5f5',
                    cursor: 'pointer',
                    borderColor: '#ccc',
                  },
                }}
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                />
                <FiUploadCloud
                  size={28}
                  color="#999"
                  style={{ marginBottom: 8 }}
                />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: 'block' }}
                >
                  {imageName ? imageName : 'Upload Product Image (Optional)'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<FiSave />}
          onClick={() => {
            alert('Saving to Django backend...');
            onClose();
          }}
          sx={{
            px: 4,
            borderRadius: 2,
            bgcolor: 'var(--accent-primary)',
            '&:hover': { opacity: 0.9, bgcolor: 'var(--accent-primary)' },
          }}
        >
          Add to Inventory
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddInventory;
