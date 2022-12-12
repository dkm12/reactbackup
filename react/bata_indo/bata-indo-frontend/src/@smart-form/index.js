import React, { useState, useEffect, useRef, createRef } from 'react';
import { selectMainTheme } from '../app/store/core/settingsSlice';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import Fields from "./Fields";
import TopWrapper from './TopWrapper';
import _ from '@lodash';

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

const ArrayCard = ({ name, label, onChange, defaultValue, register }) =>{
    const [data, setData] = useState([{name: 'chandra kamal'}]);

    const handelAddMore = () => {
        setData([...data, {name: ""}]);
    }

    const handelChange = (e,i) =>{
        let d = data;
        d[i].name = e.target.value;
        setData(d);
        setTimeout(() => {
            onChange(data);
        }, 0);
    }

    return (
        <div>
            <Button onClick={()=>handelAddMore()}>Add More</Button>
            <div>
                {data && data.map((d,i)=>(
                    <>
                    <TextField
                        id="name"
                        name="name"
                        defaultValue={d && d.name}
                        value={d && d.name}
                        ref={register}
                        onChange={e=>handelChange(e,i)}
                    /><br/>
                    </>

                ))}
            </div>
        </div>
    )
}




const useStyles = makeStyles(() => ({
    cell: {
        align: "center",
        padding: 8
    },
    rootFirstSelect: {
        padding: "14px"
    },
    rootSecondSelect: {
        padding: "10px 80px"
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
        background: '#f6f7f9',
        textAlign: 'center',
        padding: '8px 14px',
        marginBottom: '16px',
        fontSize: '18px',
        fontWeight: '400'
    },
    button:{
        margin: 5
    },
    btnContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

 
  
  
// Reusable Form Component
function Form({ template, onSubmit, watchFields, validate, onChange, defaultValues, buttons, onCancel, disabled }) {
    const classes = useStyles();
	const mainTheme = useSelector(selectMainTheme);
    const refSubmitButtom = useRef([]);
    const [values, setValues] = useState({});
    const [buttonName, setButtonName] = useState("");
    const [urName, setUrName] = useState({})
    const [unregisterd, setUnregisterd] = useState([])
    const [btnDisable, setBtnDisable] = useState({});
    const [valid, setValid] = useState(true)

	let { register, unregister, handleSubmit, formState: { errors, isValid, isDirty }, trigger, watch, setError, clearErrors, control, setValue, getValues, reset } = useForm({defaultValues: defaultValues});
	let { layout, title, fields, sections } = template;

    const handelChange = (name, value) => {
        let val = values;
        val = {
            ...val,
            [name]: value
        }
        onChange(val);
        setValues({...val});
    }


    function isEmpty (value) {
        return (
          (value == null) ||
          (value.hasOwnProperty('length') && value.length === 0) ||
          (value.constructor === Object && Object.keys(value).length === 0)
        )
    }

    let urtemp = {};
    const setObjUnName = (obj, fldname) =>{
        let unst = urtemp;
        obj && obj.forEach(uobj=>{
            if(unst && unst[uobj]){
                if(!unst[uobj].includes(fldname)){
                    unst[uobj].push(fldname);
                }
            }else{
                unst = {
                    ...unst,
                    [uobj]:[fldname]
                }
            }
        })
        urtemp = unst
        setUrName(urtemp);
    }
      
    function getNameByKeyName(obj, propKey, btnName) {
        for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    if (typeof obj[property] == "object") {
                        if(property === propKey){
                            setObjUnName(obj[propKey], obj.name)
                        }else if(isEmpty(obj[property])){
                            setObjUnName(obj[propKey], obj.name)
                        }else{
                            getNameByKeyName(obj[property],propKey,btnName);
                        }
                    } else {
                    if(property === propKey){
                        setObjUnName(obj[propKey], obj.name)
                    }
                    if(isEmpty(obj[property])){
                        setObjUnName(obj[propKey], obj.name)
                    }
                    }
                }
        }
    }

    useEffect(() => {
        if (template) {
            let bts = {};
            getNameByKeyName(template, 'unregister');
            if (buttons && buttons.length) {
                buttons.forEach((btn, i) => {
                    bts = {
                        ...bts,
                        [btn]: false
                    }
                })
                setBtnDisable(bts);
                refSubmitButtom.current = buttons.map((element, i) => refSubmitButtom.current[i] ?? createRef());
            }
        }
    }, [template])


    // let watchValues = watch(watchFields);
    // console.log('watchValues :>> ', watchValues);
    // if(validate){
	//     validate(watchValues, { errors, setError, clearErrors, setValid});
    // }

    const handlesubmit = (btn, index) =>{
        setButtonName(btn)
        if(urName[btn] && urName[btn].length){
            // console.log(`urName`, urName)
            urName[btn] && unregister(urName[btn])
        }
        refSubmitButtom && refSubmitButtom.current && refSubmitButtom.current[index] && refSubmitButtom.current[index].current.click();        
    }

    const FormButtons = () => {
        let btnHtml = [];
        if(buttons && buttons.length){
            buttons.forEach((btn,i) => {
                // btn = btn.toLowerCase();
                if(btn !== 'reset'){
                    if((`btn`, btn !== 'cancel')){
                        btnHtml.push(
                            <>
                            <Button className={classes.button} key={btn} type="button" variant="raised" component="button" disabled={btnDisable[btn]} variant="contained" color="primary" size={layout.size} onClick={()=>handlesubmit(btn,i)}>
                                {btn}
                            </Button>
                            <button hidden={true} ref={refSubmitButtom.current[i]} type={"submit"} onClick={handleSubmit(data=>{onSubmit({data, button: btn}); setBtnDisable({...btnDisable, [btn]: true})})}/>
                            </>
                        )
                    }else{
                        btnHtml.push(
                            <Button className={classes.button} key={btn} variant="raised" component="span" variant="contained" color="primary" size={layout.size} onClick={onCancel}>
                                {btn}
                            </Button>
                        )
                    }
                }else{ 
                    if(btn == 'reset'){
                        btnHtml.push(
                            <Button className={classes.button} key={btn} variant="raised" component="span" variant="contained" color="primary" size={layout.size} onClick={()=>reset(defaultValues || {})}>
                                {btn}
                            </Button>
                        )
                    }
                }
                
            })
        }
        return btnHtml;
    }

    // useEffect(() => {
    //     reset(defaultValues);
    // }, [defaultValues])
    const formRender = () => {
        let xsv = (column) => {return column == 1 ? 12 : column == 2 ? 6 : column == 3 ? 4 : column == 4 ? 3 : column == 6 ? 2 : column == 6 ? 2 : 12}
        let spacing = (space) => {return space || 2};
        let size = (sz) => {return sz || ""};
        let html = [];
        if(title){
            html.push(<h4 className={classes.formTitle}>{title}</h4>);
        }
        for(const temp in template){
            if (temp == "fields") {
                html.push(
                    <>
                        <TopWrapper type={layout && layout.type} spacing={spacing(layout && layout.spacing)}>
                            <Fields 
                                {...{
                                    register,
                                    errors,
                                    watch,
                                    setError,
                                    clearErrors,
                                    control,
                                    setValue,
                                    getValues,
                                    onChange,
                                    defaultValues,
                                    reset,
                                    fields,
                                    layout: {xsv: xsv(layout && layout.column), spacing: spacing(layout && layout.spacing), size: size(layout && layout.size), label: layout && layout.label}
                                }}
                            />
                            {/* {renderFields(fields, {xsv: xsv(layout && layout.column), spacing: spacing(layout && layout.spacing), size: size(layout && layout.size)})} */}
                        </TopWrapper>
                    </>
                )
            }else if(temp == "sections"){
                sections.forEach(ele => {
                    html.push(
                        <div key={ele.fields.name}>  
                            {ele && ele.title && (<h2 className={classes.sectionTitle}>{ele.title}</h2>)}
                            <TopWrapper type={layout && layout.type} spacing={spacing(layout && layout.spacing)}>
                                <Fields 
                                    {...{
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
                                        reset,
                                        fields: ele.fields,
                                        layout: {xsv: xsv((ele.layout && ele.layout.column) || (layout && layout.column)), spacing: spacing((ele.layout && ele.layout.spacing) || (layout && layout.spacing)), size: size((ele.layout && ele.layout.size) || (layout && layout.size)), label: (ele.layout && ele.layout.label) || (layout && layout.label)}
                                    }}
                                />
                                {/* {renderFields(ele.fields, {xsv: xsv((ele.layout && ele.layout.column) || (layout && layout.column)), spacing: spacing((ele.layout && ele.layout.spacing) || (layout && layout.spacing)), size: size((ele.layout && ele.layout.size) || (layout && layout.size))})} */}
                            </TopWrapper>
                        </div>
                    )
                });
            }
        }
        
        return html;
    }



	
    
	return (
		<div>
			<ThemeProvider theme={mainTheme}>
				{/* <form onSubmit={handleSubmit(data=>console.log(data))}> */}
					{formRender()}
					<br />
                    <br />
                    {!disabled && buttons && buttons.length && (
                    <div className={classes.btnContainer}>
					    <FormButtons />
                    </div>
                    )}
				{/* </form> */}
			</ThemeProvider>
		</div>
	);
}

export default Form;
