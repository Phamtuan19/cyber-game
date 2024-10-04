/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, Grid, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

import { getRom } from './service';
import FormAddRoom from './FormAddRoom';
import RoomItem from './components/RoomItem';

import { ROUTE_PATH } from '@constants';
import BaseBreadcrumbs from '@components/design-systems/BaseBreadcrumbs/BaseBreadcrumbs';
import { useSearchParamsHook } from '@hooks';

const breadcrumbs = [
   {
      title: 'Trang Chủ',
      link: ROUTE_PATH.ADMIN_HOME,
   },
];

const Rom = () => {
   const { searchParams } = useSearchParamsHook();
   const [open, setOpen] = useState<boolean>(false);

   const { data: dataRooms } = getRom();

   return (
      <BaseBreadcrumbs arialabel="Danh sách phòng" breadcrumbs={breadcrumbs}>
         <Grid container spacing={2} sx={{ marginBottom: 2 }}>
            <Grid item xs={8}>
               <Box display="flex" gap={2}>
                  <Box sx={{ width: '300px' }}>
                     <OutlinedInputExtend fullWidth placeholder="Nhập phòng" />
                  </Box>

                  <Button
                     component={Link}
                     variant="outlined"
                     to={`?sort=created_at&sort_type=${searchParams['sort_type'] === 'desc' ? 'asc' : 'desc'}`}
                     startIcon={searchParams['sort_type'] === 'desc' ? <NorthIcon /> : <SouthIcon />}
                  >
                     Xắp xếp theo giá
                  </Button>
               </Box>
            </Grid>
            <Grid item xs={4}>
               <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
                  <Button startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                     Thêm phòng
                  </Button>
                  {/* <Button startIcon={<AddIcon />} color="warning" onClick={() => setOpenModalCategory(true)}>
                     Thêm danh mục
                  </Button> */}
               </Box>
            </Grid>
         </Grid>
         <Grid container spacing={2}>
            {dataRooms &&
               dataRooms?.data?.map((item) => (
                  <Grid item xs={3} key={item.id}>
                     <RoomItem room={item} />
                  </Grid>
               ))}
         </Grid>
         <FormAddRoom open={open} setOpen={setOpen} />
      </BaseBreadcrumbs>
   );
};

const OutlinedInputExtend = styled(OutlinedInput)({
   borderRadius: 10,
   backgroundColor: '#FFFFFF',

   '&.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
      backgroundColor: '#FFFFFF',
   },
});

OutlinedInputExtend.defaultProps = {
   fullWidth: true,
   size: 'small',
   endAdornment: (
      <InputAdornment position="end">
         <IconButton
            aria-label="toggle password visibility"
            onClick={() => {}}
            onMouseDown={() => {}}
            onMouseUp={() => {}}
            edge="end"
         >
            <SearchIcon />
         </IconButton>
      </InputAdornment>
   ),
};

export { Rom };
