  import React, { Component } from 'react';
  //import logo from './logo.svg';
  import './App.css';
  import './index.css';
  import axios from 'axios';
  import Cookies from 'js-cookie';

  class App extends Component {
    

  // 'http://localhost/paym/backoffice/api/v1/staff/login'
  constructor(props){
    super(props);
    this.state={
      email: '',
      password: ''
    }
  }

      handleFormSubmit = e =>{
        var bodyFormData = new FormData();
        var email =this.state.email;
        var password =this.state.password;
        bodyFormData.append('email', email); 
        bodyFormData.append('password', password); 
        console.log(this.state.email);
        console.log(this.state.password);
        e.preventDefault();
          axios({
          method: 'POST',
          url: 'http://localhost/paym/backoffice/api/v1/staff/login',
          headers: {'Content-Type': 'multipart/form-data' },
          data: bodyFormData,
          })
          .then(result =>{
            if (result.data.success == "1")
            {  
                
                result = result.data.data;
                Cookies.set('access_token',result.access_token);
                Cookies.set('refresh_token',result.refresh_token);
                alert("Success");
               console.log(result);
                
       
               window.location.href = "http://localhost/paym/backoffice/api/v1/staff/dashboard";
           
            }
            else{
              alert("incorrect");
            }
          
          
          })
          .catch(error => this.setState( { error: error.message } ));
     };

      
    render() {
    return (
        <div className="App">
          <form action="#">
      <p>
        <label for="login">Email:</label>
        <input type="text" name="email" id="email"
        value={this.state.email }
        onChange={e => this.setState({ email: e.target.value })}
        />
      </p>

      <p>
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" 
          value={this.state.password }
          onChange={e => this.setState({ password: e.target.value })}
        />
      </p>


        <input type="submit" onClick = {e => this.handleFormSubmit(e)} value="submit"/> 


      <p class="forgot-password"><a href="index.html">Forgot your password?</a></p>
    </form>
        </div>
      );
    }
  }

  export default App;
