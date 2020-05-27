import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import { register } from './UserFunctions'
import NavBar from './NavBar'
import FootBar from './FootBar';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            errors: [],
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit (e) {
        e.preventDefault()

        const newUser = {
            name: this.state.first_name + ' ' + this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }
       /* register(newUser).then(res => {
            if(res){
            hashHistory.push(`/login`)
            }
            else {
            }
        })*/
                axios.post('api/register', newUser, {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(response => {
                    this.setState({err: false});
                   // console.log(response)
                   hashHistory.push(`/login`)
                  
                })
                .catch(err => {
                    this.setState({errors:err.response.data})
                    this.setState({err: true});                    
                })
        
    }

    render () {
        let error = this.state.err ;
        let msg = (!error) ? 'Login Successful' : this.state.errors ;
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
                                Register
                            </h1>
                            <div className="form-group">
                                <label htmlFor="name">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    placeholder="Enter your first name"
                                    value={this.state.first_name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Enter your last name"
                                    value={this.state.last_name}
                                    onChange={this.onChange}
                                />
                            </div>
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
                                Register!
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

export default Register