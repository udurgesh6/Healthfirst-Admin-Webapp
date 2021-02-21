import React, { Component } from 'react';
import axios from 'axios';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      details: {},
      detailsGenerated: false,
      email: '',
      emailVerified: false,
      phoneNumber: '',
      password: '',
      first_name: '',
      last_name: '',
      disabled: false,
      user_created: '',
      user_created_state: false
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { bookID, bookTitle, bookAuthor } = this.state;

    const book = {
      bookID,
      bookTitle,
      bookAuthor,
    };

    axios
      .post('http://localhost:3001/create', book)
      .then(() => console.log('Book Created'))
      .catch(err => {
        console.error(err);
      });
  };

  handleUserDetailsGenerationUID = e  => {
    console.log('User Details Generated')
      e.preventDefault();

      const {uid} = this.state;

      const UID = {
          uid
      }

      axios.post('http://localhost:3001/getUserDetailsUID', UID)
      .then((response) => {
          //console.log(response.data)
          this.setState({detailsGenerated: false})
          this.setState({details: response.data})
          //console.log(this.state.details)
          this.setState({detailsGenerated: true})
      })
      .catch(err => {
          console.log("Hello")
      })
  }

  handleUserDetailsGenerationEmail = e  => {
    console.log('User Details Generated')
      e.preventDefault();

      const {email} = this.state;

      const Email = {
          email
      }

      axios.post('http://localhost:3001/getUserDetailsEmail', Email)
      .then((response) => {
          //console.log(response.data)
          this.setState({detailsGenerated: false})
          this.setState({details: response.data})
          console.log(this.state.details)
          this.setState({detailsGenerated: true})
      })
      .catch(err => {
          console.log("Hello")
      })
  }

  createUser = e  => {
    console.log('User Generated')
      e.preventDefault();

      const {email, password, phoneNumber, first_name, last_name, emailVerified, disabled} = this.state;

      const User_Details = {
          email,
          password,
          phoneNumber,
          first_name,
          last_name,
          emailVerified,
          disabled
      }

      axios.post('http://localhost:3001/createUser', User_Details)
      .then((response) => {
          this.setState({detailsGenerated: false})
          this.setState({user_created_state: true})
          this.setState({user_created: 'User Created Successfully'})
      })
      .catch(err => {
          console.log("Hello")
      })
  }

  render() {
    return (
      <div style={{paddingLeft:100}}>
        <br />
        <div style={{width:'100%', flexDirection: 'row', alignItems:'center'}}>
            <div style={{padding:20}}>
                <h3 style={{color: 'whitesmoke'}}>Search User Details By UID</h3>
            <form onSubmit={this.handleUserDetailsGenerationUID}>
                <div style={{ width: '10%' }} className="form-group">
                <input
                    type="text"
                    className="form-control"
                    name="uid"
                    placeholder="Enter User UID"
                    onChange={this.handleInputChange}
                />
                </div>
                <br/>
                <div style={{ width: '30%' }}>
                <button className="btn btn-success" type="submit">
                    Generate
                </button>
                </div>
            </form>
            </div>

            <div style={{padding:20}}>
                <h3 style={{color: 'whitesmoke'}}>Search User Details By Email</h3>
                <form onSubmit={this.handleUserDetailsGenerationEmail}>
                    <div style={{ width: '10%' }} className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Enter User Email"
                        onChange={this.handleInputChange}
                    />
                    </div>
                    <br/>
                    <div style={{ width: '30%' }}>
                    <button className="btn btn-success" type="submit">
                        Generate
                    </button>
                    </div>
                </form>
            </div>
        </div>
        


        {this.state.detailsGenerated ? 
        <div style={{padding:20}}>
            <h3 style={{color: 'whitesmoke'}}>Reports Generated With UID or Email</h3>
            <h5 style={{color: 'whitesmoke'}}>UID: {this.state.details.uid}</h5>
            <h5 style={{color: 'whitesmoke'}}>Email Id: {this.state.details.email}</h5>
            <h5 style={{color: 'whitesmoke'}}>Email Verified: {this.state.details.emailVerified ? <>True</> : <>False</>}</h5>
            <h5 style={{color: 'whitesmoke'}}>User Diabled: {this.state.details.disabled ? <>True</> : <>False</>}</h5>
            <h5 style={{color: 'whitesmoke'}}>Last Signin: {this.state.details.metadata.lastSignInTime}</h5>
            <h5 style={{color: 'whitesmoke'}}>Creation Time: {this.state.details.metadata.creationTime}</h5>
        </div> : 
        null}
        

        <br />
        <div style={{padding:20}}>
        <h3 style={{color: 'whitesmoke'}}>Create User</h3>
          <form onSubmit={this.createUser}>
            <div style={{ width: '30%' }} className="form-group">
                
                    <label style={{color: 'whitesmoke'}}>
                        Email:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="email"
                        placeholder="Enter User Email"
                        onChange={this.handleInputChange}
                    />
                    
                    <label style={{color: 'whitesmoke'}}>
                        Password:
                    </label>
              <input
                type="text"
                className="form-control"
                name="password"
                placeholder="Enter User Password"
                onChange={this.handleInputChange}
              />
              
              <label style={{color: 'whitesmoke'}}>
                        Phone Number:
                </label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                onChange={this.handleInputChange}
              />
              <label style={{color: 'whitesmoke'}}>
                        First Name:
                    </label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                placeholder="Enter First Name"
                onChange={this.handleInputChange}
              />
              <label style={{color: 'whitesmoke'}}>
                        Last Name:
                    </label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                placeholder="Enter Last Name"
                onChange={this.handleInputChange}
              />
              
            </div>
            <br/>
            <div style={{ width: '30%' }}>
              <button className="btn btn-success" type="submit">
                Create User
              </button>
            </div>
          </form>
        </div>


        {this.state.user_created_state ?
        <div style={{padding:20}}>
            <h3 style={{color: 'whitesmoke'}}>User Created Successfully</h3>
        </div> : 
        null}
      </div>
    );
  }
}

export default Users;
