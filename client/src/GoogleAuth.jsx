
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuth = () => {
const clientId = "client id";
const handleSuccess = async (credentialResponse) => {
    console.log(credentialResponse);

    // Send the response to your backend server
    try {
      const response = await fetch('base url/google-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const data = await response.json();
      console.log('Server response:', data);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };
return (
<GoogleOAuthProvider clientId={clientId}>
<GoogleLogin
  onSuccess={handleSuccess}
onError={() => {
console.log('Login Failed');
}}
/>
</GoogleOAuthProvider>
);
};

export default GoogleAuth;