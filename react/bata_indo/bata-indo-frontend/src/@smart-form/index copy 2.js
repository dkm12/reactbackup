import React, { useState, useEffect } from 'react';
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import _ from '@lodash';
import Fields from "./Fields";

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


export const TopWrapper = props => {
    if(props.type && props.type == 'table'){
        return (
            <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
                <TableRow
                    className="h-48"
                >
                    {props.children}
                </TableRow>
            </Table>
        )
    }else {
        return (
            <Grid container spacing={props.spacing} style={{marginBottom: '16px', marginTop: '16px'}}>
                {props.children}
            </Grid>
        )
    }
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
        background: '#ff0000',
        color: '#fff',
        textAlign: 'center',
        padding: '8px 14px',
        borderRadius: '5px',
        marginBottom: '16px',
        fontSize: '20px',
        fontWeight: '600'
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
function Form({ template, onSubmit, watchFields, validate, onChange, defaultValues, buttons, onCancel }) {
    const classes = useStyles();
	const mainTheme = useSelector(selectMainTheme);
    const [values, setValues] = useState({});

	let { register, handleSubmit, formState: { errors }, watch, setError, clearErrors, control, setValue, getValues, reset } = useForm({defaultValues: defaultValues});
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

    

    const FormButtons = () => {
        let btnHtml = [];
        if(buttons && buttons.length){
            buttons.forEach(btn => {
                // btn = btn.toLowerCase();
                if(btn !== 'reset'){
                    if((`btn`, btn !== 'cancel')){
                        btnHtml.push(
                            <Button className={classes.button} key={btn} type="submit" variant="raised" component="button" variant="contained" color="secondary" size={layout.size} onClick={handleSubmit(data=>onSubmit({data, button: btn}))}>
                                {btn}
                            </Button>
                        )
                    }else{
                        btnHtml.push(
                            <Button className={classes.button} key={btn} variant="raised" component="span" variant="contained" color="secondary" size={layout.size} onClick={onCancel}>
                                {btn}
                            </Button>
                        )
                    }
                }else{ 
                    if(btn == 'reset'){
                        console.log(`reset`)
                        btnHtml.push(
                            <Button className={classes.button} key={btn} variant="raised" component="span" variant="contained" color="secondary" size={layout.size} onClick={()=>reset(defaultValues || {})}>
                                {btn}
                            </Button>
                        )
                    }
                }
            })
        }
        return btnHtml;
    }

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues])
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
                                    control,
                                    setValue,
                                    getValues,
                                    onChange,
                                    defaultValues,
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
                                        getValues,
                                        onChange,
                                        defaultValues,
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



	let watchValues = watch(watchFields);
    if(validate){
	    validate(watchValues, { errors, setError, clearErrors });
    }
    
	return (
		<div>
			<ThemeProvider theme={mainTheme}>
				<form onSubmit={handleSubmit(data=>console.log(data))}>
					{formRender()}
					<br />
                    <br />
                    <div className={classes.btnContainer}>
					    <FormButtons />
                    </div>
				</form>
			</ThemeProvider>
		</div>
	);
}

export default Form;
