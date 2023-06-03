
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Header from "./Header";
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
  auth,
  email,
  password
);
const user = userCredential.user;
localStorage.setItem("email", user.email);
localStorage.setItem("password", password);
localStorage.setItem("displayName", user.displayName);

    navigate("/");
  } catch (error) {
     if (error.code === 'auth/user-not-found') {
        setErrorMessage('Account not found. Please create an account first.');
      }  
     else setErrorMessage(error.message);
  }
};


  return (
    <>
    <Header/>
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full space-y-4 p-8 bg-white rounded-md shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-800">Log in</h2>
        {errorMessage && (
          <div className="text-red-500 font-bold">{errorMessage}</div>
        )}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-800 font-bold mb-2"
          >
            Email
          </label>
          <input
         type="email"
          id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
          className="w-full border-2 border-gray-400 p-2 rounded-md" required/>

        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-gray-800 font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full border-2 border-gray-400 p-2 rounded-md"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-bold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ..."
          >
            Log in
          </button>
          <Link
            to="/register"
            className="text-blue-600 font-bold hover:underline "
          >
            Register
          </Link>
        </div>
      </form>
    </div>
    </>
  );
}

export default Login;
