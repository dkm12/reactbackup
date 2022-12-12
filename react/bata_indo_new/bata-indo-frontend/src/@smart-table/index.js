import "./utils/polyfill";
import React from "react";
import { defaultProps } from "./default-props";
import { propTypes } from "./prop-types";
import SmartTable from "./smart-table";
import withStyles from "@material-ui/core/styles/withStyles";

SmartTable.defaultProps = defaultProps;
SmartTable.propTypes = propTypes;

export { SmartTable as ST };

const styles = (theme) => ({
  paginationRoot: {
    width: "100%",
  },
  paginationToolbar: {
    padding: 0,
    width: "100%",
  },
  paginationCaption: {
    display: "none",
  },
  paginationSelectRoot: {
    margin: 0,
  },
});

export default withStyles(styles, { withTheme: true })((props) => (
  <SmartTable {...props} ref={props.tableRef} />
));
export * from "./components";
