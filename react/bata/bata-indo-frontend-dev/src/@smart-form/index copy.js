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
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import FieldArray from "./FieldArray";

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
function Form({ template, onSubmit, watchFields, validate, onChange, preloadedValues, buttons, onCancel }) {
    const classes = useStyles();
	const mainTheme = useSelector(selectMainTheme);
    const [values, setValues] = useState({});

	let { register, handleSubmit, formState: { errors }, watch, setError, clearErrors, control, setValue, getValues, reset } = useForm({defaultValues: preloadedValues});
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
                            <Button className={classes.button} key={btn} variant="raised" component="span" variant="contained" color="secondary" size={layout.size} onClick={()=>reset(preloadedValues || {})}>
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
        reset(preloadedValues);
    }, [preloadedValues])
    const formRender = () => {
        let xsv = (column) => {return column == 1 ? 12 : column == 2 ? 6 : column == 3 ? 4 : 12}
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
                        <Grid container spacing={spacing(layout && layout.spacing)} key={temp} style={{marginBottom: '16px', marginTop: '16px'}}>
                            {renderFields(fields, {xsv: xsv(layout && layout.column), spacing: spacing(layout && layout.spacing), size: size(layout && layout.size)})}
                        </Grid>
                    </>
                )
            }else if(temp == "sections"){
                sections.forEach(ele => {
                    html.push(
                        <div key={ele.fields.name}>  
                            <h2 className={classes.sectionTitle}>{ele.title}</h2>
                            <Grid container spacing={spacing((ele.layout && ele.layout.spacing) || (layout && layout.spacing))} style={{marginBottom: '16px', marginTop: '16px'}}>
                                {renderFields(ele.fields, {xsv: xsv((ele.layout && ele.layout.column) || (layout && layout.column)), spacing: spacing((ele.layout && ele.layout.spacing) || (layout && layout.spacing)), size: size((ele.layout && ele.layout.size) || (layout && layout.size))})}
                            </Grid>
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
    

    
	const renderFields = (fields, {xsv, spacing, size}) => {
		return fields.map(field => {
            let preValue = {}
			let { title, type, name, validationProps, dynamic, options, defaultValue, min, max, widget, multiple, accept, subFields } = field;
            let showField = dynamic ? watch(dynamic['field']) === dynamic['value'] : true;

            if(field && field.layout && field.layout.column){
                xsv = field.layout.column == 1 ? 12 : field.layout.column == 2 ? 6 : field.layout.column == 3 ? 4 : 12
            }

            if(preloadedValues){
                preValue = {
                    defaultValue: preloadedValues[name] || defaultValue
                }
            }
			if (!showField) return null;

			switch (type) {
				case 'text':
                    // console.log(register(name, {...validationProps}))
					return (
                        <Grid item xs={xsv} key={name} spacing={spacing}>
							{layout.label == "fixed" && <label htmlFor={name} className={classes.label}>{title}</label>}
							<TextField
								id={name}
								label={layout.label !== "fixed" ? title : ''}
								{...register(name, {...validationProps})}
                                {...preValue}
                                onChange={(e) => {
                                    register(name).onChange(e);
                                    handelChange(name, e.target.value);
                                }}
								variant="outlined"
                                fullWidth
                                size={size}
                                error={errors[name] && errors[name].type === "required" ? true : false}
                                helperText= {errors[name] && errors[name].type === "required" ? errors[name].message : ""}
							/>
                            {/* {errors[name] && errors[name].type === "required" && <span className="red-text">{errors[name].message}</span>} */}
							{/* <input type="text"  id={name} {...register(name, validationProps)} /> */}
							{/* {errors && errors[name] && <span className="red-text">{errors[name]['message']}</span>} */}
                        </Grid>
					);
                case 'number':
                    return (
                        <Grid item xs={xsv} key={name} spacing={spacing}>
                            {layout.label == "fixed" && <label htmlFor={name} className={classes.label}>{title}</label>}
                            <TextField
                                id={name}
                                label={layout.label !== "fixed" ? title : ''}
                                type="number"
                                {...register(name, validationProps)}
                                {...preValue}
                                onChange={(e) => {
                                    register(name).onChange(e);
                                    handelChange(name, e.target.value);
                                }}
                                variant="outlined"
                                fullWidth
                                size={size}
                                InputProps={{
                                    inputProps: { 
                                        max: {max}, min: {min} 
                                    }
                                }}
                                error={errors[name] && errors[name].type === "required" ? true : false}
                                helperText= {errors[name] && errors[name].type === "required" ? errors[name].message : ""}
                            />
                            {/* {errors[name] && errors[name].type === "required" && <span className="red-text">{errors[name].message}</span>} */}
                            {/* <input type="text"  id={name} {...register(name, validationProps)} /> */}
                            {/* {errors && errors[name] && <span className="red-text">{errors[name]['message']}</span>} */}
                        </Grid>
                    );
				case 'email':
					return (
                        <Grid item xs={xsv} key={name} spacing={spacing}>
							{layout.label == "fixed" && <label htmlFor={name} className={classes.label}>{title}</label>}
							<TextField
								id={name}
								label={layout.label !== "fixed" ? title : ''}
                                type="email"
								{...register(name, validationProps)}
                                {...preValue}
                                onChange={(e) => {
                                    register(name).onChange(e);
                                    handelChange(name, e.target.value);
                                }}
								variant="outlined"
                                fullWidth
                                size={size}
                                error={errors[name] && errors[name].type === "required" ? true : false}
                                helperText= {errors[name] && errors[name].type === "required" ? errors[name].message : ""}
							/>
                            {/* {errors[name] && errors[name].type === "required" && <span className="red-text">{errors[name].message}</span>} */}
							{/* <input type="email" id={name} {...register(name, validationProps)} /> */}
							{/* {errors && errors[name] && <span className="red-text">{errors[name]['message']}</span>} */}
						</Grid>
					);
                case 'tel':
                    return (
                        <Grid item xs={xsv} key={name} spacing={spacing}>
                            {layout.label == "fixed" && <label htmlFor={name} className={classes.label}>{title}</label>}
                            <TextField
                                id={name}
                                label={layout.label !== "fixed" ? title : ''}
                                type="tel"
                                {...register(name, validationProps)}
                                {...preValue}
                                onChange={(e) => {
                                    register(name).onChange(e);
                                    handelChange(name, e.target.value);
                                }}
                                variant="outlined"
                                fullWidth
                                size={size}
                                error={errors[name] && errors[name].type === "required" ? true : false}
                                helperText= {errors[name] && errors[name].type === "required" ? errors[name].message : ""}
                            />
                            {/* {errors[name] && errors[name].type === "required" && <span className="red-text">{errors[name].message}</span>} */}
                            {/* <input type="email" id={name} {...register(name, validationProps)} /> */}
                            {/* {errors && errors[name] && <span className="red-text">{errors[name]['message']}</span>} */}
                        </Grid>
                    );
				case 'checkbox':
					return (
                        <Grid item xs={xsv} key={name} spacing={spacing}>
                            <FormControl component="fieldset" error={errors[name] && errors[name].type === "required" ? true : false} size={size} style={{flexDirection: 'row'}}>
							    <label htmlFor={name} style={{ display: 'flex', alignItems: 'center', marginRight: '10px'}}>{title} : </label>
                                <Controller
                                {...register(name, validationProps)}
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handelChange(name, e.target.checked);
                                        }}
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
                                {errors[name] && errors[name].type === "required" && <FormHelperText style={{ display: 'flex', alignItems: 'center'}}>{errors[name].message}</FormHelperText>}
                            </FormControl>
							{/* <label>
								<input type="checkbox" id={name} {...register(name, validationProps)} />
								<span>{title}</span>
								{errors && errors[name] && <span className="red-text">{errors[name]['message']}</span>}
							</label> */}
						</Grid>
					);
                case 'radio':
                    return (
                        <Grid item xs={xsv} key={name} spacing={spacing}>
                            <FormControl component="fieldset" error={errors[name] && errors[name].type === "required" ? true : false} size={size} style={{flexDirection: 'row'}}>
							    <label htmlFor={name} style={{ display: 'flex', alignItems: 'center' }}>{title} : </label>
                                <Controller
                                {...register(name, validationProps)}
                                control={control}
                                {...preValue}
                                render={({ field }) => (
                                    <>
                                    <RadioGroup 
                                        {...field} 
                                        onChange={(e) => {
                                            field.onChange(e);
                                            handelChange(name, e.target.value);
                                        }}
                                        row
                                    >
                                        {options.map(radio=>(
                                            <FormControlLabel
                                                value={radio.value}
                                                control={<Radio size={size}/>}
                                                label={radio.title}
                                                labelPlacement={radio.labelPlacement || 'start'}
                                            />
                                        ))}
                                    </RadioGroup>
                                    </>
                                )}
                                />
                                {errors[name] && errors[name].type === "required" && <FormHelperText style={{ display: 'flex', alignItems: 'center'}}>{errors[name].message}</FormHelperText>}
                            </FormControl>
                            {/* <FormControl component="fieldset">
                                <FormLabel component="legend">{title}</FormLabel>
                                <RadioGroup aria-label={name} {...register(name, validationProps)}>
                                    {field && field.options.map(radio=>(
                                        <FormControlLabel value={radio.value} control={<Radio />} label={radio.title} />
                                    ))}
                                </RadioGroup>
                            </FormControl> */}
                            {/* <label>
                                <input type="checkbox" id={name} {...register(name, validationProps)} />
                                <span>{title}</span>
                                {errors && errors[name] && <span className="red-text">{errors[name]['message']}</span>}
                            </label> */}
                        </Grid>
                    );
                case 'slider':
                    return (
                        <Grid item xs={xsv} key={name} spacing={spacing}>
                            <FormControl component="fieldset" error={errors[name] && errors[name].type === "required" ? true : false} size={size} style={{width: '100%'}}>
                                <label htmlFor={name} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>{title}:</label>
                                <Controller
                                    control={control}
                                    {...preValue}
                                    {...register(name, validationProps)}
                                    render={({
                                        field: { onChange }
                                      }) => (
                                        <Slider
                                            name={name}
                                            onChange={(_, value) => {
                                                onChange(value);
                                                handelChange(name, value);
                                            }}
                                            valueLabelDisplay="auto"
                                            defaultValue={preValue.defaultValue}
                                            max={0}
                                            max={max}
                                            step={1}
                                        />
                                    )}
                                />
                                {errors[name] && errors[name].type === "required" && <FormHelperText style={{ display: 'flex', alignItems: 'center'}}>{errors[name].message}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    );
                case 'date':
                    return (
                        <Grid item xs={xsv} key={name} spacing={spacing}>
                            {layout.label == "fixed" && <label htmlFor={name} className={classes.label}>{title}</label>}
							<TextField
								id={name}
								label={layout.label !== "fixed" ? title : ''}
                                type="date"
                                defaultValue={preValue.defaultValue || today}
								InputLabelProps={{
									shrink: true
								}}
								inputProps={{
									min: todayDate()
								}}
								variant="outlined"
								fullWidth
                                size={size}
                                error={errors[name] && errors[name].type === "required" ? true : false}
                                helperText= {errors[name] && errors[name].type === "required" ? errors[name].message : ""}
                            />
                        </Grid>
                    );
                case 'select':
                    return (
                        <Grid item xs={xsv} key={name} spacing={spacing}>
                            {layout.label == "fixed" && <label htmlFor={name} className={classes.label}>{title}</label>}
                            <FormControl error={errors[name] && errors[name].type === "required" ? true : false} variant="outlined" fullWidth size={size} >
                            {layout.label !== "fixed" && <InputLabel id={name}>{title}</InputLabel>}
                                <Controller
                                    render={({ field }) => {
                                        let properties = {};
                                        if(layout.label !== "fixed"){
                                            properties={
                                                labelId:name,
                                                label: title
                                            }
                                        }
                                        return (<>
                                            <Select 
                                                native
                                                id={name}
                                                {...properties}
                                                {...field}                                                
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    handelChange(name, e.target.value);
                                                }}
                                            >
                                                <option value="" />
                                                {options.map(option=>(
                                                    <option value={option.value}>{option.title}</option>
                                                ))}
                                            </Select>
                                        </>)
                                    }}
                                    control={control}
                                    {...preValue}
                                    {...register(name, validationProps)}
                                />
                                {errors[name] && errors[name].type === "required" && <FormHelperText>{errors[name].message}</FormHelperText>}
                            </FormControl>
                            {/* {errors && errors[name] && <span className="red-text">{errors[name]['message']}</span>} */}
                            {/* <FormControl component="fieldset">
                                <FormLabel component="legend">{title}</FormLabel>
                                <RadioGroup aria-label={name} {...register(name, validationProps)}>
                                    {field && field.options.map(radio=>(
                                        <FormControlLabel value={radio.value} control={<Radio />} label={radio.title} />
                                    ))}
                                </RadioGroup>
                            </FormControl> */}
                            {/* <label>
                                <input type="checkbox" id={name} {...register(name, validationProps)} />
                                <span>{title}</span>
                                {errors && errors[name] && <span className="red-text">{errors[name]['message']}</span>}
                            </label> */}
                        </Grid>
                    );
				case 'url':
					return (
                        <Grid item xs={xsv} key={name} spacing={spacing}>
							{/* <label htmlFor={name}>{title}</label> */}
							{layout.label == "fixed" && <label htmlFor={name} className={classes.label}>{title}</label>}
							<TextField
								id={name}
								label={layout.label !== "fixed" ? title : ''}
                                type="url"
								{...register(name, validationProps)}  
                                {...preValue}                                       
                                onChange={(e) => {
                                    register(name).onChange(e);
                                    handelChange(name, e.target.value);
                                }}
								variant="outlined"
                                fullWidth
                                size={size}
							/>
							{errors && errors[name] && <span className="red-text">{errors[name]['message']}</span>}
						</Grid>
					);
                case 'file':
                    return (
                        <Grid item xs={xsv} key={name} spacing={spacing}>
                            <div style={{display: 'flex', alignItems: 'center', height: "100%"}}>
                            <input
                                accept={accept}
                                className={classes.input}
                                style={{ display: 'none' }}
                                id={name}
                                multiple={multiple}
                                type="file"
                                {...register(name, validationProps)}                       
                                onChange={(e) => {
                                    register(name).onChange(e);
                                    handelChange(name, e.target.files[0]);
                                }}
                            />
                            <label htmlFor={name}>
                            <Button variant="raised" component="span" variant="contained" color="secondary" size={size}>
                                {title}
                            </Button>
                            <span style={{marginLeft: '10px', display: 'flex', alignItems: 'center', height: "100%"}}>{watch(name) && watch(name)[0] && watch(name)[0].name}</span>
                            </label> 
                            {errors && errors[name] && <span className="red-text">{errors[name]['message']}</span>}
                            </div>
                        </Grid>
                    );
                case 'array':
                    return (
                        <Grid item xs={xsv} key={name} spacing={spacing}>
                            {/* <ArrayCard                            
                                {...register(name, validationProps)}  
                                name={name}
                                register
                                onChange={(data) => {
                                    // register(name).onChange(data);
                                    
                                    setValue(name, data);
                                    handelChange(name, data);
                                }}             
                            /> */}
                            <FieldArray
                                {...{ control, register, preloadedValues, getValues, setValue, errors, name, subFields }}
                            />
                        </Grid>
                    );
				default:
					return (
                        <Grid item xs={xsv} key={name}>
							<span className="red-text">Invalid Field</span>
						</Grid>
					);
			}
		});
	};

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
