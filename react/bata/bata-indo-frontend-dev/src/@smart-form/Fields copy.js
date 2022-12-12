import React, { useState, useEffect } from 'react';
import { selectMainTheme } from '../app/store/core/settingsSlice';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Link from '@material-ui/core/Link';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import AttachmentIcon from '@material-ui/icons/Attachment';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Chip from '@material-ui/core/Chip';
import CancelIcon from "@material-ui/icons/Cancel";
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import FieldArray from './FieldArray';
import TopWrapper from './TopWrapper';
import Table from './Table';
import _ from '@lodash';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Tooltip from '@material-ui/core/Tooltip';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { matchSorter } from 'match-sorter';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { unregister } from 'serviceWorker';

function formatDate(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2)
		month = '0' + month;
	if (day.length < 2)
		day = '0' + day;

	return [year, month, day].join('-');
}

export const FieldWrapper = ({ type, content, attr }) => {
	// console.log(`type`, type)
	if (type && type == 'table') {
		return (
			<TableCell className="p-4" component="th" scope="row" style={{ verticalAlign: 'top' }} >
				{content}
			</TableCell>
		)
	} else {
		return (
			<Grid item {...attr}>
				{content}
			</Grid>
		)
	}
}

function todayDate() {
	var d = new Date(),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [year, month, day].join('-');
}
const today = new Date();

