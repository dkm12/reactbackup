import { combineReducers } from '@reduxjs/toolkit';

import empCornersList from './empEmpCornersSlice';
import empCornerForm from './empCornerFormSlice';
import empCornerReportList from './empCornerReportSlice';


const reducer = combineReducers({
    empCornersList,
    empCornerForm,
    empCornerReportList
});

export default reducer;