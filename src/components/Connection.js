import React from "react";
import { Grid } from "@mui/material";
import {Button} from "@mui/material";

export default function Connection(props){
    let address = props.address;

    let buttonValue,color;
    if(props.status === "notConnected") [buttonValue ,color] = ["Connect","primary"];
    else if(props.status === "waiting") [buttonValue,color]  =  ["Waiting","secondary"];
    else if(props.status === "connected") [buttonValue,color] = [`0x${address.slice(2, 5)}...${address.slice(-3)}`,"success"];
    
    let balanceValue;
    if(props.status === "connected"){
        if(props.gotBalance) balanceValue = props.balance + " eth";
        else balanceValue = "... eth"
    }
     
    return (
        <Grid container spacing={2} direction="row" justifyContent="flex-end" alignItems="center">
            
            <Grid item>
              { 
              props.status === "connected" ?
              <h3 style={{color:"grey"}}>
                <b>
                {balanceValue}
                </b>
              </h3> 
              : null
             }
            </Grid>

            <Grid item>
                <Button 
                onClick={(e)=>props.onclick(e)} 
                variant="contained"
                color={color}>{buttonValue}
                </Button>
            </Grid>

        </Grid>
    );
}
