import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm({onSubmit, paymentErrors }) {
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    csv: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData); // Pass the form data to the parent onSubmit handler
  };

  return (
    <form id="paymentForm" onSubmit={handleFormSubmit}>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField 
            required 
            id="cardName" 
            name="cardName"
            label="Name on card" 
            fullWidth 
            autoComplete="cc-name" 
            value={formData.cardName}
            onChange={handleChange}
            error={!!paymentErrors.cardName}
            helperText={paymentErrors.cardName}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            value={formData.cardNumber}
            onChange={handleChange}
            error={!!paymentErrors.cardNumber}
            helperText={paymentErrors.cardNumber}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
            required 
            id="expDate" 
            name="expDate"
            label="Expiry date" 
            fullWidth 
            autoComplete="cc-exp" 
            value={formData.expDate}
            onChange={handleChange}
            error={!!paymentErrors.expDate}
            helperText={paymentErrors.expDate}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="csv"
            name="csv"
            label="CSV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            value={formData.csv}
            onChange={handleChange}
            error={!!paymentErrors.csv}
          
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </form>
  );
}
