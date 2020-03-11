import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ListExpense from './listExpense';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
        marginTop: theme.spacing(2),
      margin: theme.spacing(2),
      width: 500,
    },
  },
}));


export default class CreateExpense extends Component {
  
   
        constructor(props){
            super(props)

            //Settting up functions
            this.onChangeExpenseName = this.onChangeExpenseName.bind(this);
            this.onChangeExpenseAmount = this.onChangeExpenseAmount.bind(this);
            this.onChangeExpenseDescription = this.onChangeExpenseDescription.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
        
            // setting up state
            this.state ={
                name: '',
                description: '',
                amount: ''
            }
        }
        onChangeExpenseName(e) {
            this.setState({name: e.target.value})
        }

        onChangeExpenseAmount(e){
            this.setState({amount: e.target.value})
        }
        
        onChangeExpenseDescription(e){
            this.setState({description: e.target.value})
        }

        onSubmit(e){
            e.preventDefault()
            const expense ={
                name : this.state.name,
                amount: this.state.amount,
                description: this.state.description,
            };
            axios.post('http://localhost:8000/api/expenses/', expense)
                .then(res => console.log(res.data))
                // console.log(`Expenses successfull created`);
                // console.log(`Name: ${this.state.name}`);
                // console.log(`Amount: ${this.state.amount}`);
                // console.log(`Description: $(this.state.description)`);

                Swal.fire(
                    'Good Job!',
                    'Expenses Added Succesfully',
                    'success'
                )

                this.setState({name: '', amount: '', description: ''})
        }
  render (){
     return(

    
   
      <div>
      
            <form  onSubmit={this.onSubmit} noValidate autoComplete="off">
            <TextField
            id="standard-password-input"
            label="Expense Name"
            type="text"
            autoComplete="current-password"
            width="fullWidth"
            variant="outlined"
            value={this.state.name}
            onChange={this.onChangeExpenseName}
            
        />
        <TextField
            id="standard-password-input"
            label="Pleased enter Amount"
            type="number"
            autoComplete="current-password"
            width="fullWidth"
            variant="outlined"
            value={this.state.amount}
            onChange={this.onChangeExpenseAmount}
            
        />
        <TextField
            id="standard-multiline-static"
            label="Expense Description"
            multiline
            rows="5"
            variant="outlined"
            value={this.state.description}
            onChange={this.onChangeExpenseDescription}
            
        />
        <Button type="submit" variant="contained" color="primary">
                Create Expenses
                </Button>
            </form>
             <ListExpense />
            </div> );
        }
}
