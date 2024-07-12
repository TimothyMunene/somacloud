import React, { useState } from 'react';
import { capitalCase } from 'change-case';
import {Autocomplete} from '@mui/material';
import TextField from '@mui/material/TextField';
import MyThemeProvider from '../../services/MyTheme';

function DataCombo({ title, type, dt, onSelectedValue }) {
  
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (event, value) => {
    setSelectedValue(value);
    onSelectedValue(value); // pass the selected value to the parent component
  };
  

  const getOptionSelected = (option, value) => {
    if (type === "years") {
      return option.year === value.year;
    }
    if (type === "terms") {
      return option.termID === value.termID;
    }
    if (type === "classes") {
      return option.classID === value.classID;
    }
    if (type === "subjects") {
      return option.subjectCode === value.subjectCode;
    }
    if (type === "exams") {
      return option.examId === value.examId;
    }
  };




  return (
    <MyThemeProvider>
    <Autocomplete
      options={dt}
      value={selectedValue}
      onChange={handleSelect}
      mytitle={type}
      getOptionLabel={(d) => {
        if (type === "years") {
         return capitalCase(d.year.toString());
        }
        if (type === "terms") {
          return capitalCase(d.termName.toString());
        }
        if (type === "classes") {
          return capitalCase(d.initials.toString());
        }
        if (type === "subjects") {
          return capitalCase(d.subjectName.toString());
        }
        if (type === "exams") {
          return capitalCase(d.examName.toString());
        }
      }}
      getOptionSelected={getOptionSelected}
      sx={{
        '& .MuiTypography-root': {
          fontFamily: 'Custom Font, sans-serif',
          fontSize: '8px', // adjust font size as needed
        },
      }}
     
      renderInput={(params) => <TextField   {...params} label={title} />}
    />
    </MyThemeProvider>
  );
}
export default DataCombo;