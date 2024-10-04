/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Box, FormHelperText, MenuItem, OutlinedInput, Select } from '@mui/material';
import { type Control, Controller, type FieldValues } from 'react-hook-form';

interface ControllerSelectProps<TFieldValues extends FieldValues = FieldValues> {
   options: { [key: string]: any }[];
   name: string;
   valuePath?: string;
   titlePath?: string;
   defaultValue?: string;
   control: Control<TFieldValues>;
   placeholder?: string;
}

function ControllerSelect(props: ControllerSelectProps<FieldValues>): React.ReactNode {
   const {
      options,
      name,
      defaultValue,
      valuePath = 'id',
      titlePath = 'name',
      control,
      placeholder = '',
      ...rest
   } = props;

   return (
      <Controller
         render={({ field, fieldState: { error } }) => {
            return (
               <React.Fragment>
                  <Select
                     displayEmpty
                     fullWidth
                     variant="outlined"
                     id={name}
                     error={Boolean(error)}
                     size="small"
                     {...field}
                     {...rest}
                     renderValue={(selected) => {
                        if (selected.length === 0) {
                           return (
                              <Box component="span" sx={{ color: '#BCBCBC' }}>
                                 {placeholder}
                              </Box>
                           );
                        }
                        return options.find((item) => String(item[valuePath]) === String(selected))?.[titlePath] ?? '';
                     }}
                     input={<OutlinedInput />}
                  >
                     {options.map((option, index) => {
                        return (
                           <MenuItem key={index} value={option[valuePath]}>
                              {option[titlePath]}
                           </MenuItem>
                        );
                     })}
                  </Select>
                  {error && (
                     <FormHelperText variant="standard" sx={({ palette }) => ({ color: palette.error.main, ml: 1 })}>
                        {error.message}
                     </FormHelperText>
                  )}
               </React.Fragment>
            );
         }}
         defaultValue={defaultValue || ''}
         name={name}
         control={control}
      />
   );
}
export { ControllerSelect };
