import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from './withRouter';
import classnames from 'classnames';
import {Navigate} from 'react-router-dom';
import {loginUser} from '../../actions/authActions';

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {},
			redirect: false
		}
		this.onchangeHandler = this.onchangeHandler.bind(this);
		this.onsubmitHandler = this.onsubmitHandler.bind(this);
	}
	// auto redirect
	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			// this.props.history('/dashboard');
			this.setState({redirect: true});
			// console.log(this.props.auth.isAuthenticated);
			// console.log("Mount", this.props);
		}
	}
	// component will receive props
	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.isAuthenticated) {
			this.props.history('/dashboard');
		}
		if(nextProps.errors) {
			this.setState({errors: nextProps.errors});
		} 
	}
	// on change the form input
	onchangeHandler(e) {
		this.setState({[e.target.name]: e.target.value});
	}
	// on submit the form
	onsubmitHandler(e) {
		e.preventDefault();
		const user = {
			email: this.state.email,
			password: this.state.password
		}
		// console.log(user);
		this.props.loginUser(user, this.props.history); 
	}
render() {
	const {errors} = this.state;
	if(this.state.redirect) return <Navigate to="/dashboard" />
	return (
		<div className="login">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Log In</h1>
						<p className="lead text-center">Sign in to your DevConnector account</p>
						<form onSubmit={this.onsubmitHandler}>
							<div className="form-group">
								<input type="email" onChange={this.onchangeHandler} className={classnames('form-control form-control-lg', {
									'is-invalid': errors?.email
								})} placeholder="Email Address" name="email" />
								{errors?.email && <div className="invalid-feedback">{errors.email}</div>}
							</div>
							<div className="form-group">
								<input type="password" onChange={this.onchangeHandler} className={classnames('form-control form-control-lg', {
									'is-invalid': errors?.password
								})} placeholder="Password" name="password" />
								{errors?.password && <div className="invalid-feedback">{errors.password}</div>}
							</div>
							<input type="submit" className="btn btn-info btn-block mt-4" />
						</form>
					</div>
				</div>
			</div>
		</div>	  
		)
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(withRouter(Login));