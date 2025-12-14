// js/admin-login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('admin-email');
    const passwordInput = document.getElementById('admin-password');
    const loginError = document.getElementById('login-error');
    const loginButton = document.getElementById('login-button');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;
        
        loginButton.disabled = true;
        loginButton.textContent = 'Logging in...';
        loginError.style.display = 'none';

        if (!firebase || !firebase.auth) {
            loginError.textContent = 'Firebase is not initialized.';
            loginError.style.display = 'block';
            loginButton.disabled = false;
            loginButton.textContent = 'Login';
            return;
        }

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                // Check if user exists in staffUsers collection
                const user = userCredential.user;
                const db = firebase.firestore();
                
                try {
                    const staffDoc = await db.collection('staffUsers').doc(user.uid).get();
                    
                    if (!staffDoc.exists) {
                        // User not in staff database
                        throw new Error('You are not authorized to access the admin panel.');
                    }
                    
                    const staffData = staffDoc.data();
                    
                    if (!staffData.isActive) {
                        // User account is deactivated
                        throw new Error('Your account has been deactivated. Please contact an administrator.');
                    }
                    
                    // Success! User is authorized
                    // Store user role in session storage for UI customization
                    sessionStorage.setItem('userRole', staffData.role);
                    sessionStorage.setItem('userDisplayName', staffData.displayName || email);
                    
                    if (window.Logger) {
                        window.Logger.log(`Staff login successful: ${email} (${staffData.role})`);
                    }
                    
                    // Check if there's a redirect URL parameter
                    const urlParams = new URLSearchParams(window.location.search);
                    const redirectUrl = urlParams.get('redirect');
                    
                    if (redirectUrl) {
                        window.location.href = decodeURIComponent(redirectUrl);
                    } else {
                        window.location.href = 'admin.html';
                    }
                    
                } catch (validationError) {
                    // Sign out the user since they're not authorized
                    await firebase.auth().signOut();
                    
                    if (window.Logger) {
                        window.Logger.error("Authorization failed:", validationError.message);
                    }
                    
                    loginError.textContent = validationError.message;
                    loginError.style.display = 'block';
                    loginButton.disabled = false;
                    loginButton.textContent = 'Login';
                }
            })
            .catch((error) => {
                // Handle Authentication Errors
                if (window.Logger) {
                  window.Logger.error("Login failed:", error.code, error.message);
                }
                if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    loginError.textContent = 'Invalid email or password.';
                } else {
                    loginError.textContent = error.message || 'An error occurred. Please try again.';
                }
                loginError.style.display = 'block';
                loginButton.disabled = false;
                loginButton.textContent = 'Login';
            });
    });
});