import styles from "../../styles/footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container-fluid">
          <div className="mobileApp">
            <div className="text-center flex justify-center">Download our Mobile App <span className="ml-4 flex"><img src="/images/apple-icon.jpg" /> <img src="/images/andIcon.jpg" /></span></div>
          </div>
          <div className="footerTop">
            <div className="flex flex-wrap">
              <div className="w-full md:w-3/12 sm:w-6/12 px-4">
                <h4>General</h4>
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Services</a></li>
                  <li><a href="#">Join Us</a></li>
                  <li><a href="#">Become a Partner</a></li>
                  <li><a href="#">Careers</a></li>
                </ul>
              </div>
              <div className="w-full md:w-3/12 sm:w-6/12 px-4">
                <h4>Legal</h4>
                <ul>
                  <li><a href="#">Terms & Conditions</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Grievance Policy</a></li>
                  <li><a href="#">Refund Policy</a></li>
                  <li><a href="#">Disclaimer</a></li>
                </ul>

              </div>
              <div className="w-full md:w-3/12 sm:w-6/12 px-4">
                <h4>Help & Support</h4>
                <ul>
                  <li><a href="#">Contact Us</a></li>
                  <li><a href="#">FAQ's</a></li>
                  <li><a href="#">Feedback</a></li>
                  <li><a href="#">Register Complaint</a></li>
                </ul>
              </div>
              <div className="w-full md:w-3/12 sm:w-6/12 px-4">
                <h4>Want to stay up to date?</h4>
                <div className="input-group mb-3 emailSub flex">
                  <input type="text" className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Enter Your Email" />
                  <div className="input-group-append border-0 py-3 placeholder-blueGray-300 text-blueGray-600">
                    <span className={styles.inputGroupText} id="basic-addon2">Subscribe</span>
                  </div>
                </div>
                <p>Subscribe to Newsletter and receive new ads in inbox</p>
                <div className="social flex mt-4">
                  <div className="icon flex justify-center align-center"><a href="#" target="_blank"><img src="/images/linkedin.svg" /></a></div>
                  <div className="icon flex justify-center align-center"><a href="#" target="_blank"><img src="/images/twitter.svg" /></a></div>
                  <div className="icon flex justify-center align-center"><a href="#" target="_blank"><img src="/images/facebook.svg" /></a></div>
                  <div className="icon flex justify-center align-center"><a href="#" target="_blank"><img src="/images/youtube.png" /></a></div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="copyText">
          &copy; Copyright 2021 Jodhpur Drk Private Limited | All rights reserved.
        </div>
      </footer>
    </>
  );
}
