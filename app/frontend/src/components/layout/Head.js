import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";


export class Head extends Component{

    render(){
        return (
            <Fragment>
            <head>
                <meta charset="utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
                <meta name="theme-color" content="#563d7c"></meta>
              
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" 
                integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
                <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=Arvo:400i|Montserrat|Raleway:400i&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=Crimson+Text|Work+Sans:400,700" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=Cookie&display=swap" rel="stylesheet"></link>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/js/solid.min.js" rel="stylesheet"></link>
            </head>
            </Fragment>
        )
    }
}

export default Head