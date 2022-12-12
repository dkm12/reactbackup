import OurPartner from "../../components/OurPartner"
import BillPay from "../../components/BillPay"
import Banner from "../../components/Banner"
import PayBizz from "../../components/PayBizz"
export default function Dashboard() {
  return (
    <>
      <Banner />
      <BillPay />
      {/* <!--------------banking service sec start--------------> */}
      <section className="bankingSec">
        <div className="container-fluid">
          <h2>Banking & Payment Services</h2>
          <div className="contentSpace">
            <div className="flex flex-wrap">
              <div className="w-full md:w-8/12 px-4">
                <h3>Aadhaar Enabled Payment System (AePS)  </h3>
                <p>AePS is a bank led model which allows online interoperable financial inclusion transaction at PoS (MicroATM) through the Business correspondent of any bank using the Aadhaar authentication. AePS allows you to do six types of transactions.</p>
                <button className="btn btn-sm btn-primary">Read More</button>
              </div>
              <div className="w-full md:w-4/12 px-4"><img className="pull-right" src="/images/aadhar-img.png" /></div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--------------DMT sec start--------------> */}
      <section className="dmtSec">
        <div className="container-fluid">
          <div className="contentSpace">
            <div className="flex flex-wrap">
              <div className="w-full md:w-4/12 px-4"><img src="/images/dmtImg.png" /></div>
              <div className="w-full md:w-8/12 px-4">
                <h3>Direct Money Transfer (DMT)</h3>
                <p>Direct Money Transfer (DMT) is a unique service that can be used to send money instantly to any Bank's account holder within India</p>
                <button className="btn btn-sm btn-primary">Read More</button>
              </div>
            </div>
          </div></div>
      </section>
      {/* <!--------------aadhar sec start--------------> */}
      <section className="aadharSec">
        <div className="container-fluid">
          <div className="contentSpace">
            <div className="flex flex-wrap">
              <div className="w-full md:w-8/12 px-4">
                <h3>Aadhaar Pay</h3>
                <p>Aadhaar Pay is a payment system which allows retailers to collect payments from a customer using his Aadhaar number and biometric authentication.</p>
                <button className="btn btn-sm btn-primary">Read More</button>
              </div>
              <div className="w-full md:w-4/12 px-4"><img className="pull-right" src="/images/aadhaarPay.png" /></div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--------------mini ATM sec start--------------> */}
      <section className="miniAtmSec">
        <div className="container-fluid">
          <div className="contentSpace">
            <div className="flex flex-wrap">
              <div className="w-full md:w-4/12 px-4"><img src="/images/miniAtm.png" /></div>
              <div className="w-full md:w-8/12 px-4">
                <h3>Mini ATM Machine</h3>
                <p>Biometric devices : Devices can be used by the retailers for finger print authentication</p>
                <button className="btn btn-sm btn-primary">Read More</button>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* <!--------------biometric sec start--------------> */}
      <section className="biometricSec">
        <div className="container-fluid">
          <div className="contentSpace">
            <div className="flex flex-wrap">
              <div className="w-full md:w-8/12 px-4">
                <h3>Biometric Devices</h3>
                <p>Biometric devices : Devices can be used by the retailers for finger print authentication</p>
                <button className="btn btn-sm btn-primary">Read More</button>
              </div>
              <div className="w-full md:w-4/12 px-4"><img className="pull-right" src="/images/bioMetric.png" /></div>
            </div>
          </div>
        </div>
      </section>
      {/* <!--------------payBizz sec start--------------> */}

      <PayBizz />
      {/* <!--------------our partner sec start--------------> */}
      <OurPartner />

    </>
  );
}