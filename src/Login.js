import React from "react"
import './loginCSS.css';


class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            username: "",
            password: "",

        }
        this.handleChange = this.handleChange.bind(this)

        this.handleButtonClicked = this.handleButtonClicked.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleButtonClicked() {
        if (this.state.username === "" || this.state.password === "") {
            alert("Fill all fields")
        }

        else if (this.state.username === "max" && this.state.password === "123") {
            localStorage.setItem("username", "max")
            localStorage.setItem("password", "123")
            this.props.history.push('/home')
        }
        else {
            alert("Wrong username or password")
        }


    }

    componentDidMount() {
        if (localStorage.getItem("username") === "max") {
            this.props.history.push('/home')
        }
    }

    render() {
        return (
            /* <div className="Add-form-container">
                *<div className="Add-form">

                         <input className="details-text-input"
                                name="username"
                                type="text"
                                onChange={this.handleChange}
                                placeholder="Name"
                                value={this.state.prodName}/>
                         <input className="details-text-input"
                                name="password"
                                value={this.state.desc}
                                type="text"
                                onChange={this.handleChange}
                                placeholder="Description"/>

                         <button className="details-buttons" onClick={this.handleButtonClicked}>Back to main page</button>

                 </div>
             </div>
             */
            <div className='loginBackground'>
                <div className="loginFormContainer">
                    <div className="login100-form validate-form">
					<span className="login100-form-title">
						 Login
					</span>

                        <div className="wrap-input100 validate-input"
                             data-validate="Valid email is required: ex@abc.xyz">
                            <input onChange={this.handleChange} className="input100" type="text" name="username"
                                   placeholder="username"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
							<i className="fa fa-user" aria-hidden="true"></i>
						</span>
                        </div>

                        <div className="wrap-input100 validate-input" data-validate="Password is required">
                            <input onChange={this.handleChange} className="input100" type="password" name="password"
                                   placeholder="Password"/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
                        </div>

                        <div className="container-login100-form-btn">
                            <button className="login100-form-btn" onClick={this.handleButtonClicked}>
                                Login
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        )
    }


}

export default Login;