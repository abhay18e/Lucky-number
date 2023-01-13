import React from "react";
import {Button,Grid,IconButton,TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { setLuckyNumber } from "../utils/utils";
import { waitForTransaction } from "../utils/utils";

class ChangeLuckyNumber extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            buttonStatus  : "forInfo", // "forData"
            luckyNumber   : props.luckyNumber,
            infoUpdating  : false,
        }

        this.btnOnClick = this.btnOnClick.bind(this);
        this.closeOnClick = this.closeOnClick.bind(this);
        this.numberOnChange = this.numberOnChange.bind(this);
    }

    componentDidUpdate(prevProps){
        if (prevProps.luckyNumber !== this.props.luckyNumber) {
            this.setState({luckyNumber:this.props.luckyNumber})
        }
    }

    numberOnChange(e){
        this.setState({luckyNumber:e.target.value})
    }
    closeOnClick(e){
        this.setState({buttonStatus:"forInfo"})
    }
   async btnOnClick(e){
        if(this.state.buttonStatus === "forInfo")
            this.setState({buttonStatus : "forData"})
        else{
            this.setState({infoUpdating:true})
            this.setState({buttonStatus:"forInfo"})
            let tx = await setLuckyNumber(parseInt(this.state.luckyNumber));
            let recipt = await waitForTransaction(tx.hash)
            this.setState({infoUpdating:false})
            this.props.luckyNumberChange();
        }
   
    }

    render(){
        let buttonValue = typeof this.state.luckyNumber === 'undefined'
                          ? "Set Lucky Number"
                          : "Update Lucky Number" ;

        if(this.state.infoUpdating) buttonValue = "Updating..";
        
        let textFieldValue = typeof this.state.luckyNumber === 'undefined'
                          ? 100
                          : this.state.luckyNumber;

        return (
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                {this.state.buttonStatus === "forData" ?
                <Grid item>
                    <TextField
                        id="standard-basic"
                        variant="outlined"
                        label="Lucky Number" 
                        type="number"
                        onChange={this.numberOnChange}
                        value={textFieldValue}
                    />
                </Grid>
                : null 
                }
                <Grid item>
                <Button onClick={this.btnOnClick} variant="contained">{buttonValue}</Button>
                </Grid>
               {this.state.buttonStatus === "forData" ?
                <Grid item>
                    <IconButton style={{ color: 'red' }} onClick={this.closeOnClick}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
                : null 
               }
            </Grid>
        );
    }
}

export default ChangeLuckyNumber;