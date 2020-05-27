import React, { Component } from 'react'
import { login } from './UserFunctions'
import { Link, hashHistory } from 'react-router';
import NavBar from './NavBar'
import FootBar from './FootBar';
class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            error:'',
            loggedIn:localStorage.setItem('loginVar', false), 
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit(e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }

        login(user).then(res => {
            if (res) {
               this.setState({loggedIn:true,err:false},() => {
             localStorage.setItem('loginVar', JSON.stringify(true))})
              hashHistory.push(`/`)

            }
            else {
                this.setState({error:"Invalid credentials"});
                this.setState({loggedIn:false,err:true},() => {
                    localStorage.setItem('loginVar', JSON.stringify(false))})
        }
            
        })
       
    }

    render() {
        let error = this.state.err ;
        let msg = (!error) ? 'Login Successful' : 'Wrong Credentials' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
        return (
            <div>
                <NavBar/>
           
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                    {error != undefined && <div className={name} role="alert">{msg}</div>}
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">
                                Please sign in
                            </h1>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
                </div>
                <FootBar/>
            </div>
        )
    }
}

export default Login