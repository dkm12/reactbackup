// import { Button, makeStyles, TableCell, TableRow, TextField } from '@material-ui/core'
// import React, { useEffect } from 'react'
// import { useForm, useDeepCompareEffect } from '@core/hooks';

// const useStyles = makeStyles(() => ({
//     cell: {
//         align: "center",
//         // border: '1px solid',
//         padding: 8
//     }
// }));


// function CreateRequestFirstRow({ value, key, index, onChange, onDelete, modeofTravel }) {
//     const classes = useStyles();
//     const { form, setForm, handleChange } = useForm({
//         lcId: "",
//         fromLoc: "",
//         toLoc: "",
//         modeOfTravel: "",
//         trvlPurpose: "",
//         trvlDate: "",
//         billNo: "",
//         billAmt: "",
//         lcdDistance: "",
//         modeOfTrvlOth: "",
//         upload: '',
//     })
//     useEffect(() => {
//         if (value) {
//             setForm(value)
//         }
//     }, [setForm]);

//     useEffect(() => {
//         onChange(form)
//     }, [form])
//     return (
//         <TableRow key={key}>
//             <TableCell className={classes.cell} >
//                 <TextField
//                     error={form.fromLoc === ''}
//                     required
//                     label=""
//                     id="fromLoc"
//                     name="fromLoc"
//                     value={form && form.fromLoc}
//                     onChange={handleChange}
//                     variant="outlined"
//                     inputProps={{
//                         style: {
//                           padding: 8
//                         }
//                      }}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     fullWidth
//                 />
//             </TableCell >
//             <TableCell className={classes.cell}>
//                 <TextField
//                     error={form.toLoc === ''}
//                     required
//                     id="toLoc"
//                     name="toLoc"
//                     value={form && form.toLoc}
//                     onChange={handleChange}
//                     variant="outlined"
//                     inputProps={{
//                         style: {
//                           padding: 8
//                         }
//                      }}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     fullWidth
//                 />
//             </TableCell>
//             <TableCell className={classes.cell}>
//                 <TextField
//                     error={form.trvlPurpose === ''}
//                     required
//                     label=""
//                     id="trvlPurpose"
//                     name="trvlPurpose"
//                     value={form && form.trvlPurpose}
//                     onChange={handleChange}
//                     variant="outlined"
//                     inputProps={{
//                         style: {
//                           padding: 8
//                         }
//                      }}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     fullWidth
//                 />
//             </TableCell>
//             <TableCell className={classes.cell} width='10%'>
//                 <TextField
//                     variant="outlined"
//                     name="modeOfTravel"
//                     id="modeOfTravel"
//                     select
//                     SelectProps={{ native: true }}
//                     value={form && form.modeOfTravel}
//                     label=""
//                     onChange={handleChange}
//                     inputProps={{
//                         style: {
//                           padding: 8
//                         }
//                      }}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     fullWidth
//                 >
//                     {modeofTravel.map((option) => (
//                         <option
//                             key={option.value}
//                             value={option.value}
//                         >
//                             {option.label}
//                         </option>
//                     ))}
//                 </TextField>
//             </TableCell>
//             <TableCell className={classes.cell}>
//                 <TextField
//                     variant="outlined"
//                     name='trvlDate'
//                     id="trvlDate"
//                     value={form && form.trvlDate}
//                     label=""
//                     onChange={handleChange}
//                     type='date'
//                     inputProps={{
//                         style: {
//                           padding: 8
//                         }
//                      }}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     fullWidth
//                 />
//             </TableCell>
//             <TableCell className={classes.cell}>
//                 <TextField
//                     variant="outlined"
//                     name="billNo"
//                     id="billNo"
//                     value={form && form.billNo}
//                     label=""
//                     onChange={handleChange}
//                     inputProps={{
//                         style: {
//                           padding: 8
//                         }
//                      }}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     fullWidth
//                 />
//             </TableCell>
//             <TableCell className={classes.cell}>
//                 <TextField
//                     variant="outlined"
//                     type='number'
//                     name="billAmt"
//                     id="billAmt"
//                     value={form && form.billAmt}
//                     label=""
//                     inputProps={{
//                         style: {
//                           padding: 8
//                         }
//                      }}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     onChange={handleChange}
//                     fullWidth
//                 />
//             </TableCell>
//             <TableCell className={classes.cell}>
//                 <TextField
//                     variant="outlined"
//                     type='number'
//                     name="lcdDistance"
//                     id="lcdDistance"
//                     value={form && form.lcdDistance}
//                     label=""
//                     inputProps={{
//                         style: {
//                           padding: 8
//                         }
//                      }}
//                     InputLabelProps={{
//                         shrink: true,
//                     }}
//                     onChange={handleChange}
//                     fullWidth
//                 />
//             </TableCell>
//             <TableCell className={classes.cell}>
//                 <TextField
//                     style={{ display: 'none' }}
//                     name="upload"
//                     id={"files-"+index}
//                     value={form && form.files}
//                     multiple
//                     type="file"
//                     onChange={handleChange}
//                 />
//                 <label htmlFor={"files-"+index}>
//                     <Button variant="raised" color="secondary" variant="contained" size="small">
//                         Upload
//                     </Button>
//                 </label>
//             </TableCell>
//             <TableCell className={classes.cell}>
//                 <Button onClick={() => onDelete(index)} color="secondary" variant="contained" size="small">Delete</Button>
//             </TableCell>
//         </TableRow >

//     )
// }

// export default CreateRequestFirstRow
