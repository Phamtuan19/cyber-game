/* eslint-disable @typescript-eslint/naming-convention */
import {
   Avatar,
   Box,
   Button,
   Container,
   Grid,
   IconButton,
   InputAdornment,
   ListItemIcon,
   Menu,
   MenuItem,
   OutlinedInput,
   Stack,
   styled,
   Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logout from '@mui/icons-material/Logout';

import stillGamingNoBack from '../../../assets/images/still-gaming-no-back.png';

import Card from './component/card';

import { ROUTE_PATH } from '@constants';
import useAuth from '~/app/redux/slices/auth.slice';
import { USER_TYPE } from '~/app/routes/components/user-type';

export const HeaderClient = () => {
   const navigate = useNavigate();

   const { authLogout, user, isAuhthentication } = useAuth();

   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const isOpen = Boolean(anchorEl);

   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleRedirectProfile = () => {
      handleClose();
   };

   const handleClickLogout = () => {
      handleClose();
      authLogout();
   };

   return (
      <Box
         component="header"
         sx={({ base }) => ({
            width: '100%',
            backgroundColor: base.header.backgroundColor as string,
            padding: 1,
            display: 'flex',
            alignItems: 'center',
         })}
      >
         <Container
            sx={({ base }) => ({ display: 'flex', alignItems: 'center', paddingY: 0, minHeight: base.header.height })}
         >
            <Grid container spacing={2}>
               <Grid item xs={2}>
                  <Image src={stillGamingNoBack} alt="logo" />
               </Grid>
               <Grid item xs={10} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Grid container spacing={2}>
                     <Grid item xs={4}>
                        <OutlinedInputExtend fullWidth />
                     </Grid>
                     <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 3 }}>
                           {user?.user_type === USER_TYPE.ADMIN && (
                              <Link to={ROUTE_PATH.ADMIN_HOME}>
                                 <ButtonExtend
                                    startIcon={
                                       <Image
                                          sx={{ height: 24 }}
                                          src="https://bizweb.dktcdn.net/100/514/629/themes/951567/assets/icon_poly_hea_5.png?1726824761175"
                                       />
                                    }
                                 >
                                    Hệ Thống
                                 </ButtonExtend>
                              </Link>
                           )}
                           <ButtonExtend
                              startIcon={
                                 <Image
                                    sx={{ height: 24 }}
                                    src="https://bizweb.dktcdn.net/100/514/629/themes/951567/assets/icon_poly_hea_1.png?1726824761175"
                                 />
                              }
                           >
                              Yêu Thích
                           </ButtonExtend>
                           <Card />
                           {isAuhthentication ? (
                              <AsideHeader>
                                 <Stack sx={{ flexDirection: 'row', px: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', textAlign: 'center' }}>
                                       <Tooltip title="Account settings">
                                          <IconButton
                                             onClick={handleClick}
                                             size="small"
                                             sx={{ ml: 2 }}
                                             aria-controls={isOpen ? 'account-menu' : undefined}
                                             aria-haspopup="true"
                                             aria-expanded={isOpen ? 'true' : undefined}
                                          >
                                             <Avatar
                                                sx={{ width: 28, height: 28, textTransform: 'uppercase' }}
                                                src={''}
                                             >
                                                {user?.username.split('')[0]}
                                             </Avatar>
                                          </IconButton>
                                       </Tooltip>
                                    </Box>
                                    <Menu
                                       anchorEl={anchorEl}
                                       id="account-menu"
                                       open={isOpen}
                                       onClose={handleClose}
                                       sx={{ zIndex: 999999 }}
                                       PaperProps={stylePaperProps}
                                       transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                       anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                       <MenuItem
                                          component={Link}
                                          to={ROUTE_PATH.USER_PROFILE}
                                          onClick={handleRedirectProfile}
                                       >
                                          <ListItemIcon>
                                             <AccountCircleOutlinedIcon fontSize="small" />
                                          </ListItemIcon>
                                          Tài khoản
                                       </MenuItem>
                                       <MenuItem onClick={handleClickLogout}>
                                          <ListItemIcon>
                                             <Logout fontSize="small" />
                                          </ListItemIcon>
                                          Đăng xuất
                                       </MenuItem>
                                    </Menu>
                                 </Stack>
                              </AsideHeader>
                           ) : (
                              <ButtonExtend startIcon={<LoginIcon />} onClick={() => navigate(ROUTE_PATH.SIGN_IN)}>
                                 Đăng nhập
                              </ButtonExtend>
                           )}
                        </Box>
                     </Grid>
                  </Grid>
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
};

export const Image = styled('img')({
   width: 'auto',
   height: '64px',
});

const OutlinedInputExtend = styled(OutlinedInput)({
   borderRadius: 15,
   backgroundColor: '#FFFFFF',
   '&.css-1d3z3hw-MuiOutlinedInput-notchedOutline': {
      borderColor: 'transparent',
      backgroundColor: '#FFFFFF',
   },
});

export const ButtonExtend = styled(Button)({
   borderColor: 'rgba(0,0,0,0.09)',
   backgroundColor: '#FFFFFF',
   borderRadius: 50,
   paddingLeft: 24,
   paddingRight: 24,
   color: '#212529',
});

ButtonExtend.defaultProps = {
   variant: 'outlined',
};

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

const AsideHeader = styled('div')({
   // width: `calc(100% - ${theme.base.sidebar.width}px)`,
   borderBottom: '1px solid #eff0f6',
   display: 'flex',
   justifyContent: 'flex-end',
   alignItems: 'center',
});

const stylePaperProps = {
   elevation: 0,
   sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
         width: 32,
         height: 32,
         ml: -0.5,
         mr: 1,
      },
      '&:before': {
         content: '""',
         display: 'block',
         position: 'absolute',
         top: 0,
         right: 14,
         width: 10,
         height: 10,
         bgcolor: 'background.paper',
         transform: 'translateY(-50%) rotate(45deg)',
         zIndex: 0,
      },
   },
};
