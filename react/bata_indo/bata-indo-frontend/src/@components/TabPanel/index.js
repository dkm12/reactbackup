import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FusePageSimple from '@core/core/PageSimple';





function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    maxWidth: 700,
  },
  layoutRoot: {
    padding: 0
  },
  firstIcon: {
    paddingLeft: 70
  },
  labelContainer: {
    width: 'auto',
    padding: 0
  },
  iconLabelWrapper: {
    flexDirection: 'row',
    '& svg': {
      marginBottom: '0 !important',
      marginRight: '4px'
    }
  },
  iconLabelWrapper2: {
    flexDirection: 'row-reverse'
  },
  tabPanel: {
    width: '100%',
  }
}));

export default function ScrollableTabsButtonForce({tabs, header}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <FusePageSimple
      classes={{
        root: classes.layoutRoot,
        toolbar: 'px-0',
        content: 'mx-0'
      }}
			header={header && header}
      contentToolbar={(
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {tabs && tabs.map((tab,i)=>(
            <Tab 
              classes={{
                wrapper: classes.iconLabelWrapper,
                labelContainer: classes.labelContainer
              }} 
              key={i} 
              label={tab.name} 
              icon={tab.icon} 
              {...a11yProps(i)} 
            />
          ))}
        </Tabs>   
      )}
      content={
				tabs && (
					<div className="flex flex-1 relative overflow-hidden">
            {tabs && tabs.map((tabs, i)=>(
              <TabPanel className={classes.tabPanel} value={value} index={i}>
                {tabs.children}
              </TabPanel>
            ))}
          </div>
      )}
    />
  );
}