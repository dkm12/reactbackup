import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from "react";
import Link from 'next/link'
const index = () => {
  const history = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
    const [head, setHead] = useState(false);
    const ref = useRef(null);
    useOutsideAlerter(ref);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setTimeout(() => {
                        setModalOpen(false)
                    }, 200);

                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    return (
        <>
            <section className="billPaySec">
                <div className="container-fluid">
                    <h2>Bill Payments and Recharges</h2>

                    <div className="tab">
                        <div className="tablinksNew"> <div className="tabImg" onClick={()=>history.push('/services/electricity')}><img className="img30" src="/images/electBill.png" /></div>Electricity</div>
                        <div className="tablinksNew"> <div className="tabImg" onClick={()=>history.push('/services/prepaid')}> <img src="/images/mobPrepaid.png" /> </div>Mobile Prepaid</div>
                        <div className="tablinksNew"> <div className="tabImg" onClick={()=>history.push('/services/postpaid')}><img src="/images/postPaid.png" /></div>Mobile Postpaid</div>
                        <div className="tablinksNew"> <div className="tabImg" onClick={()=>history.push('/services/creditcard')}><img className="img30" src="/images/card.png" /></div>Credit  Card</div>
                        <div className="tablinksNew"> <div className="tabImg" onClick={()=>history.push('/services/pipedgas')}><img className="img30" src="/images/gas.png" /></div>Piped  Gas</div>
                        <div className="tablinksNew"> <div className="tabImg" onClick={()=>history.push('/services/lpg')}><img src="/images/lpg.png" /></div>LPG  Cylinder</div>
                        <div className="tablinksNew"> <div className="tabImg" onClick={()=>history.push('/services/insurance')}><img className="img30" src="/images/insurance.png" /></div>Insurance</div>
                        <div id="first" name="first" ref={ref}>
                            <div className={(isModalOpen) ? "tablinksNew active" : "tablinksNew"} onClick={() => setModalOpen(!isModalOpen)} >
                                <div className="tabImg"><img className="img30" src="/images/allService.png" /></div>All  Services</div>
                            {isModalOpen ? (
                                <div id="sec" className="grid grid-cols-3 gap-10 popupHome" name="sec" ref={ref}>
                                    
                                    <div  className="init-arrow-down"><div className="iconBox"><img src="/images/dthIcon.png" /></div>DTH</div>
                                    <div  className="init-arrow-down"><div className="iconBox"><img src="/images/fastagIcon.png" /></div> Fastag</div>
                                    <div  className="init-arrow-down"><div className="iconBox"><img src="/images/dthIcon.png" /></div>DTH</div>
                                    <div  className="init-arrow-down"><div className="iconBox"><img src="/images/dthIcon.png" /></div>DTH</div>
                                    <div  className="init-arrow-down"><div className="iconBox"><img src="/images/dthIcon.png" /></div>DTH</div>
                                    <div  className="init-arrow-down"><div className="iconBox"><img src="/images/dthIcon.png" /></div>DTH</div>
                                    <div  className="init-arrow-down"><div className="iconBox"><img src="/images/dthIcon.png" /></div>DTH</div>
                                    <div  className="init-arrow-down"><div className="iconBox"><img src="/images/dthIcon.png" /></div>DTH</div>
                                </div>
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </>
    )

}

export default index
