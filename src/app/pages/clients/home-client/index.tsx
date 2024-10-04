import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import Card from './component/Card';

import './home.css';

export const HomeClient = () => {
   return (
      <Box>
         <Box>
            <Box
               component="img"
               src="https://bizweb.dktcdn.net/100/514/629/themes/951567/assets/slider_1.jpg?1726824761175"
               alt=""
               sx={{
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: '20px',
               }}
            />
         </Box>

         {/* List product */}
         <Box sx={{ mt: 3 }}>
            <Grid container columnSpacing={'20px'} sx={{ marginLeft: '-20px' }}>
               <Grid item xs={4} className="section_product_4">
                  <Box className="section_product_4">
                     <h2 className="title-module">
                        <Link to="do-kho" title="Đồ khô">
                           Đồ khô
                        </Link>
                        <Link className="see-more" to="do-kho" title="Xem thêm">
                           Xem thêm &gt;&gt;
                        </Link>
                     </h2>
                  </Box>
                  <Box>
                     <Card />
                     <Card />
                  </Box>
               </Grid>
               <Grid item xs={4} className="section_product_4">
                  <Box className="section_product_4">
                     <h2 className="title-module">
                        <Link to="do-kho" title="Đồ khô">
                           Đồ khô
                        </Link>
                        <Link className="see-more" to="do-kho" title="Xem thêm">
                           Xem thêm &gt;&gt;
                        </Link>
                     </h2>
                  </Box>
                  <Box>
                     <Card />
                     <Card />
                  </Box>
               </Grid>
               <Grid item xs={4} className="section_product_4">
                  <Box className="section_product_4">
                     <h2 className="title-module">
                        <Link to="do-kho" title="Đồ khô">
                           Đồ khô
                        </Link>
                        <Link className="see-more" to="do-kho" title="Xem thêm">
                           Xem thêm &gt;&gt;
                        </Link>
                     </h2>
                  </Box>
                  <Box>
                     <Card />
                     <Card />
                  </Box>
               </Grid>
            </Grid>
         </Box>
         <Box my={3} className="">
            <a href="/collections/all" className="img_baner" title="Banner">
               <img
                  width="100%"
                  height="290"
                  className="lazyload loaded"
                  src="//bizweb.dktcdn.net/100/514/629/themes/951567/assets/img_banner_index.jpg?1726824761175"
                  data-src="//bizweb.dktcdn.net/100/514/629/themes/951567/assets/img_banner_index.jpg?1726824761175"
                  alt="Banner"
                  data-was-processed="true"
               />
            </a>
         </Box>
         <Box component="section" className="section_3_banner" sx={{ mt: 3 }}>
            <Grid container className="box_banner_index" columnSpacing={3}>
               <Grid item xs={4}>
                  <div className="box_3_banner">
                     <div className="three_banner">
                        <img
                           width="520"
                           height="305"
                           className="lazyload loaded"
                           src="//bizweb.dktcdn.net/100/514/629/themes/951567/assets/img_3banner_1.jpg?1726824761175"
                           data-src="//bizweb.dktcdn.net/100/514/629/themes/951567/assets/img_3banner_1.jpg?1726824761175"
                           alt="Nông sản tươi mới"
                           data-was-processed="true"
                        />
                     </div>
                     <div className="banner-text">
                        <h2>
                           Nông sản tươi mới <br /> Sản phẩm 100% từ <br /> Thiên nhiên
                        </h2>
                        <a href="/collections/all" className="btn btn-xs" title="Xem ngay">
                           Xem ngay
                        </a>
                     </div>
                  </div>
               </Grid>
               <Grid item xs={4}>
                  <div className="box_3_banner">
                     <div className="three_banner">
                        <img
                           width="520"
                           height="305"
                           className="lazyload loaded"
                           src="//bizweb.dktcdn.net/100/514/629/themes/951567/assets/img_3banner_1.jpg?1726824761175"
                           data-src="//bizweb.dktcdn.net/100/514/629/themes/951567/assets/img_3banner_1.jpg?1726824761175"
                           alt="Nông sản tươi mới"
                           data-was-processed="true"
                        />
                     </div>
                     <div className="banner-text">
                        <h2>
                           Nông sản tươi mới <br /> Sản phẩm 100% từ <br /> Thiên nhiên
                        </h2>
                        <a href="/collections/all" className="btn btn-xs" title="Xem ngay">
                           Xem ngay
                        </a>
                     </div>
                  </div>
               </Grid>
               <Grid item xs={4}>
                  <div className="box_3_banner">
                     <div className="three_banner">
                        <img
                           width="520"
                           height="305"
                           className="lazyload loaded"
                           src="//bizweb.dktcdn.net/100/514/629/themes/951567/assets/img_3banner_1.jpg?1726824761175"
                           data-src="//bizweb.dktcdn.net/100/514/629/themes/951567/assets/img_3banner_1.jpg?1726824761175"
                           alt="Nông sản tươi mới"
                           data-was-processed="true"
                        />
                     </div>
                     <div className="banner-text">
                        <h2>
                           Nông sản tươi mới <br /> Sản phẩm 100% từ <br /> Thiên nhiên
                        </h2>
                        <a href="/collections/all" className="btn btn-xs" title="Xem ngay">
                           Xem ngay
                        </a>
                     </div>
                  </div>
               </Grid>
            </Grid>
         </Box>
      </Box>
   );
};
