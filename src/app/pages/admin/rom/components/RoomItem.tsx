import { Box, Chip, Stack, Typography } from '@mui/material';

import { LazyLoadingImage } from '@components';
import noImage from '@assets/images/no-image.png';

const RoomItem = ({ room }: { room: RoomItem }) => {
   return (
      <div>
         <Box sx={{ width: '263.250px', height: '263.250px' }}>
            <LazyLoadingImage
               width="100%"
               height="100%"
               className="lazyload loaded"
               src={room.image_url ?? noImage}
               data-src={room.image_url}
               alt={room.room_name}
               data-was-processed="true"
               style={{
                  borderRadius: '10px',
                  width: '263.250px',
                  height: '263.250px',
               }}
            />
         </Box>
         <Box mt={2}>
            <Typography variant="h6">{room.room_name}</Typography>
            <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
               <Typography variant="h6" fontSize="16px">
                  Trạng thái:
               </Typography>
               <Typography variant="h6" fontSize="16px">
                  <Chip label={room.status ? 'Còn phòng' : 'Hết phòng'} color={room.status ? 'success' : 'error'} />
               </Typography>
            </Stack>
         </Box>
      </div>
   );
};

export default RoomItem;
