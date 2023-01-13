import React from "react";
import { Grid } from "@mui/material";

export default function UserInfo(props){
    let {luckyNumber} = props
    
    let text;
    let style;
    if(typeof luckyNumber === 'undefined' ){
      text = "Set your Lucky Number";
      style = {
        color:"grey",
        fontSize:"2rem"
      }
    }
    else{
      style = {
        color:"#FF8C00",
        fontSize: "3rem"
      }
      text = `${luckyNumber}`
    }

    return (
      <Grid container   justifyContent="center" >  
        <Grid item>
          <h2 style={style}>
            {text}
          </h2>
        </Grid>
      </Grid>
    );
}
