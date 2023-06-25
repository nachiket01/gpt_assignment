import React, { useState } from 'react';
import "./prompt.css"
import axios from 'axios';
class SidebarComponent extends React.Component {


  render() {
    return (
      <></>);
  }
}

class MainComponent extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            ans: "",
            inputData:"",
            loading: true,
        };
    }
    
    handleClick = (que) => {
        // Perform any actions with the clicked data
        let config={
            header:{
                "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Credentials" : "true",
    "Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers" : "Origin, Content-Type, Accept",
            }
        }
        axios.post("http://127.0.0.1:8000/prompt",{
            que,
        },config).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })

        setTimeout(()=>{
            axios.get("http://127.0.0.1:8000/prompt",config).then((response)=>{
            //console.log(response);
            console.log(response);
            this.setState({loading:false,ans:response.data})
        }).catch((error)=>{
            console.log(error)
        })},1000);

        
    
}

      handleInputChange = (event) => {
        this.setState({ inputData: event.target.value });
      };
   

      handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
          const { inputData } = this.state;
            const que = inputData;
          let config={
            header:{
                "Access-Control-Allow-Origin" : "*",
    "Access-Control-Allow-Credentials" : "true",
    "Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers" : "Origin, Content-Type, Accept",
            }
        }
        axios.post("http://127.0.0.1:8000/prompt",{
            que,
        },config).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error);
        })
        this.setState({ inputData: '' });
         
          
        setTimeout(()=>{
            axios.get("http://127.0.0.1:8000/prompt",config).then((response)=>{
            this.setState({loading:false,ans:response.data})
        }).catch((error)=>{
            console.log(error)
        })

        },1000)
        }
      };



      render(){
    const {ans, inputData, loading} = this.state;
    return (

      <div className="main">
        <h1>Do you have any doubts, feel free to ask questions!</h1>
       
        <div className="question" onClick={() => this.handleClick('Is there any prescriptions I need to be really concerned with if added to my list ?')}>Is there any prescriptions I need to be really concerned with if added to my list ?</div>
        <div className="question" onClick={() => this.handleClick('Are there any medical symptoms I need to watch for when taking my prescriptions?')}>Are there any medical symptoms I need to watch for when taking my prescriptions?</div>
        <div className="question" onClick={() => this.handleClick('Do I need to watch for any food-drug interactions based on my prescriptions?')}>Do I need to watch for any food-drug interactions based on my prescriptions?</div>
        <div className="question" onClick={() => this.handleClick('Are there any food I need to consume based on my prescriptions')}>Are there any food I need to consume based on my prescriptions</div>
        <input
          type="text"
          value={inputData}
          onChange={this.handleInputChange}
          onKeyPress={this.handleEnterKeyPress}
          placeholder='Type your question here...  '
        /> 
        <hr></hr>
        <div className='ansArea'>
            {loading ? (<div className='loading'></div>): <>{ans}</>}
        </div>
      </div>
    

    );
  }
}

class Prompt extends React.Component {

    render() {
    return (
      <div className="app">
        <SidebarComponent />
        <MainComponent />
      </div>
    );
  }
}

export default Prompt;
