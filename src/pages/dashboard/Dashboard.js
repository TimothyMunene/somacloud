import { Container, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { AppWidgetSummary } from '../../sections/@dashboard/app';
import {useState ,useEffect} from "react";
import AuthService from "../../services/AuthService";
import axios from "../../services/axios";
export default function Dashboard() {
  const [students, setStudents] = useState(0);
  const [teachers, setTeachers] = useState(0);
  
  useEffect(() => {
    const code = AuthService.getCurrentUser()?.code;
    const schoolCode = Number(code);
    axios
    .get(
      `/students?code=${schoolCode}`
    )
    .then((response) => setStudents(response.data)).catch((error)=>{})
    axios
    .get(
      `/teachers?code=${schoolCode}`
    )
    .then((response) => setTeachers(response.data)).catch((error)=>{})

  },[]);
  return (
    <>
      <Helmet>
        <title> Dashboard | Soma App </title>
      </Helmet>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Soma Cloud
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Students" total={students?.length} icon={'ant-design:wallet-outlined'} />
            <Typography variant="body2" sx={{ my: 2 }}>
              Analytics
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="SMS Sent" total={8000} color="warning" icon={'ant-design:user-outlined'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Fees Amount (total)"
              total={1352831}
              color="info"
              icon={'ant-design:transaction-outlined'}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Teachers"
              total={teachers?.length}
              color="error"
              icon={'ant-design:euro-outlined'}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
