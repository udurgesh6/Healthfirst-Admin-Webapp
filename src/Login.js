import React from 'react'

function Login(props) {

    const { email, setEmail, password, setPassword, handleLogin, hasAccount, setHasAccount, emailError, passwordError} = props;

    return (
        <div className="login">
            <div className="loginContainer">
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
                <h1 style={{color: 'whitesmoke', fontWeight: 'bold'}}>Admin Login</h1>
                </div>
                
                <label>Username</label>

                <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <p className="errorMsg">{emailError}</p>

                <label>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>

                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        <button style={{padding: 5, paddingLeft:10, paddingRight:10, backgroundColor:'whitesmoke', borderRadius: 12}} onClick={handleLogin}>Sign In</button>
                        {/* <p>Don't have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p> */}
                        </>
                    ): (
                        <>
                        <button>Sign Up</button>
                        <p>Have an account ? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p>
                        </>
                    )}
                    
                </div>

            </div>
        </div>
    )
}

export default Login
