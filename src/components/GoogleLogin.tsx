import { GoogleLogin as GoogleOAuthLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';

interface GoogleLoginProps {
  onSuccess: (credentialResponse: CredentialResponse) => void;
}

// https://dev.to/lovestaco/integrating-google-sign-in-with-react-a-dev-friendly-guide-29hn
// https://www.npmjs.com/package/jwt-decode
const GoogleLogin = ({ onSuccess }: GoogleLoginProps) => {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome</h1>
        <p className="text-gray-400">Sign in with your Google account</p>
      </div>

      <div className="flex justify-center">
        <GoogleOAuthLogin
          onSuccess={onSuccess}
          onError={() => {
            console.error('Login Failed');
          }}
          theme="filled_blue"
          size="large"
          text="signin_with"
          shape="rectangular"
        />
      </div>
    </>
  );
}

export default GoogleLogin;