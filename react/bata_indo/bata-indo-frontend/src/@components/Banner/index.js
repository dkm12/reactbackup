import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getActiveBanners, selectBanners } from '../../app/main/pages/Banner/store/bannerListSlice';

const getConfigurableProps = () => ({
    showThumbs: false,
    autoPlay: true,
    interval: 3000,
    infiniteLoop: true
});
function Index() {
    const history = useHistory();
    const dispatch = useDispatch();
    const banners = useSelector(selectBanners);

    useEffect(() => {
        dispatch(getActiveBanners());
    }, [dispatch]);
    useEffect(() => {
        console.log('banners>>>>>>>>>>', banners)
    }, [banners]);

    return (
        <Carousel {...getConfigurableProps()}>
            {banners && banners.map((banner, index) => {
                if (index < 3) {
                    return (<>
                        <div  >
                            <img src={banner.imageUrl} style={{ maxHeight: '230px', objectFit: 'cover' }} alt="" />
                            {/* <p className="legend">Legend 1</p> */}
                        </div>
                    </>)
                }
            })}
        </Carousel >

        // <Carousel {...getConfigurableProps()}>
        //     <div>
        //         <img src="/assets/images/banner/banner-1.jpg" alt="" />
        //         {/* <p className="legend">Legend 1</p> */}
        //     </div>
        //     <div>
        //         <img src="/assets/images/banner/banner-2.jpg" alt="" />
        //     </div>

        // </Carousel>

    );
}

export default Index;
