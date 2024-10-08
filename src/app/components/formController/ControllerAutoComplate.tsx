/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, CircularProgress, Box, TextField } from '@mui/material';
import { find, get, isObject, map } from 'lodash';
import React, { useCallback } from 'react';
import { type Control, type FieldValues, type Path, Controller } from 'react-hook-form';
import ClearIcon from '@mui/icons-material/Clear';

interface OptionProps {
   [key: string]: string;
}

interface ControllerAutoComplateProps<TFieldValues extends FieldValues = FieldValues> {
   options: OptionProps[];
   valuePath?: string;
   titlePath?: string;
   id?: string;
   label?: string;
   loading?: boolean;
   multiple?: boolean;
   noOptionsText?: string;
   placeholder?: string;
   disabled?: boolean;
   name: Path<TFieldValues>;
   readOnly?: boolean;
   control: Control<TFieldValues>;
   defaultValue?: string;
   onChange?: (e: any) => void;
   renderOptionChildren?: (props: any, e: any) => React.ReactNode;
}

function ControllerAutoComplate<TFieldValues extends FieldValues = FieldValues>(
   props: ControllerAutoComplateProps<TFieldValues>,
) {
   const {
      id,
      name,
      control,
      options,
      label = '',
      valuePath = 'id',
      titlePath = 'value',
      loading = false,
      noOptionsText = 'Giá trị không hợp lệ!!',
      placeholder,
      disabled = false,
      multiple = false,
      readOnly = false,
      defaultValue = '',
      onChange: onChangeInput = () => {},
      renderOptionChildren,
      ...restProps
   } = props;

   const getValueOption = useCallback(
      (value: any) => {
         if (multiple) {
            const values = map(value, (v: any) => {
               if (!isObject(v)) {
                  const option =
                     find(options, (item: any) => {
                        return get(item, valuePath) === v;
                     }) ?? null;
                  return option;
               }
               return v;
            }).filter(Boolean);

            return values;
         }

         if (value === '') {
            return '';
         }

         return find(options, { [valuePath]: value }) ?? '';
      },
      [options],
   );

   const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: OptionProps) => {
      if (!option) {
         return null;
      }
      if (renderOptionChildren) {
         return renderOptionChildren(props, option);
      }
      return (
         <Box component="li" sx={{ px: 2, py: 1, cursor: 'pointer' }} {...props} key={get(option, valuePath)}>
            {get(option, titlePath)}
         </Box>
      );
   };

   return (
      <Controller
         render={({ field: { ref, onChange, onBlur, value }, fieldState: { error } }) => {
            return (
               <Autocomplete
                  id={id}
                  size="small"
                  sx={{
                     '&.MuiInputBase-input': {
                        height: '21.204px !important',
                     },
                  }}
                  // autoHighlight
                  options={options}
                  isOptionEqualToValue={(option, value) => {
                     if (value instanceof Object) {
                        return get(option, valuePath) === get(value, valuePath);
                     }

                     if (value === '') {
                        return true;
                     }

                     return get(option, valuePath) === value;
                  }}
                  getOptionLabel={(option) => {
                     return option ? String(get(option, titlePath)) + '' : '';
                  }}
                  multiple={multiple}
                  readOnly={readOnly}
                  loading={loading}
                  disabled={disabled}
                  noOptionsText={noOptionsText}
                  renderOption={renderOption}
                  onBlur={onBlur}
                  onChange={(_, value: any) => {
                     if (!multiple) {
                        const newValue = value ? get(value, valuePath) : '';
                        onChange(newValue);
                        return onChangeInput(value);
                     }

                     // return onChange(multiple ? value.map((v) => get(v, valuePath)));
                     const newValueMultiple = value ? value.map((v: any) => get(v, valuePath)) : [];
                     onChange(newValueMultiple);
                     return onChangeInput(value);
                  }}
                  clearIcon={<ClearIcon sx={{ fontSize: '16px' }} />}
                  renderInput={(params) => {
                     return (
                        <TextField
                           {...params}
                           sx={{
                              color: 'red !important',
                              '.MuiInputBase-root': {
                                 paddingTop: '4.8px !important',
                                 paddingBottom: '4.8px !important',
                                 fontSize: '16px !important',
                              },
                           }}
                           placeholder={placeholder}
                           inputRef={ref}
                           error={!!error}
                           helperText={error && error.message}
                           label={label}
                           InputLabelProps={{
                              ...params.InputLabelProps,
                              shrink: true,
                           }}
                           inputProps={{
                              ...params.inputProps,
                           }}
                           InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                 <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                 </>
                              ),
                           }}
                        />
                     );
                  }}
                  {...restProps}
                  value={getValueOption(value) as any}
               />
            );
         }}
         defaultValue={defaultValue as any}
         name={name}
         control={control}
      />
   );
}

export { ControllerAutoComplate };
