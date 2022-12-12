import { TextFieldFormsy } from '@core/core/formsy';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitLogin } from 'app/auth/store/loginSlice';
import './Login.css';

const useStyles = makeStyles((theme) => ({
	fullBg: {
		backgroundColor: theme.palette.background.paper,
		backgroundImage: 'url(assets/images/backgrounds/Bata_login.jpg)',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		display: 'flex',
		height: '100%',
		overflow: 'hidden',
		width: '100%'
	}
}));

function Login(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const login = useSelector(({ auth }) => auth.login);

	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const formRef = useRef(null);

	useEffect(() => {
		if (login.error && (login.error.email || login.error.password)) {
			formRef.current.updateInputsWithError({
				...login.error
			});
			disableButton();
		}
	}, [login.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(submitLogin(model));
	}

	return (

		<div className={classes.fullBg}>
			<div className="main-login">
				<div className="login-box">
					<div className={classes.card}>
						<div className="logo mt-16">
							<img src="/assets/images/logo.png" alt="Bata Logo" />
						</div>
						<div className="login-text mb-32">
							Intranet Portal <span>Sign In</span>
						</div>
						<div>
							<Box
								sx={{
									backgroundColor: 'background.default',
									display: 'flex',
									flexDirection: 'column',
									height: '100%',
									justifyContent: 'center'
								}}
							>
								<Container maxWidth="sm" disableGutters></Container>
								<div className="w-full">
									<Formsy
										onValidSubmit={handleSubmit}
										onValid={enableButton}
										onInvalid={disableButton}
										ref={formRef}
										className="flex flex-col justify-center w-full"
									>
										<TextFieldFormsy
											className="mb-16"
											type="text"
											name="email"
											label="Username/Email"
											value="bata"
											validations={{
												minLength: 4
											}}
											validationErrors={{
												minLength: 'Min character length is 4'
											}}
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">
														<Icon className="text-20" color="action">
															email
								</Icon>
													</InputAdornment>
												)
											}}
											variant="outlined"
											required
										/>

										<TextFieldFormsy
											className="mb-16"
											type="password"
											name="password"
											label="Password"
											value="test"
											validations={{
												minLength: 4
											}}
											validationErrors={{
												minLength: 'Min character length is 4'
											}}
											InputProps={{
												className: 'pr-2',
												type: showPassword ? 'text' : 'password',
												endAdornment: (
													<InputAdornment position="end">
														<IconButton onClick={() => setShowPassword(!showPassword)}>
															<Icon className="text-20" color="action">
																{showPassword ? 'visibility' : 'visibility_off'}
															</Icon>
														</IconButton>
													</InputAdornment>
												)
											}}
											variant="outlined"
											required
										/>

										<Button
											type="submit"
											variant="contained"
											color="primary"
											className="w-full mx-auto mt-16 normal-case"
											aria-label="LOG IN"
											disabled={!isFormValid}
											value="legacy"
										>
											Login
										</Button>
									</Formsy>
								</div>
							</Box>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
