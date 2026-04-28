import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputAdornment,
  InputLabel,
  Stack,
  TextField,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Typography } from '../../common/Typography';

interface CreateCategoryFormProps {
  onClose: () => void;
  existingCategories: {
    id: string;
    name: string;
  }[];
  others: string;
}
const CreateCategoryForm = ({
  onClose,
  existingCategories,
  others,
}: CreateCategoryFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    color: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //transform Capitalize first letter
    const payload = {
      name:
        formData?.name.charAt(0).toUpperCase() +
        formData?.name.slice(1).toLocaleLowerCase(),
      color: formData?.color,
    };

    alert(`
        Category: ${payload.name}
        Color: ${payload.color}
      `);
  };

  /**
   * Sync Logic:
   * 1. Strips '#' for the text input display.
   * 2. Adds '#' back for the color wheel state.
   */
  // Check if the current color is valid (stripping the # for the check)
  const isInvalidColor = useMemo(() => {
    const cleanHex = formData.color.replace('#', '');
    // Check if it's empty or doesn't match hex pattern
    return cleanHex.length > 0 && !/^([0-9A-F]{3}){1,2}$/i.test(cleanHex);
  }, [formData.color]);

  const handleColorChange = (newVal: string) => {
    const cleanValue = newVal.replace(/#/g, '').slice(0, 6);
    setFormData({ ...formData, color: `#${cleanValue}` });
  };

  const buttonConfigs = [
    {
      label: 'Cancel',
      type: 'button',
      onClick: () => onClose(),
      sx: {
        backgroundColor: 'var(--accent-negative)',
        color: 'var(--invert-text)',
        '&:hover': {
          backgroundColor: 'var(--accent-negative-hover)',
          // filter: 'brightness(0.95)',
        },
      },
    },
    {
      label: 'Save Category',
      type: 'submit',
      sx: {
        backgroundColor: 'var(--accent-positive)',
        color: 'var(--invert-text)',
        '&:hover': {
          backgroundColor: 'var(--accent-positive-hover)',
          // filter: 'brightness(0.95)',
        },
      },
    },
  ];

  // Remove Others string
  const filteredExistingCategories = useMemo(() => {
    return existingCategories.filter((item) => {
      return item.name !== others;
    });
  }, [existingCategories]);

  return (
    <form onSubmit={handleSubmit} className="">
      <Stack spacing={3}>
        {/* Category Name Field */}
        <FormControl>
          <FormLabel className="text-(--main-text)">Category Name </FormLabel>

          <TextField
            fullWidth
            placeholder="e.g., Electronics, Heavy Equipment"
            value={formData.name}
            onChange={(e) => {
              const exists = filteredExistingCategories.find(
                (item) =>
                  item.name.toLocaleLowerCase() ===
                  e.target.value.toLowerCase(),
              );
              if (exists) {
                alert('ITEM EXISTS');
              }
              setFormData({ ...formData, name: e.target.value });
            }}
            required
            variant="outlined"
          />
        </FormControl>

        {/* Color Selection Section */}
        <Box>
          <InputLabel sx={{ color: 'var(--main-text)' }}>
            Category Color (for Charts)
          </InputLabel>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={4}
            alignItems="center"
          >
            {/* The Wheel/Square Picker */}
            <Box
              sx={{
                '& .react-colorful': { width: '200px', height: '200px' },
                boxShadow: '0px 8px 24px rgba(0,0,0,0.12)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--main-bg-divider)',
              }}
            >
              <HexColorPicker
                color={formData.color}
                onChange={handleColorChange}
              />
            </Box>

            {/* Sync Logic: Input + Preview */}
            <Stack spacing={3} sx={{ width: '100%', maxWidth: '200px' }}>
              <Stack spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: formData.color,
                    border: '5px solid var(--main-bg)',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                    transition: 'background-color 0.15s ease',
                  }}
                />
                <Typography variant="code" className="bg-(--main-bg)">
                  PREVIEW
                </Typography>
              </Stack>

              <TextField
                label="Hex Value"
                size="small"
                // We display the color without the '#' because the StartAdornment provides it
                value={formData.color.replace('#', '')}
                onChange={(e) => handleColorChange(e.target.value)}
                required
                // ERROR HANDLING HERE
                error={isInvalidColor}
                helperText={
                  isInvalidColor ? 'Enter a valid 3 or 6-digit hex code' : ''
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="code" className="bg-(--main-bg)">
                        #
                      </Typography>
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 6,
                  style: {
                    textTransform: 'uppercase',
                  },
                }}
              />
            </Stack>
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Box className="flex flex-row gap-3 justify-end pt-6 ">
          {buttonConfigs.map((item, index) => (
            <Button
              key={index}
              type={item?.type as 'button' | 'submit'}
              onClick={item?.onClick}
              variant={'contained'}
              sx={{
                px: 4,
                py: 1.2,
                borderRadius: '8px',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: 'none',
                ...item?.sx,
              }}
            >
              {item?.label}
            </Button>
          ))}
        </Box>
      </Stack>
    </form>
  );
};

export default CreateCategoryForm;
