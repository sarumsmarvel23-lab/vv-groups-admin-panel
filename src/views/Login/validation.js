export function validateLoginData(reqData) {
    const {email, password} = reqData;
    const validErr = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email) {
        validErr.email = 'Email is required';
    }else if(!emailRegex.test(email)) {
        validErr.email = 'Email is invalid';
    }
    
    if(!password) {
        validErr.password = 'Password is required';
    }
    return {
        isValid: Object.keys(validErr).length === 0,
        validErr
    };
}