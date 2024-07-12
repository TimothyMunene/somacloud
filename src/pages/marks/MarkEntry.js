
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Button, Card,Grid, Stack, IconButton, InputAdornment,TextField, } from '@mui/material';
import { useSnackbar } from 'notistack';

import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import axios from "../../services/axios";

import HttpService from '../../services/HttpService';
import Iconify from '../../components/iconify';
import MyThemeProvider from '../../services/MyTheme';
import {useState } from "react";
export default function MarkEntry({dat,code}) {
  const defaultValues = {
    mark: "",
    outOf: "",
    subject_code: dat.subjectCode,
    term_id: dat.termId,
    exam_id: dat.examId,
    year: dat.year,
    schoolCode: code,
    class_id: dat.classId,
    names: "",
    admission:"",
  };

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
 
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: Number(value),
    });
  };

  function validate(obj) {
    // Check if required properties are not empty
    if (!obj.admission || !obj.class_id || !obj.schoolCode || !obj.exam_id || !obj.mark || !obj.outOf || !obj.subject_code || !obj.term_id || !obj.year) {
      return false;
    }
  
    // Check if mark is less than outOf
    if (Number(obj.mark) > Number(obj.outOf)) {
      return false;
    }
  
    return true;
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues)
if(validate(formValues)){
  axios.post('/marks/add/mark', formValues)
  .then((response) => {
    enqueueSnackbar('Marks updated successfully', { variant: 'success' });
    ////navigate('admin/users');
  })
  .catch((error) => {
      enqueueSnackbar("Error adding Marks", { variant: 'error' });
    
  });

}else{

  enqueueSnackbar("Invalid inputs", { variant: 'error' });

}
    /*HttpService.postWithoutAuth('/users/new', formValues)
      .then((response) => {
        enqueueSnackbar('User added successfully', { variant: 'success' });
        ////navigate('admin/users');
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          error.response?.data?.errors.map((e) => enqueueSnackbar(e.message, { variant: 'error' }));
        } else if (error.response?.data?.message) {
          enqueueSnackbar(error.response?.data?.message, { variant: 'error' });
        } else {
          enqueueSnackbar(error.message, { variant: 'error' });
        }
      });*/
  };

  return (
    <>
      <Helmet>
        <title> Enter Marks | e-marks </title>
      </Helmet>
      <MyThemeProvider>
      <Card>
        <Grid container alignItems="left" justify="left" direction="column" sx={{ width: 400, padding: 5 }}>
          <Stack spacing={3}>
             <TextField
              id="admission"
              name="admission"
              label="Admission:"
              autoFocus
              required
              value={formValues.admission}
              onChange={handleInputChange}
            />
            
             <TextField
              id="mark"
              name="mark"
              label="Enter Mark"
              
              required
              value={formValues.mark}
              onChange={handleInputChange}
            />
             <TextField
              id="outOf"
              name="outOf"
              label="Out Of:"
              
              required
              value={formValues.outOf}
              onChange={handleInputChange}
            />


          </Stack>
          <Stack spacing={2} direction="row" alignItems="right" justifyContent="end" sx={{ mt: 4 }}>
            <Button sx={{ width: 120 }} variant="outlined" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <LoadingButton sx={{ width: 120 }} size="large" type="submit" variant="contained" onClick={handleSubmit}>
              Save
            </LoadingButton>
          </Stack>
        </Grid>
      </Card>
      </MyThemeProvider>
    </>
  );
}
