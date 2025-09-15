---
sidebar_position: 1
---

# Logging into Prevent

Get started with Factory AI Prevent CMMS by logging into your account. Our secure authentication system provides multiple ways to access your maintenance management platform.

## What you'll need

- A modern desktop or mobile browser (we recommend Google Chrome or Firefox)
- Your Factory AI account credentials
- Access to your email for passwordless authentication (optional)
- A registered passkey device for advanced authentication (optional)

## Login Process

Factory AI Prevent uses the same secure authentication system as Predict, providing a consistent login experience across all Factory AI products.

### Step 1: Navigate to Login

**For Predict customers accessing Prevent:**
1. Navigate to `https://[customer-domain].f7i.ai/login`
2. You can find your customer domain in the sign-in instructions sent via email
3. After login, you'll have access to both Predict and Prevent features

**For Prevent-only customers:**
1. Navigate to `https://app.f7i.ai/login`
2. Use your Factory AI Prevent account credentials

### Step 2: Enter Your Email

1. Enter your email address in the email field
2. Click **Continue** to proceed to the next step

The system will automatically check for available authentication methods for your account.

### Step 3: Authentication Method

After entering your email, the system checks what authentication methods are available for your account:

#### Biometric Authentication (If Available)

If you have biometric authentication set up on your account, the system will automatically prompt you to authenticate using your biometrics:

1. Your browser will prompt you to use your registered biometric authentication
2. Use your fingerprint, face ID, or security key as configured
3. You'll be automatically signed in upon successful authentication

If biometric authentication fails or times out, you'll be redirected to the password authentication step.

#### Password Authentication (Default)

If you don't have biometric authentication set up, or if biometric authentication fails, you'll see the password authentication screen:

1. Enter your password in the password field
2. Click **Continue with Password** to sign in

From this screen, you also have additional authentication options:

##### Email OTP (Passwordless Login)
1. Click **Sign in without password** 
2. **Re-enter your email address** when prompted
3. Click **Send Email Code**
4. You'll receive an **8-digit code** via email
5. Enter the code to complete authentication

##### Forgot Password
1. Click **Forgot your password?**
2. **Re-enter your email address** when prompted  
3. Click **Send Reset Code**
4. Check your email for password reset instructions
5. Follow the link to create a new password

#### SSO (Single Sign-On)

If your organization has SSO configured:

1. From the password step, click **SSO**
2. You'll be redirected to your organization's identity provider
3. Sign in with your corporate credentials
4. You'll be redirected back to Factory AI Prevent

:::info Password Requirements
Passwords must be at least 12 characters and contain:
- An uppercase letter
- A lowercase letter  
- A number
- A special character
:::

### Email Verification (8-Digit Code)

When using Email OTP (passwordless login):

1. After re-entering your email address, check your email for an **8-digit verification code**
2. Enter the 8-digit code in the verification field
3. Click **Verify** to complete authentication

## First-Time Login

If this is your first time logging in:

1. Use the temporary credentials sent in your welcome email
2. You'll be prompted to set a new password
3. Follow the password requirements shown above
4. Once completed, you'll be redirected to the Prevent dashboard

## Accessing Different Products

After successful authentication, your available features depend on your subscription:

**For Predict customers (customer-domain.f7i.ai):**
- **Prevent CMMS**: Navigate to the work orders, assets, and maintenance features
- **Predict Monitoring**: Switch to predictive maintenance and sensor monitoring
- **Unified Experience**: Access both products with a single login

**For Prevent-only customers (app.f7i.ai):**
- **Prevent CMMS**: Full access to work orders, assets, and maintenance features
- **Integrated Experience**: All CMMS functionality in one unified interface

The unified authentication system means you only need to log in once to access all available Factory AI products for your organization.

## Troubleshooting

### Common Issues

**Email not recognized**
- Verify you're using the correct email address
- Check if you need to sign up for an account first
- Contact your administrator if you should have access

**Password not working** 
- Use the "Forgot your password?" link to reset (you'll need to re-enter your email)
- Ensure caps lock is off
- Check for any browser auto-fill issues

**Biometric authentication fails**
- Try the authentication again if prompted
- Ensure your device supports biometric authentication
- Check browser permissions for biometric authentication
- You'll automatically fall back to password authentication

**8-digit email code not received**
- Check your spam/junk folder
- Verify your email address was entered correctly when prompted
- Wait a few minutes and try requesting a new code
- Contact support if issues persist

### Browser Compatibility

For the best experience with Prevent CMMS:
- **Chrome/Edge**: Full support for all authentication methods and mobile features
- **Firefox**: Full support for all authentication methods and mobile features  
- **Safari**: Basic support (password and email verification), mobile app recommended

## Mobile Access

Factory AI Prevent is designed for mobile use:

- **Progressive Web App (PWA)**: Install Prevent as an app on your mobile device
- **Responsive Design**: Works seamlessly on tablets and smartphones
- **Offline Capabilities**: Access critical features even without internet connection
- **Touch-Optimized**: Interface designed for touch interactions

## Security Features

Factory AI Prevent implements comprehensive security measures:

- **Unified authentication**: Same secure login across all Factory AI products
- **Multi-factor authentication (MFA)**: Support for biometric authentication and email verification
- **Role-based access**: Control what users can see and do in the system
- **Session management**: Automatic logout after inactivity
- **Audit trails**: Track all user actions and system changes
- **Data encryption**: All data encrypted in transit and at rest

## Setting Up Passkeys

To enable fast, secure biometric authentication across all Factory AI products:

1. Log in to either Predict or Prevent
2. Navigate to **Settings** → **Security**
3. Follow the passkey setup instructions
4. Your passkeys will work for both Predict and Prevent

For detailed passkey setup instructions, see the [Predict login documentation](/docs/predict/getting-started/login#setting-up-passkeys-biometric-authentication).

After successful authentication, you'll be redirected to the Factory AI Prevent dashboard where you can begin managing your maintenance operations, work orders, and assets.
