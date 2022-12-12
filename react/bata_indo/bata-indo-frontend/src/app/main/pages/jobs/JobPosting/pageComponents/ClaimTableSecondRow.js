// import { TableCell, TableRow, TextField } from '@material-ui/core'
// import React, { useEffect } from 'react'
// import { useForm, useDeepCompareEffect } from '@core/hooks';

// function CreateRequestSecondRow({ value, key, index, onChange }) {
//     const { form, setForm, handleChange } = useForm({
//         remark: '',
//         toalAmount: ''
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
//             <TableCell colSpan={2} align='right'>
//                 Remark
//             </TableCell>
//             <TableCell colSpan={3} >
//                 <TextField
//                     variant="outlined"
//                     id="remarks"
//                     name="remarks"
//                     value={form && form.remark}
//                     label="Remarks"
//                     onChange={handleChange}
//                     multiline
//                     rows={6}
//                     InputLabelProps={{
//                         shrink: true
//                     }}
//                     fullWidth
//                 />
//             </TableCell>
//             <TableCell align="right">
//                 Total:
//             </TableCell>
//             <TableCell>
//                 <TextField
//                     type='number'
//                     name="toalAmount"
//                     variant="outlined"
//                     id={form.toalAmount + "_" + index}
//                     value={form && form.toalAmount}
//                     onChange={handleChange}
//                 />
//             </TableCell>


//         </TableRow >
//     )
// }

// export default CreateRequestSecondRow
