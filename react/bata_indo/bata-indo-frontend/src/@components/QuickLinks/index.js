import React from 'react';
import CardHeading from '@core/core/CardHeading';
import LinkIcon from '@material-ui/icons/Link';
import './style.css'

import { Label, GetLabel } from '@common/utils/label';

function Index() {
  return (
    <div className="quicklinks">
      <a href="https://bata.id/" title="Bata Indonesia" class="flex quick-link-row bdr-bottom" target="_blank">
        {/* <span class="align-items-center justify-content-center badge badge-primary badge-pill mr-8">BI</span> */}
        <LinkIcon fontSize="small" className="mr-4" color="primary" />
        Bata Indonesia
      </a>
    </div>
  )
}

export default Index
