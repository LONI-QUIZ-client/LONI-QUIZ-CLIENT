import React from 'react';
import './scss/Slider.scss';

const Slider = () => {
    return (
        <div>
            <div className='slider'>
                <div className='image-box'>
                    <div className='insta'><img src={process.env.PUBLIC_URL + "/img/insta.png"} alt="" width='100px' height='100px'/></div>
                    <div className='fc'><img src={process.env.PUBLIC_URL + "/img/face.png"} alt="" width='100px' height='100px'/></div>
                    <div className='tt'><img src={process.env.PUBLIC_URL + "/img/tik.png"} alt="" width='100px' height='100px'/></div>
                    <div className='you'><img src={process.env.PUBLIC_URL + "/img/you.png"} alt="" width='100px' height='100px'/></div>
                    {/*클론*/}
                    <div><img src={process.env.PUBLIC_URL + "/img/insta.png"} alt="" width='100px' height='100px'/></div>
                    <div><img src={process.env.PUBLIC_URL + "/img/face.png"} alt="" width='100px' height='100px'/></div>
                    <div><img src={process.env.PUBLIC_URL + "/img/tik.png"} alt="" width='100px' height='100px'/></div>
                    <div><img src={process.env.PUBLIC_URL + "/img/you.png"} alt="" width='100px' height='100px'/></div>
                    <div><img src={process.env.PUBLIC_URL + "/img/insta.png"} alt="" width='100px' height='100px'/></div>
                    <div><img src={process.env.PUBLIC_URL + "/img/face.png"} alt="" width='100px' height='100px'/></div>
                    <div><img src={process.env.PUBLIC_URL + "/img/tik.png"} alt="" width='100px' height='100px'/></div>
                    <div><img src={process.env.PUBLIC_URL + "/img/you.png"} alt="" width='100px' height='100px'/></div>
                    <div><img src={process.env.PUBLIC_URL + "/img/insta.png"} alt="" width='100px' height='100px'/></div>
                    <div><img src={process.env.PUBLIC_URL + "/img/face.png"} alt="" width='100px' height='100px'/></div>
                    <div><img src={process.env.PUBLIC_URL + "/img/tik.png"} alt="" width='100px' height='100px'/></div>
                    <div><img src={process.env.PUBLIC_URL + "/img/you.png"} alt="" width='100px' height='100px'/></div>
                </div>
            </div>
        </div>
    );
};

export default Slider;