import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { icons } from '../../../lib/constants/icons';
import CardContainer from '../../common/CardContainer';
import { Typography } from '../../common/Typography';

interface AddInventoryProps {
  onClose: () => void;
}

const AddInventory = ({ onClose }: AddInventoryProps) => {
  const [imageName, setImageName] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageName(e.target.files[0].name);
    }
  };

  return (
    <CardContainer className="w-150 max-h-[80vh] shadow-none border-none flex flex-col overflow-hidden overscroll-contain">
      <form className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden themed-scrollbar-always overscroll-contain pr-1">
        {/* Use 'container' and 'size' for Grid2 compatibility */}
        <Grid container spacing={1}>
          {/* SECTION 1: IDENTITY */}
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel>Product Name</InputLabel>
            <TextField
              fullWidth
              // label="Product Name"
              variant="outlined"
              placeholder="Enter Product Name"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel>Category</InputLabel>
            <TextField
              fullWidth
              select
              defaultValue=""
              placeholder="Select Category"
            >
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
            </TextField>
          </Grid>

          {/* SECTION 2: LOGISTICS */}
          <Grid size={12}>
            <Divider textAlign="left">
              <Typography variant="caption">STOCK CONTROL</Typography>
            </Divider>
          </Grid>

          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{ display: 'flex', direction: 'row', gap: 2 }}
          >
            <Stack>
              <InputLabel>Current Stock</InputLabel>
              <TextField fullWidth type="number" sx={{ width: 125 }} />
            </Stack>

            <Stack>
              <InputLabel>Max Quantity</InputLabel>
              <TextField fullWidth type="number" sx={{ width: 125 }} />
            </Stack>
          </Grid>

          {/* SECTION 3: FINANCIALS */}
          <Grid size={12}>
            <Divider textAlign="left">
              <Typography variant="caption">PRICING</Typography>
            </Divider>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel>Re-order Threshold</InputLabel>
            <TextField
              fullWidth
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <icons.warning
                      size={16}
                      color="var(--accent-warning)"
                      style={{ marginRight: 8 }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <InputLabel>Category</InputLabel>
            <TextField
              fullWidth
              defaultValue=""
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₱</InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* SECTION 4: MEDIA */}
          <Grid size={12} sx={{ mt: 5 }}>
            <Divider textAlign="left" sx={{ mb: 2 }}>
              <Typography variant="caption">MEDIA</Typography>
            </Divider>
          </Grid>

          <Grid size={12}>
            <Box
              sx={{
                p: 3,
                width: '100%',
                // Flexbox ensures children don't "warp" or overlap
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',

                border: '2px dashed #e0e0e0',
                borderRadius: 2,
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

              <icons.cloud
                size={24} // Increased slightly for better visibility
                color="#999"
                style={{ marginBottom: 8 }}
              />

              <Typography
                variant="caption"
                // sx={{
                //   display: 'block',
                //   color: imageName ? 'text.primary' : 'text.secondary',
                //   fontWeight: imageName ? 600 : 400,
                // }}
              >
                {imageName ? imageName : 'Upload Product Image (Optional)'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </form>

      {/* ACTIONS */}
      <div className="mt-5 flex shrink-0 justify-end gap-2">
        <Button
          onClick={onClose}
          sx={{
            bgcolor: 'var(--accent-negative)',
            color: 'white',
            '&:hover': {
              bgcolor: 'var(--accent-negative-hover)',
              color: 'white',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          startIcon={<icons.save />}
          onClick={() => {
            alert('Saving to Django backend...');
            onClose();
          }}
          sx={{
            bgcolor: 'var(--accent-positive)',
            color: 'white',
            '&:hover': {
              bgcolor: 'var(--accent-positive-hover)',
              color: 'white',
            },
          }}
        >
          Add to Inventory
        </Button>
      </div>
    </CardContainer>
  );
};

export default AddInventory;
