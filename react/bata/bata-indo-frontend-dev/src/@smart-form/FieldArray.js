import React from "react";
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TableHead from '@material-ui/core/TableHead';
import { useFieldArray } from "react-hook-form";
import NestedArray from "./NestedFieldArray";
import Fields from './Fields';
import { useEffect } from 'react';

let renderCount = 0;

export default function FieldArray({ path, name, watch, control, register, setError, clearErrors, setValue, getValues, subFields, disabled, defaultValues, errors, layout, onChange, onBlur, arrLayout, columns }) {
  const { fields, append, remove, insert, prepend } = useFieldArray({
    control,
    name: path
  });
  
  renderCount++;
  const xsv = (column) => {return column == 1 ? 12 : column == 2 ? 6 : column == 3 ? 4 : column == 6 ? 2 : 12}
  const spacing = (space) => {return space || 2};
  const size = (sz) => {return sz || ""};

  useEffect(() => {
    if(!fields.length || fields.length < 1){
      append();
    }
  }, [fields]);

  
  
  // console.log(`arrLayout && arrLayout.type`, arrLayout && arrLayout.type)
  if(layout && layout.type == "table"){

  }



  return (
    <>
        {/* {JSON.stringify(fields)} */}
        {/* <Grid container spacing={spacing(layout && layout.spacing)} style={{marginBottom: '16px', marginTop: '16px'}}> */}
        
        <Grid item xs={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              type="button"
              onClick={() => {
                  append();
              }}
              variant="contained"
              color="primary"
              size="small"
            >
            add more
            </Button>
        </Grid>
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
            {columns && columns && (
                <TableHead>
                    <TableRow className="h-64">
                        {columns && columns.map((row, i) => {
                            return (
                                <TableCell
                                    className="p-4 md:p-16 height"
                                    key={i}
                                    align='center'
                                    padding={'none'}
                                >
                                    {row}
                                </TableCell>
                            );
                        }, this)}
                        <TableCell
                            className="p-4 md:p-16"
                            align='center'
                            padding={'none'}
                        >
                            Action
                        </TableCell>
                    </TableRow>
                </TableHead>
            )}
        {fields.map((item, index) => {
          return (
            <TableRow>
            
                 <Fields 
                    {...{
                        path: `${path}.${index}`,
                        register,
                        errors,
                        watch,
                        control,
                        setError,
                        clearErrors,
                        setValue,
                        onChange,
                        onBlur,
                        getValues,
                        disabled,
                        defaultValues,
                        fields: subFields,
                        layout: {xsv: xsv(arrLayout && arrLayout.column), spacing: spacing(arrLayout && arrLayout.spacing), size: size(arrLayout && arrLayout.size), label: arrLayout && arrLayout.label, type: arrLayout && arrLayout.type}
                    }}
                    
                    onChange={(data)=>console.log(data)}
                />
                {/* {subFields.map((fl, i) => (
                    <TextField
                        {...register(`${name}.${index}.${fl.name}`)}
                        defaultValue={item[fl.name]}
                        variant="outlined"
                    />
                    )
                )} */}
              
              {/* <input
                {...register(`test.${index}.name`)}
                defaultValue={item.name}
              /> */}
                <TableCell
                    className="p-4 md:p-16"
                    align='center'
                    padding={'none'}
                >
                  {index > 0 && (
                  <IconButton color="primary" aria-label="upload picture" component="span" size="small" onClick={() => remove(index)}>
                    <HighlightOffIcon />
                  </IconButton>
                  )}
              </TableCell>
            </TableRow>
          );
        })}
    </Table>

      {/* <section>
        <button
          type="button"
          onClick={() => {
            append();
          }}
        >
          append
        </button>

        <button
          type="button"
          onClick={() => {
            prepend();
          }}
        >
          prepend
        </button>

        <button
          type="button"
          onClick={() => {
            insert(1);
          }}
        >
          insert
        </button>
      </section> */}

      {/* <span className="counter">Render Count: {renderCount}</span> */}
    </>
  );
}
