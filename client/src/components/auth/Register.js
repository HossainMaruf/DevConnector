import React from 'react';
import PropTypes from 'prop-types';
import {Navigate} from 'react-router-dom';
import {withRouter} from './withRouter';
import axios from 'axios';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authActions';

class Register extends React.Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			passwordConfirmed: '',
			errors: {},
			redirect: false
		}
	this.onchangeHandler = this.onchangeHandler.bind(this);
	this.onsubmitHandler = this.onsubmitHandler.bind(this);
	}

	// afterMount
	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.setState({redirect: true});
		}
	}

	// on change handler function
	onchangeHandler(e) {
		this.setState({[e.target.name]: e.target.value});
	}
	// on submit handler function
	onsubmitHandler(e) {
		e.preventDefault();
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			passwordConfirmed: this.state.passwordConfirmed,
		}
		// console.log(newUser);
		this.props.registerUser(newUser, this.props.history); 
	}
	// component will receive props
	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
			this.setState({errors: nextProps.errors});
		} 
	}
render() {
	const {errors} = this.state;
	if(this.state.redirect) return <Navigate to="/dashboard" />
return (
<div className="register">
	<div className="container">
		<div className="row">
			<div className="col-md-8 m-auto">
				<h1 className="display-4 text-center">Sign Up</h1>
				<p className="lead text-center">Create your DevConnector account</p>
				<form noValidate onSubmit={this.onsubmitHandler}>
					<div className="form-group">
						<input type="text" className={classnames('form-control form-control-lg', {
							'is-invalid': errors?.name
						})} onChange={this.onchangeHandler} value={this.state.name} placeholder="Name" name="name" required />
						{errors?.name && <div className="invalid-feedback">{errors.name}</div>}
					</div>
					<div className="form-group">
						<input type="email" className={classnames('form-control form-control-lg', {
							'is-invalid': errors?.email
						})} onChange={this.onchangeHandler} value={this.state.email} placeholder="Email Address" name="email" />
						{errors?.email && <div className="invalid-feedback">{errors.email}</div>}
						<small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
					</div>
					<div className="form-group">
						<input type="password" className={classnames('form-control form-control-lg', {
							'is-invalid': errors?.password
						})} placeholder="Password" onChange={this.onchangeHandler} value={this.state.password} name="password" />
						{errors?.password && <div className="invalid-feedback">{errors.password}</div>}
					</div>
					<div className="form-group">
						<input type="password" className={classnames('form-control form-control-lg', {
							'is-invalid': errors?.passwordConfirmed
						})} placeholder="Confirm Password" onChange={this.onchangeHandler} value={this.state.passwordConfirmed} name="passwordConfirmed" />
						{errors?.passwordConfirmed && <div className="invalid-feedback">{errors.passwordConfirmed}</div>}
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

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register));