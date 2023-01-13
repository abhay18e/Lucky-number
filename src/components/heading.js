import React from "react";
import { Grid } from "@mui/material";

export default function Heading(props){
    let style = {
        color:"#FF8C00",
        fontSize: "4rem"

    }
    return (
        <Grid container justifyContent={"center"} >
            <Grid item>
                <h1 style={style}>{props.value}</h1>
            </Grid>
        </Grid>
    );
}

