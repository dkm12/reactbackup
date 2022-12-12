import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
const index = () => {
    const imagesUrl = [{
        image: "/images/logo1.jpg",
        link: "https://dummylink.com",
        text: "Our Partner 1"
    },
    {
        image: "/images/logo2.jpg",
        link: "https://dummylink.com",
        text: "Our Partner 2"
    },
    {
        image: "/images/logo3.jpg",
        link: "https://dummylink.com",
        text: "Our Partner 3"
    },
    {
        image: "/images/logo4.jpg",
        link: "https://dummylink.com",
        text: "Our Partner 4"
    }]

    return (
        <>
            {/* <Carousel>
                <div>
                    <img src="/images/logo1.jpg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="/images/logo1.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="/images/logo1.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel> */}

            <section className="ourPartner">
                <div className="container-fluid">
                    <h2>Our Patners </h2>
                    <Carousel responsive={responsive} 
                    // autoPlay={true} 
                    autoPlaySpeed={3000}
                    centerMode={true} 
                    // partialVisbile={true}
                    // arrows={false}
                    infinite={true}>
                        {imagesUrl.map((n)=>{return(<img src={n.image} style={{height:"70px", width:"200px"}} alt={n.text} className="blueBdr" />)})}
                    </Carousel>
                    {/* <div className="carousel slide text-center" id="carousellogo" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="item active">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="boxBlue">
                                            <div className="imgSec">
                                                <a target="_blank" href="#" title="Text">
                                                    <img src="/images/logo1.jpg" alt="User" className="blueBdr" />
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="boxBlue">
                                            <div className="imgSec">
                                                <a target="_blank" href="#" title="Text">
                                                    <img src="/images/logo2.jpg" alt="User" className="blueBdr" />
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="boxBlue">
                                            <div className="imgSec">
                                                <a target="_blank" href="#" title="Text">
                                                    <img src="/images/logo3.jpg" alt="User" className="blueBdr" />
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="boxBlue">
                                            <div className="imgSec">
                                                <a target="_blank" href="#" title="Text">
                                                    <img src="/images/logo4.jpg" alt="User" className="blueBdr" />
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <a className="left carousel-control" href="#carousellogo" data-slide="prev">
                            <span className="carousel-control-prev-icon"></span>
                        </a>
                        <a className="right carousel-control" href="#carousellogo" data-slide="next">
                            <span className="carousel-control-next-icon"></span>
                        </a>
                    </div> */}
                </div>
            </section>
        </>
    )
}

export default index
