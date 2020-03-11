import React, { Component } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import createSpacing from '@material-ui/core/styles/createSpacing';
import Axios from 'axios';
import Swal from 'sweetalert2';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    margin: 10,
    marginTop: createSpacing(4),
  },
  body: {
    fontSize: 14,
    padding: 25,
    marginTop: 50,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  
];

const useStyles = makeStyles({
  table: {
    Width: 200,
  },
});

export default class ListExpense extends Component {

    constructor (props) {
        super(props);
        this.state = {
            expenses: [],


        };
        this.deleteExpense = this.deleteExpense.bind(this);

    }

    deleteExpense(){
        Axios.delete('http://localhost:8000/api/expenses/6' )
        .then((res) => {
            console.log('deleted succesful')
            Swal.fire(
                'Wa oo(:',
                'Expense Deleted!',
                'warning'
            )
        })
    }



    componentDidMount(){
        Axios.get('http://localhost:8000/api/expenses/')
            .then(res => {
                this.setState({
                    expenses: res.data
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }
//   const classes = useStyles();
render(){
  return (
    <TableContainer>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right"> Action</StyledTableCell>
       </TableRow>
        </TableHead>
        <TableBody>
          {this.state.expenses.map(expense => (
            <StyledTableRow key={expense.id}>
              <StyledTableCell component="th" scope="row"> {expense.name}</StyledTableCell>
              <StyledTableCell align="right">{expense.description}</StyledTableCell>
              <StyledTableCell align="right">{expense.amount}</StyledTableCell>
              <StyledTableCell align="right">

              <IconButton onClick={ this.deleteExpense} aria-label="delete">
                  <DeleteIcon /> 
              </IconButton>
              <IconButton  aria-label="Edit">
                   <EditIcon />
              </IconButton>
            
            </StyledTableCell>
             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
          }
        }