const useStyles = makeStyles((theme) => ({
	cell: {
		align: 'center',
		padding: 8
	},
	rootFirstSelect: {
		padding: '14px'
	},
	rootSecondSelect: {
		padding: '10px 80px'
	},
	label: {
		display: 'inline-block',
		marginBottom: '8px'
	},
	formTitle: {
		background: '#ff000000',
		color: '#000',
		textAlign: 'left',
		padding: '8px 0px',
		borderRadius: '5px',
		marginBottom: '16px',
		fontSize: '24px',
		fontWeight: '600'
	},
	sectionTitle: {
		background: '#ff0000',
		color: '#fff',
		textAlign: 'center',
		padding: '8px 14px',
		borderRadius: '5px',
		marginBottom: '16px',
		fontSize: '20px',
		fontWeight: '600'
	},
	button: {
		margin: 5
	},
	btnContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		maxWidth: 300,
	  },
	  chips: {
		display: 'flex',
		flexWrap: 'wrap',
	  },
	  chip: {
		margin: 2,
	  },
	  noLabel: {
		marginTop: theme.spacing(3),
	  },
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, multiselect, theme) {
	return {
	  fontWeight:
	  multiselect.indexOf(name) === -1
		  ? theme.typography.fontWeightRegular
		  : theme.typography.fontWeightMedium,
	};
  }
  
function validator(v1, sm1, v2){
	if(sm1 == ">"){
		return v1 > v2
	}else if(sm1 == "<"){
		return v1 < v2
	}else if(sm1 == "=="){
		return v1 == v2
	}else if(sm1 == "==="){
		return v1 === v2
	}else if(sm1 == "!="){
		return v1 != v2
	}else if(sm1 == "!=="){
		return v1 !== v2
	}else if(sm1 == "<="){
		return v1 <= v2
	}else if(sm1 == ">="){
		return v1 >= v2
	}
}

// Reusable Form Component
function Fields({
	register,
	errors,
	watch,
	control,
	setValue,
	setError,
	clearErrors,
	getValues,
	onChange,
	disabled,
	defaultValues,
	fields,
	layout,
	reset,
	path
}) {
	const classes = useStyles();
	const theme = useTheme();
	const mainTheme = useSelector(selectMainTheme);
	const [values, setValues] = useState({});
	const [multiSelect, setMultiSelect] = useState([]);	
	const [inputAutoValue, setInputAutoValue] = useState({})

	let { xsv, spacing, size } = layout;

	const fxsv = (column) => { return column == 1 ? 12 : column == 2 ? 6 : column == 3 ? 4 : column == 6 ? 2 : 12 }
	const fspacing = (space) => { return space || 2 };
	const fsize = (sz) => { return sz || "" };

	const handelChange = (name, value) => {
		let val = values;
		val = {
			...val,
			[name]: value
		};
		if (onChange) {
			onChange(val);
		}
		setValues({ ...val });
	};

	
	const handelSaveValue = (name, value) => {
		setValue(name, value);
	};



	const calculation = ({ field, name }) => {
		let start = _.some(field.calculation.from, _.method('includes', '*'));
		let forThis = _.some(field.calculation.from, _.method('includes', 'this*'));
		let watchValues = [];
		let watchArrayValue = [];
		let onerowdata = {};
		let arrttname = name.split(/\.(?=[^\.]+$)/);
		field.calculation.from.forEach(val => {
			if (val.includes('*')) {
				if (val.includes('this*')) {
					onerowdata = watch(arrttname[0]);
					var flname = val.split('*')[1];
					watchValues.push(Number(onerowdata[flname]));
				} else {
					watchArrayValue = watch(val.split('*')[0]);
					watchArrayValue && watchArrayValue.forEach(av => {
						watchValues.push(Number(av[val.split('*')[1]]));
					})
				}
			} else {
				let wf = watch(val);
				watchValues.push(Number(wf))
			}
		});

		// if(start){
		//     if(forThis){
		//         onerowdata = watch(arrttname[0]);
		//         field.calculation.from.forEach(val=>{
		//             var flname = val.split('*')[1];
		//             watchValues.push(Number(onerowdata[flname]));
		//         });
		//     }else{
		//         field.calculation.from.forEach(val=>{
		//             watchArrayValue = watch(val.split('*')[0]);
		//             watchArrayValue && watchArrayValue.forEach(av=>{
		//                 watchValues.push(Number(av[val.split('*')[1]]));
		//             })
		//         })
		//     }
		// }else{
		//     let wf = watch(field.calculation.from);
		//     wf && wf.forEach(val=>{
		//         watchValues.push(Number(val))
		//     })
		// }
		// // console.log(field.name,`---watchValues---`, watchValues)
		// // console.log(field.name, `--watchArrayValue---`, watchArrayValue)

		if (field.calculation.type == "add") {
			// console.log(name,`---calculation---`, watchValues)
			// setValue(name, _.sum(watchValues));
			let calc = 0;
			if (watchValues.length) {
				watchValues.forEach(val => {
					if (val) {
						calc += val;
					}
				})
			}
			if (watch(name) !== calc) {
				setValue(name, calc)
			}
			return calc || 0
		} else if (field.calculation.type == "multiplication") {
			console.log(name,`---calculation multiplication---`, watchValues)
			// setValue(name, _.sum(watchValues));
			let calc = 1;
			if (watchValues.length) {
				watchValues.forEach(val => {
					if (val) {
						calc *= val;
					}
				})
			}
			if (watch(name) !== calc) {
				setValue(name, calc)
			}
			return calc || 0
		} else if (field.calculation.type == "division") {
			// console.log(name,`---calculation---`, watchValues)
			// setValue(name, _.sum(watchValues));
			let calc = 0;
			if (watchValues.length) {
				watchValues.forEach(val => {
					if (val) {
						calc /= val;
					}
				})
			}
			if (watch(name) !== calc) {
				setValue(name, calc)
			}
			return calc || 0
		}
	}

	return (
		<>
			{fields.map(field => {
				let preValue = {};
				let {
					title,
					type,
					name,
					validationProps,
					dynamic,
					options,
					defaultValue,
					min,
					max,
					maxlength,
					minlength,
					bind,
					widget,
					multiple,
					accept,
					maxSize,
					subFields,
					fileName,
					pattern
				} = field;
				// console.log(`validationProps`, validationProps)

				let disableField = {};
				if (field && field.disabled == false) {
					disableField = {}
				} else if (field && field.disabled == true) {
					disableField = {
						disabled: 'disabled'
					}
				} else if (disabled) {
					disableField = {
						disabled: 'disabled'
					}
				}

				if (field && field.type !== 'section' && field.layout && field.layout.column) {
					xsv =
						field.layout.column == 1
							? 12
							: field.layout.column == 2
								? 6
								: field.layout.column == 3
									? 4
									: 12;
				}

				let maxDate = {}, minDate = {};

				if(field && field.type == "date"){
					if(field && field.min == "today"){
						minDate = {
							inputProps:{
								min: todayDate()
							}
						}
					}else if(field && field.max == "today"){
						minDate = {
							inputProps:{
								max: todayDate()
							}
						}
					}

					
					if(field && field.min && field.min !== "today"){
						minDate = {
							inputProps:{
								min: todayDate()
							}
						}
					}else if(field && field.max == "today"){
						minDate = {
							inputProps:{
								max: todayDate()
							}
						}
					}
				}
                

				if (defaultValues) {
					preValue = {
						defaultValue: defaultValues[name] || defaultValue
					};
					if(type == "multiSelect" && !Array.isArray(preValue.defaultValue)){
						if(preValue.defaultValue){
							preValue.defaultValue = preValue.defaultValue.split(',');
						}
					}
				}

				if(type == "multiSelect" && preValue && preValue.defaultValue && preValue.defaultValue.length && multiSelect.length == 0){
					setMultiSelect(preValue.defaultValue);
				}

				let sectionProps = {
					register,
					errors,
					watch,
					control,
					setValue,
					setError,
					clearErrors,
					getValues,
					disabled,
					onChange,
					reset,
					defaultValues,
					fields: field.fields,
					layout: { xsv: fxsv((field.layout && field.layout.column) || (layout && layout.column)), spacing: fspacing((field.layout && field.layout.spacing) || (layout && layout.spacing)), size: fsize((field.layout && field.layout.size) || (layout && layout.size)), label: (field.layout && field.layout.label) || (layout && layout.label) }
				}

				let registerName = name;
				if (path) {
					registerName = `${path}.${name}`;
					preValue = {
						defaultValue: _.get(defaultValues, registerName)
					}
					sectionProps = {
						...sectionProps,
						path: path
					}
					// console.log(`registerName`, _.get(defaultValues, registerName, 'default'))
				}

				if(bind){
					console.log(`bind.data`, bind.data)
					if(bind && bind.field && bind.field.indexOf('*') == -1){
						// setValue(registerName, bind.data[watch(bind['field'])])
						// preValue = {
						// 	defaultValue: bind.data[watch(bind['field'])]
						// }
					}else{
						let dName = bind && `${path}.${bind['field'].split('*')[1]}`; 
						console.log(`bind.data[watch(dName)]`, bind.data[watch(dName)])
						if(bind.data[watch(dName)] && watch(registerName) !== bind.data[watch(dName)]){
							setValue(registerName, bind.data[watch(dName)] || 0)
						}
						preValue = {
							defaultValue: bind.data[watch(dName)] || 0
						}
						// setValue(registerName, bind.data[watch(dName)] || 0)
					}
				}
				let filterOptions = (options, { inputValue }) => matchSorter(options, inputValue, {keys: ['value', 'title']});

				let validateObj = {}

				if(!_.isEmpty(validationProps)){
					let enableValidation = true;
					if(validationProps.validateRow && validationProps.validateRow.length){
						let tempchaker = false;
						validationProps.validateRow.forEach(fldname=>{
							if(watch(path+'.'+fldname)){
								tempchaker = true;
							}
						})
						if(!tempchaker){
							enableValidation = false;
						}
					}
					if(validationProps.enable){
						let cs = validationProps.enable.split(" ");	
						if(validationProps.enable.indexOf('"') > -1){
						  var sp1 = validationProps.enable.split('"');
						  cs = sp1[0].trim().split(' ');
						  cs.push(sp1[1])
						}					
						console.log(`cs00000000000000>>>>>>>>>>>>`, cs)
						cs.forEach((element,i) => {
							if(!(element && element.indexOf('*') == -1)){
								cs[i] = `${path}.${element.split('*')[1]}`;
							}
						});
						let checker = validator(watch(cs[0]), cs[1], cs[2])
						
						console.log(`checker>>>>>>>>>>>>`, checker)
						enableValidation = checker
						console.log(`errors`, errors, registerName)
						if(!checker && _.get(errors, registerName)){
							console.log(`registerName errors`, registerName)
							// clearErrors(registerName);
						}
					}
					if(enableValidation) {
					for(const vp in validationProps){
						if(vp == "required"){
							validateObj={
								...validateObj,
								required: validationProps[vp]
							}
						}else if(vp == "validate" && validationProps[vp].length){
							validationProps[vp].forEach((vld, i)=>{
								let cs = vld.condition.split(" ");
								cs.forEach((element,i) => {
									if(!(element && element.indexOf('*') == -1)){
										cs[i] = `${path}.${element.split('*')[1]}`;
									}
								});
								let checker = validator(watch(cs[0]), cs[1], watch(cs[2]))
								
								if(type=="date"){
									checker = validator(new Date(watch(cs[0])), cs[1], new Date(watch(cs[2])))
								}
								if(checker && _.get(errors, registerName)){
									// clearErrors(registerName);
								}
								if(validateObj.validate){
									validateObj={
										...validateObj,
										validate: {
											...validateObj.validate,
											["validate"+i]: (value) => checker || vld.message
										}
									}

								}else{
									validateObj={
										...validateObj,
										validate: {
											["validate"+i]: (value) => checker || vld.message
										}
									}
								}

							})
						}else if(vp == "manual" && validationProps[vp].length){
							validationProps[vp].forEach((vld, i)=>{
								let cs = vld.condition.split(" ");
								cs.forEach((element,i) => {
									if(!(element && element.indexOf('*') == -1)){
										cs[i] = `${path}.${element.split('*')[1]}`;
									}
								});
								let checker = validator(watch(cs[0]), cs[1], (Number(cs[2]) || cs[2]))
								if(type=="date"){
									if(cs[2] == "today"){
										checker = validator(new Date(watch(cs[0])), cs[1], new Date(todayDate()))
									}else{
										checker = validator(new Date(watch(cs[0])), cs[1], new Date(cs[2]))
									}
								}
								// console.log(`checker && _.get(errors, registerName)`, checker, _.get(errors, registerName))
								// if(checker && _.get(errors, registerName)){
								// 	clearErrors(registerName);
								// }
								if(validateObj.validate){
									validateObj={
										...validateObj,
										validate: {
											...validateObj.validate,
											["validateManual"+i]: (value) => checker || vld.message
										}
									}
								}else{
									validateObj={
										...validateObj,
										validate: {
											["validateManual"+i]: (value) => checker || vld.message
										}
									}
								}
							})
						}else if(vp == "maxLength"){
							let ml = watch(registerName);
							if(ml && ml.length > validationProps[vp].value && !_.get(errors, registerName)){
								setError(registerName, {
									type: "maxLength",
									message: validationProps[vp].message
								})
							}else if(ml && ml.length <= validationProps[vp].value && _.get(errors, registerName) && _.get(errors, registerName).type === 'maxLength'){
								clearErrors(registerName)
							}
						}else if(vp == "minLength"){
							let ml = watch(registerName);
							if(ml && ml.length < validationProps[vp].value && !_.get(errors, registerName)){
								setError(registerName, {
									type: "minLength",
									message: validationProps[vp].message
								})
							}else if(ml && ml.length >= validationProps[vp].value && _.get(errors, registerName) && _.get(errors, registerName).type === 'minLength'){
								clearErrors(registerName)
							}
						}else if(vp == "max"){
							let ml = watch(registerName);
							if(ml > validationProps[vp].value && !_.get(errors, registerName)){
								setError(registerName, {
									type: "max",
									message: validationProps[vp].message
								})
							}else if(ml <= validationProps[vp].value && _.get(errors, registerName) && _.get(errors, registerName).type === 'max'){
								clearErrors(registerName)
							}
						}else if(vp == "min"){
							let ml = watch(registerName);
							if(ml < validationProps[vp].value && !_.get(errors, registerName)){
								setError(registerName, {
									type: "min",
									message: validationProps[vp].message
								})
							}else if(ml >= validationProps[vp].value && _.get(errors, registerName) && _.get(errors, registerName).type === 'min'){
								clearErrors(registerName)
							}
						}else if(vp == "size" && type == "file"){
							let filesize = watch(registerName) && watch(registerName)[0] && watch(registerName)[0].size || 0;
							let fsz = (filesize / 1024);
							if(fsz > (validationProps[vp].value * 1024) && !_.get(errors, registerName)){
								setError(registerName, {
									type: "size",
									message: validationProps[vp].message
								})
							}else if(fsz <= (validationProps[vp].value * 1024) && _.get(errors, registerName) && _.get(errors, registerName).type === 'size'){
								clearErrors(registerName)
							}
						}else if(vp == "pattern"){
							validateObj={
								...validateObj,
								pattern: {
									value: validationProps[vp].value,
									message: validationProps[vp].message
								}
							}
						}
					}
					}
				}

				let showField = true;
				if(dynamic){
					unregister(dynamic.field);
					if(dynamic && dynamic.field && dynamic.field.indexOf('*') == -1){
						if(dynamic && dynamic.value){
							showField = dynamic ? watch(dynamic['field']) && dynamic['value'].includes(watch(dynamic['field'])) : true;
							if(dynamic.value.includes("undefind") && !showField){
								showField =  watch(dynamic['field']) ? false : true;
							}
						}else if(dynamic && dynamic.isNotValue){
							showField = dynamic ? watch(dynamic['field']) && !dynamic['isNotValue'].includes(watch(dynamic['field'])) : true;
						}
					}else{
						let dName = dynamic && `${path}.${dynamic['field'].split('*')[1]}`; 
						if(dynamic && dynamic.value){
							showField = dynamic ? watch(dName) && dynamic['value'].includes(watch(dName)) : true;
							if(dynamic.value.includes("undefind") && !showField){
								showField =  watch(dName) ? false : true;
							}
						}else if(dynamic && dynamic.isNotValue){
							showField = dynamic ? watch(dName) && !dynamic['isNotValue'].includes(watch(dName)) : true;
						}
					}
				}
				
				if (!showField) return null;

				switch (type) {
					case 'blank':
						return (							
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<TextField
										id={name}
										{...register(registerName, { ...validateObj })}
										disabled
										variant="outlined"
										fullWidth
										size={size}											
										inputProps={{
											maxlength: maxlength,
											minlength: minlength
										}}
										style={{opacity: 0}}
									/>
								}
							/>
						)
					case 'hidden':
						return (
							<imput
								type="hidden"
								{...register(registerName, { ...validateObj })}
								{...preValue}
							/>
						);
					case 'text':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={name}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											{...register(registerName, { ...validateObj, pattern })}
											{...preValue}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
											}}
											{...disableField}
											variant="outlined"
											fullWidth
											size={size}											
											inputProps={{
												maxlength: maxlength,
												minlength: minlength
											}}
											error={_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) ? true : false}
											helperText={
												_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) ? _.get(errors, registerName).message : ''
											}
										/>
									</>
								}
							/>
						);
					case 'number':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={registerName}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											type="number"
											{...register(registerName, validateObj)}
											{...preValue}
											value={field && field.calculation ? calculation({ field, name: registerName }) : register(registerName).value}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
												if(e.target.value == 0){
													setError(name, {
														type: 'manual',
														message: 'Should not be empty or 0.'
													})
												}else if(e.target.value == null || e.target.value > 0){
													if (errors && _.get(errors, registerName) && _.get(errors, registerName)['type'] === 'manual') {
														clearErrors(name);
													}
												}
											}}
											{...disableField}
											variant="outlined"
											fullWidth
											size={size}										
											inputProps={{
												maxlength: maxlength,
												minlength: minlength,
												max: max,
												min: min,
												readOnly: field && field.calculation ? true : false
											}}
											error={_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) ? true : false}
											helperText={
												_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) ? _.get(errors, registerName).message : ''
											}
										/>
										
										{/* {field && field.calculation && calculation(field)} */}
										{/* {_.get(errors, registerName) && _.get(errors, registerName).type === "required" && <span className="red-text">{_.get(errors, registerName).message}</span>} */}
										{/* <input type="text"  id={name} {...register(registerName, validateObj)} /> */}
										{/* {errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>} */}
									</>
								}
							/>
						);
					case 'email':
						return (

							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={name}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											type="email"
											{...register(registerName, validateObj)}
											{...preValue}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
											}}
											{...disableField}
											variant="outlined"
											fullWidth
											size={size}
											error={_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) ? true : false}
											helperText={
												_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) ? _.get(errors, registerName).message : ''
											}
										/>
										{/* {_.get(errors, registerName) && _.get(errors, registerName).type === "required" && <span className="red-text">{_.get(errors, registerName).message}</span>} */}
										{/* <input type="email" id={name} {...register(registerName, validateObj)} /> */}
										{/* {errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>} */}
									</>
								}
							/>
						);
					case 'tel':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={name}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											type="tel"
											{...register(registerName, validateObj)}
											{...preValue}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
											}}
											{...disableField}
											variant="outlined"						
											inputProps={{
												maxlength: maxlength,
												minlength: minlength,
												min: min,
												max: max
											}}
											fullWidth
											size={size}
											error={_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) ? true : false}
											helperText={
												_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) ? _.get(errors, registerName).message : ''
											}
										/>
										{/* {_.get(errors, registerName) && _.get(errors, registerName).type === "required" && <span className="red-text">{_.get(errors, registerName).message}</span>} */}
										{/* <input type="email" id={name} {...register(registerName, validateObj)} /> */}
										{/* {errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>} */}
									</>
								}
							/>
						);
					case 'textarea':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={name}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											multiline
											rows={4}
											{...register(registerName, { ...validateObj, pattern })}
											{...preValue}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
											}}
											{...disableField}
											variant="outlined"
											fullWidth
											size={size}							
											inputProps={{
												maxlength: maxlength,
												minlength: minlength
											}}
											error={_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) ? true : false}
											helperText={
												_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) ? _.get(errors, registerName).message : ''
											}
										/>
									</>
								}
							/>
						);
					case 'checkbox':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										<FormControl
											component="fieldset"
											error={_.get(errors, registerName) && _.get(errors, registerName).type === 'required' ? true : false}
											size={size}
											style={{ flexDirection: 'row' }}
										>
											<label
												htmlFor={name}
												style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
											>
												{title} :{' '}
											</label>
											<Controller
												{...register(registerName, validateObj)}
												control={control}
												render={({ field }) => (
													<FormControlLabel
														{...field}
														onChange={e => {
															field.onChange(e);
															handelChange(name, e.target.checked);
															handelSaveValue(name, e.target.checked);
														}}
														{...disableField}
														control={
															<Checkbox
																defaultChecked={preValue.defaultValue}
																id={name}
																color="primary"
															/>
														}
													/>
												)}
											/>
											{_.get(errors, registerName) && _.get(errors, registerName).type === 'required' && (
												<FormHelperText style={{ display: 'flex', alignItems: 'center' }}>
													{_.get(errors, registerName).message}
												</FormHelperText>
											)}
										</FormControl>
										{/* <label>
								<input type="checkbox" id={name} {...register(registerName, validateObj)} />
								<span>{title}</span>
								{errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>}
							</label> */}
									</>
								}
							/>
						);
					case 'radio':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										<FormControl
											component="fieldset"
											error={_.get(errors, registerName) && _.get(errors, registerName).type === 'required' ? true : false}
											size={size}
										>
											<label htmlFor={name} style={{ display: 'flex', alignItems: 'center' }}>
												{title} :{' '}
											</label>
											<Controller
												{...register(registerName, validateObj)}
												control={control}
												render={({ field }) => (
													<>
														<RadioGroup
															{...field}
															onChange={e => {
																field.onChange(e);
																handelChange(name, e.target.value);
																handelSaveValue(name, e.target.value);
															}}
															row
															style={{ height: '62px' }}
														>
															{options.map(radio => (
																<FormControlLabel
																	value={radio.value}
																	{...disableField}
																	{...preValue}
																	control={<Radio size={size} />}
																	label={radio.title}
																	labelPlacement={radio.labelPlacement || 'start'}
																/>
															))}
														</RadioGroup>
													</>
												)}
											/>
											{_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) && (
												<FormHelperText style={{ display: 'flex', alignItems: 'center' }}>
													{_.get(errors, registerName).message}
												</FormHelperText>
											)}
										</FormControl>
										{/* <FormControl component="fieldset">
                                <FormLabel component="legend">{title}</FormLabel>
                                <RadioGroup aria-label={name} {...register(registerName, validateObj)}>
                                    {field && field.options.map(radio=>(
                                        <FormControlLabel value={radio.value} control={<Radio />} label={radio.title} />
                                    ))}
                                </RadioGroup>
                            </FormControl> */}
										{/* <label>
                                <input type="checkbox" id={name} {...register(registerName, validateObj)} />
                                <span>{title}</span>
                                {errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>}
                            </label> */}
									</>
								}
							/>
						);
					case 'slider':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										<FormControl
											component="fieldset"
											error={_.get(errors, registerName) && _.get(errors, registerName).type === 'required' ? true : false}
											size={size}
											style={{ width: '100%' }}
										>
											<label
												htmlFor={name}
												style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
											>
												{title}:
											</label>
											<Controller
												control={control}
												{...preValue}
												{...register(registerName, validateObj)}
												render={({ field: { onChange } }) => (
													<Slider
														name={name}
														onChange={(_, value) => {
															onChange(value);
															handelChange(name, value);
															handelSaveValue(name, value);
														}}
														{...disableField}
														valueLabelDisplay="auto"
														defaultValue={preValue.defaultValue}
														max={0}
														max={max}
														step={1}
													/>
												)}
											/>
											{_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) && (
												<FormHelperText style={{ display: 'flex', alignItems: 'center' }}>
													{_.get(errors, registerName).message}
												</FormHelperText>
											)}
										</FormControl>
									</>
								}
							/>
						);
					case 'date':
						return (
							<FieldWrapper 
                                type={layout && layout.type}  
                                attr={{xs:xsv,  key: name, spacing: spacing}}
                                content={
                                    <>
								{layout.label == 'fixed' && (
									<label htmlFor={name} className={classes.label}>
										{title}
									</label>
								)}
								<TextField
									id={name}
									label={layout.label !== 'fixed' && layout.label !== 'blank'  ? title : ''}
									type="date"
                                    {...register(registerName, { ...validateObj })}
                                    onChange={e => {
                                        register(registerName).onChange(e);
                                        handelChange(name, e.target.value);
										handelSaveValue(name, e.target.value);
                                    }}
                                    {...disableField} 
									defaultValue={preValue.defaultValue && formatDate(preValue.defaultValue)}
									// {...preValue}
									InputLabelProps={{
										shrink: true
									}}
									{...minDate}
									{...maxDate}
									// inputProps={{
									// 	min: todayDate()
									// }}
                                    {...disableField}
									variant="outlined"
									fullWidth
									size={size}
									error={_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) ? true : false}
									helperText={
										_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) ? _.get(errors, registerName).message : ''
									}
								/>
							</>
                                }
                            />
						);
					case 'select':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										{layout.label == 'fixed' && title && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<FormControl
											error={_.get(errors, registerName) && _.get(errors, registerName).type === 'required' ? true : false}
											variant="outlined"
											fullWidth
											size={size}
										>
											{layout.label !== 'fixed' && title && <InputLabel id={name}>{title}</InputLabel>}
											<Controller
												render={({ field }) => {
													let properties = {};
													if (layout.label !== 'fixed') {
														properties = {
															labelId: name,
															label: title
														};
													}
													return (
														<>
															<Select
																native
																id={name}
																{...properties}
																{...field}
																onChange={e => {
																	field.onChange(e);
																	handelChange(name, e.target.value);
																	handelSaveValue(name, e.target.value);
																}}
																{...disableField}
															>
																<option value="" />
																{options && options.map(option => (
																	<option value={option.value}>{option.title}</option>
																))}
															</Select>
														</>
													);
												}}
												control={control}
												{...preValue}
												{...register(registerName, validateObj)}
											/>
											{_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) && (
												<FormHelperText>{_.get(errors, registerName).message}</FormHelperText>
											)}
										</FormControl>
										{/* {errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>} */}
										{/* <FormControl component="fieldset">
                                <FormLabel component="legend">{title}</FormLabel>
                                <RadioGroup aria-label={name} {...register(registerName, validateObj)}>
                                    {field && field.options.map(radio=>(
                                        <FormControlLabel value={radio.value} control={<Radio />} label={radio.title} />
                                    ))}
                                </RadioGroup>
                            </FormControl> */}
										{/* <label>
                                <input type="checkbox" id={name} {...register(registerName, validateObj)} />
                                <span>{title}</span>
                                {errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>}
                            </label> */}
									</>
								}
							/>
						);
					case 'autocomplete':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										{layout.label == 'fixed' && title && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<FormControl
											error={_.get(errors, registerName) && _.get(errors, registerName).type === 'required' ? true : false}
											variant="outlined"
											fullWidth
											size={size}
										>
											{layout.label !== 'fixed' && title && <InputLabel id={name}>{title}</InputLabel>}
											<Autocomplete
												id={name}
												{...register(registerName, validateObj)}
												{...preValue}
												options={options}
												getOptionLabel={(option) => option.title}
												filterOptions={filterOptions}																
												onChange={(e, data) => {
													register(registerName).onChange(e);
													// field.onChange(data);
													handelChange(name, data);
													handelSaveValue(name, data);
												}}
												inputValue={inputAutoValue && inputAutoValue[registerName]}
												onInputChange={(_, newInputValue) => {
													setInputAutoValue({...inputAutoValue, [registerName]: newInputValue})
												}}
												style={{ width: '100%' }}
												fullWidth
												renderInput={(params) => <TextField {...params} label={title} variant="outlined" fullWidth/>}
											/>
											{_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) && (
												<FormHelperText>{_.get(errors, registerName).message}</FormHelperText>
											)}
										</FormControl>
										{/* {errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>} */}
										{/* <FormControl component="fieldset">
								<FormLabel component="legend">{title}</FormLabel>
								<RadioGroup aria-label={name} {...register(registerName, validateObj)}>
									{field && field.options.map(radio=>(
										<FormControlLabel value={radio.value} control={<Radio />} label={radio.title} />
									))}
								</RadioGroup>
							</FormControl> */}
										{/* <label>
								<input type="checkbox" id={name} {...register(registerName, validateObj)} />
								<span>{title}</span>
								{errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>}
							</label> */}
									</>
								}
							/>
						);
					case 'multiSelect':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<FormControl
											error={_.get(errors, registerName) && _.get(errors, registerName).type === 'required' ? true : false}
											variant="outlined"
											fullWidth
											size={size}
										>
											{layout.label !== 'fixed' && <InputLabel id={name}>{title}</InputLabel>}
											<Select
												labelId={name}
												id="demo-mutiple-chip"
												multiple
												{...preValue}
												{...register(registerName, validateObj)}
												value={multiSelect}
												onChange={e=>{
													setMultiSelect(e.target.value);
													register(registerName).onChange(e);
													handelChange(name, e.target.value);
													handelSaveValue(name, e.target.value);
												}}
												input={<Input id="select-multiple-chip" />}
												renderValue={(selected) => (
													<div className={classes.chips}>
													{selected && selected.length && selected.map((value) => (
														value &&
														<Chip
															key={value}
															label={options && options.filter(ch=>ch.value == value)[0].title}
															clickable
															deleteIcon={
															<CancelIcon
																onMouseDown={(event) => event.stopPropagation()}
															/>
															}
															className={classes.chip}
															onDelete={(e) => {
																let ms = multiSelect;
																let index = ms.indexOf(value);
																if (index > -1) {
																	ms.splice(index, 1);
																}
																setMultiSelect(ms);
																handelChange(name, ms);
																handelSaveValue(name, ms);
															}}
														/>
													))}
													</div>
												)}
          										MenuProps={MenuProps}
												variant="outlined"					
												{...disableField}
												>
													<MenuItem value="" />
													{options && options.length && options.map(option => (
														<MenuItem key={option.value} value={option.value} style={getStyles(option.value, multiSelect, theme)}>{option.title}</MenuItem>
													))}
											</Select>
											{_.get(errors, registerName) && (_.get(errors, registerName) || _.get(errors, registerName).type === 'required' || _.get(errors, registerName).type === 'manual' ) && (
												<FormHelperText>{_.get(errors, registerName).message}</FormHelperText>
											)}
										</FormControl>
										{/* {errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>} */}
										{/* <FormControl component="fieldset">
								<FormLabel component="legend">{title}</FormLabel>
								<RadioGroup aria-label={name} {...register(registerName, validateObj)}>
									{field && field.options.map(radio=>(
										<FormControlLabel value={radio.value} control={<Radio />} label={radio.title} />
									))}
								</RadioGroup>
							</FormControl> */}
										{/* <label>
								<input type="checkbox" id={name} {...register(registerName, validateObj)} />
								<span>{title}</span>
								{errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>}
							</label> */}
									</>
								}
							/>
						);
					case 'url':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										{/* <label htmlFor={name}>{title}</label> */}
										{layout.label == 'fixed' && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<TextField
											id={name}
											label={layout.label !== 'fixed' && layout.label !== 'blank' ? title : ''}
											type="url"
											{...register(registerName, validateObj)}
											{...preValue}
											onChange={e => {
												register(registerName).onChange(e);
												handelChange(name, e.target.value);
												handelSaveValue(name, e.target.value);
											}}
											{...disableField}
											variant="outlined"
											fullWidth
											size={size}
										/>
										{errors && _.get(errors, registerName) && <span className="red-text">{_.get(errors, registerName)['message']}</span>}
									</>
								}
							/>
						);
					case 'ckeditor':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										{/* <label htmlFor={name}>{title}</label> */}
										{layout.label == 'fixed' && title && (
											<label htmlFor={name} className={classes.label}>
												{title}
											</label>
										)}
										<Controller
											render={({ field }) => {
												let properties = {};
												if (layout.label !== 'fixed') {
													properties = {
														labelId: name,
														label: title
													};
												}
												return (
													<>
														<CKEditor
															id={name}
															{...properties}
															editor={ ClassicEditor }
															data={preValue.defaultValue}
															onChange={ ( event, editor ) => {
																const data = editor.getData();
																console.log({ event, editor, data });
																field.onChange(data);
																handelChange(name, data);
																handelSaveValue(name, data);
															}}															
															{...disableField}
															
														/>
													</>
												);
											}}
											control={control}
											{...preValue}
											{...register(registerName, validateObj)}
										/>
										{errors && _.get(errors, registerName) && <span className="red-text" style={{color: '#f44336'}}>{_.get(errors, registerName)['message']}</span>}
									</>
								}
							/>
						);
					case 'file':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										<div style={{ display: 'flex', alignItems: 'center', height: '100%', minHeight: '38px' }}>
											<input
												accept={accept}
												className={classes.input}
												style={{ display: 'none' }}
												id={registerName}
												multiple={multiple}
												type="file"
												{...register(registerName, validateObj)}
												onChange={e => {
													register(registerName).onChange(e);
													handelChange(name, e.target.files[0]);
												}}
											/>
											<Tooltip title={watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name || "Add File"}>
												<label htmlFor={registerName}>
													<IconButton color={watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name ? "secondry" : "primary"} aria-label="upload picture" size={size} component="span">
														<AttachFileIcon />
													</IconButton>
													<span
														style={{
															marginLeft: '10px',
															display: 'flex',
															alignItems: 'center',
															height: '100%'
														}}
													>
														{fileName && watch(registerName) && watch(registerName)[0] && watch(registerName)[0].name}
													</span>
												</label>
											</Tooltip>
											{console.log('file', errors)}
											{errors && _.get(errors, registerName) && (
												<span className="red-text" style={{color: '#f44336'}}>{_.get(errors, registerName)['message']}</span>
											)}
										</div>
									</>
								}
							/>
						);
					case 'attachment':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<>
										{title && (<label htmlFor={name} className={classes.label}>
											{title + ': '}
										</label>)}
										<Tooltip title={preValue.defaultValue && preValue.defaultValue.substring(preValue.defaultValue.lastIndexOf('/')+1)}>
										
										<Link href={preValue.defaultValue} target="_blank" download style={{ backgroundColor: '#00000000', marginLeft: '10px' }}>
											<AttachmentIcon />
											{fileName && preValue.defaultValue && preValue.defaultValue.substring(preValue.defaultValue.lastIndexOf('/')+1)}
										</Link>

										</Tooltip>
										{/* <IconButton color="primary" component="link" to= download>

										</IconButton> */}
									</>
								}
							/>
						);
					case 'array':
						return (
							<FieldArray
								{...{
									path: registerName,
									control,
									register,
									defaultValues,
									getValues,
									watch,									
									setError,
									clearErrors,
									setValue,
									errors,
									name,
									disabled,
									reset,
									subFields,
									arrLayout: field.layout,
									columns: field.columns
								}}
							/>
						);
					case 'table':
						return (
							(preValue.defaultValue && (
								<FieldWrapper
									type={layout && layout.type}
									attr={{ xs: xsv, key: name, spacing: spacing }}
									content={
										<Table
											columns={field.columns}
											rows={preValue.defaultValue}
										/>
									}
								/>))
						);
					case 'section':
						return (
							<FieldWrapper
								type={layout && layout.type}
								attr={{ xs: xsv, key: name, spacing: spacing }}
								content={
									<Grid container spacing={2}>
										<Fields
											{...sectionProps}
										/>
									</Grid>
								}
							/>
						);
					default:
						return (
							<Grid item xs={xsv} key={name}>
								<span className="red-text">Invalid Field</span>
							</Grid>
						);
				}
			})}
		</>
	);
}

export default Fields;
