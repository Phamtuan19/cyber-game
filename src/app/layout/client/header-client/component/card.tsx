/* eslint-disable @typescript-eslint/naming-convention */
import { Popover, Typography } from '@mui/material';
import React from 'react';

import { ButtonExtend, Image } from '..';

function Card() {
   const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

   const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handlePopoverClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);

   return (
      <>
         <ButtonExtend
            aria-owns={open ? 'mouse-over-popover' : undefined}
            type="button"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            startIcon={
               <Image
                  sx={{ height: 24 }}
                  src="https://bizweb.dktcdn.net/100/514/629/themes/951567/assets/icon_poly_hea_4.png?1726824761175"
               />
            }
         >
            Giỏ Hàng
         </ButtonExtend>
         <Popover open={open} anchorEl={anchorEl} sx={{ zIndex: 1200 }} disableRestoreFocus>
            <Typography sx={{ p: 1 }}>I use Popover.</Typography>
         </Popover>
      </>
   );
}

export default Card;
