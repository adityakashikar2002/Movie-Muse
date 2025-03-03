// SignInWithGoogle.js
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInwithGoogle() {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("Logged in with Google successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        window.location.href = "/app";
      }
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="google-signin-container">
      <p className="google-signin-text">-- Or continue with --</p>
      <div className="google-signin-button" onClick={googleLogin}>
        <img src={require("../google.png")} alt="Google" className="google-icon" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;