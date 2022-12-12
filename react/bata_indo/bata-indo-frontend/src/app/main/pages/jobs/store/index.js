import { combineReducers } from '@reduxjs/toolkit';
import empApplicantsInfo from './empApplicantsInfoSlice';
import empNewPosting from './empNewPostingSlice';
import empNewPostings from './empNewPostingsSlice';
import empApplicantsList from './empApplicantsList';
import empCurrentVacancies from './empCurrentVacanciesSlice';
import referalApplicant from './referalApplicantSlice';
import refEmpNewPostings from './refEmpNewPostingsSlice';
import refEmpActivePostings from './refEmpActivePostingSlice';
import empIjpHistorys from './IJPempHistorySlice';
import myIjpApplication from './myIjpAppSlice';
import myRefApplication from './myRefAppSlice';

const reducer = combineReducers({
	empApplicantsInfo,
	empNewPosting,
	empNewPostings,
	empApplicantsList,
	empCurrentVacancies,
	referalApplicant,
	refEmpNewPostings,
	myIjpApplication,
	myRefApplication,
	refEmpActivePostings,
	empIjpHistorys,
});

export default reducer;
