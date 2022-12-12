import React, { useEffect, useState } from 'react';
import CardHeading from '@core/core/CardHeading';
import LinkIcon from '@material-ui/icons/Link';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getActiveQuickLinks, selectQuickLink } from '../../app/main/pages/QuickLinks/Store/quickLinkList';


import { Label, GetLabel } from '@common/utils/label';


function Index() {
  const dispatch = useDispatch();
  const quicklinks = useSelector(selectQuickLink);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
  }, [quicklinks]);

  useEffect(() => {
    dispatch(getActiveQuickLinks());
    setLoading(true);
  }, [dispatch]);

  useEffect(() => {
    console.log('quicklinks :>> ', quicklinks);
  }, [quicklinks])
  return (
    <>
    <div className="quicklinks">
      {quicklinks && quicklinks.map((link, index) => {
        return (<>
            <a href={link.quickLinksUrl} title={link.quickLinksTitle} class="flex quick-link-row bdr-bottom" target="_blank">
              <LinkIcon fontSize="small" className="mr-4" color="primary" />
              {link.quickLinksTitle}
            </a>
        </>)

      })}
    </div>
    </>
    // <div className="quicklinks">
    //   <a href="https://bata.id/" title="Bata Indonesia" class="flex quick-link-row bdr-bottom" target="_blank">
    //     {/* <span class="align-items-center justify-content-center badge badge-primary badge-pill mr-8">BI</span> */}
    //     <LinkIcon fontSize="small" className="mr-4" color="primary" />
    //     Bata Indonesia
    //   </a>
    // </div>
  )
}

export default withRouter(Index)
