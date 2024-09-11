import React,{useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PaymentForm from './PaymentsForm';
import Button from '@mui/material/Button';
import ReviewOrder from '../Components/ReviewOrder'
export default function AddressForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      });
     
      const [paymentErrors, setPaymentErrors] = useState({});
      const [errors, setErrors] = useState({});
      const [open, setOpen] = useState(false); 
      const [nextopen, setnextOpen] = useState(false); 
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {};
    
        // Check for empty fields
        Object.keys(formData).forEach((key) => {
          if (!formData[key] && key !== 'address2') {
            newErrors[key] = 'This field is required';
          }
        });
        
    
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
        } else {
          // Proceed to the next step if no errors
          console.log('Form Submitted', formData);
          setOpen(true);
          setnextOpen(false);
          setFormData({
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            country: '',
          })
        }

      };
      const handlePaymentSubmit = (paymentData) => {
        const newPaymentErrors = {};
        
        // Validate payment form fields
        Object.keys(paymentData).forEach((key) => {
          if (!paymentData[key]) {
            newPaymentErrors[key] = 'This field is required';
          }
        });
    
        if (Object.keys(newPaymentErrors).length > 0) {
          setPaymentErrors(newPaymentErrors);
        } else {
          // If no errors in the payment form, proceed to review
          setPaymentErrors({});
          setOpen(false);
          setnextOpen(true);
         
        }
      };
    
      const handleClose = () => {
        setOpen(false); // Close the modal
        setnextOpen(false);
      };
    
    //   const handlenextopen=()=>{
    //     setOpen(false);
    //     setnextOpen(true);
    //   }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <Typography className='fw-bold' variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            value={formData.firstName}
            onChange={handleChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            value={formData.lastName}
            onChange={handleChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            value={formData.address1}
            onChange={handleChange}
            error={!!errors.address1}
            helperText={errors.address1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            value={formData.address2}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            value={formData.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth
          required
           value={formData.state}
           onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            value={formData.zip}
            onChange={handleChange}
            error={!!errors.zip}
            helperText={errors.zip}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            value={formData.country}
            onChange={handleChange}
            error={!!errors.country}
            helperText={errors.country}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
         <input type='submit' value='Next' className="btn btn-danger" />
        </Grid>
      </Grid>
    

     
    </form>
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
    <DialogTitle style={{textAlign:'center'}}>Payment Details</DialogTitle>
    <DialogContent>
      <PaymentForm    onSubmit={handlePaymentSubmit} // Pass the payment form submission handler
            paymentErrors={paymentErrors}/>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="secondary">Back</Button>
      <Button onClick={() => document.getElementById('paymentForm').requestSubmit()} color="primary">Submit Payment</Button>
    </DialogActions>
  </Dialog>
    <Dialog open={nextopen} onClose={handleClose} maxWidth="sm" fullWidth>
    <DialogTitle style={{textAlign:'center'}}>Review your Order</DialogTitle>
    <DialogContent>
      <ReviewOrder/>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => { setOpen(true); setnextOpen(false); }} color="secondary">Bcak</Button>
      <Button  color="primary">Place Order</Button>
    </DialogActions>
  </Dialog>
  </>
  );
}