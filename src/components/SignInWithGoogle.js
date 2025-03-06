// import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth, db } from "./firebase";
// import { toast } from "react-toastify";
// import { setDoc, doc } from "firebase/firestore";

// function SignInWithOAuth() {
//   const googleLogin = async () => {
//     const provider = new GoogleAuthProvider();
//     await handleOAuthLogin(provider);
//   };

//   const githubLogin = async () => {
//     const provider = new GithubAuthProvider();
//     await handleOAuthLogin(provider);
//   };

//   const facebookLogin = async () => {
//     const provider = new FacebookAuthProvider();
//     await handleOAuthLogin(provider);
//   };

//   const handleOAuthLogin = async (provider) => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;
//       if (user) {
//         await setDoc(doc(db, "Users", user.uid), {
//           email: user.email,
//           firstName: user.displayName || "",
//           photo: user.photoURL || "",
//           lastName: "",
//         });
//         toast.success(`Logged in with ${provider.providerId.split('.')[0]} successfully!`, {
//           position: "top-center",
//           autoClose: 2000,
//         });
//         window.location.href = "/app";
//       }
//     } catch (error) {
//       toast.error(error.message, {
//         position: "bottom-center",
//         autoClose: 3000,
//       });
//     }
//   };

//   return (
//     <div className="oauth-signin-container">
//       <p className="oauth-signin-text">-- Or continue with --</p>
//       <div className="oauth-buttons">
//         <div className="oauth-button google-signin-button" onClick={googleLogin}>
//           <img src={require("../google.png")} alt="Google" className="oauth-icon" />
//         </div>
//         <div className="oauth-button github-signin-button" onClick={githubLogin}>
//           <img src={require("../github.png")} alt="GitHub" className="oauth-icon" />
//         </div>
//         <div className="oauth-button facebook-signin-button" onClick={facebookLogin}>
//           <img src={require("../facebook.png")} alt="Facebook" className="oauth-icon" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignInWithOAuth;

import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInWithOAuth() {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await handleOAuthLogin(provider, "google");
  };

  const githubLogin = async () => {
    const provider = new GithubAuthProvider();
    provider.addScope("read:user"); // Request GitHub username
    await handleOAuthLogin(provider, "github");
  };

  const facebookLogin = async () => {
    const provider = new FacebookAuthProvider();
    provider.addScope("email"); // Ensure email is requested
    await handleOAuthLogin(provider, "facebook");
  };

  const handleOAuthLogin = async (provider, type) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      let email = "";
      let username = "";

      if (type === "google") {
        username = user.reloadUserInfo?.screenName || user.displayName || "";
        email = user.email || "";
      } else if (type === "github") {
        username = user.reloadUserInfo?.screenName || user.displayName || "";
      } else if (type === "facebook") {
        username = user.displayName || "";
        email = user.email || result.additionalUserInfo?.profile?.email || "";
      }

      // Store user data in Firestore
      await setDoc(doc(db, "Users", user.uid), {
        email,
        firstName: username,
        photo: user.photoURL || "",
        lastName: "",
      });

      toast.success(`Logged in with ${type} successfully!`, {
        position: "top-center",
        autoClose: 2000,
      });

      window.location.href = "/app";
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="oauth-signin-container">
      <p className="oauth-signin-text">-- Or continue with --</p>
      <div className="oauth-buttons">
        <div className="oauth-button google-signin-button" onClick={googleLogin}>
          <img src={require("../google.png")} alt="Google" className="oauth-icon" />
        </div>
        <div className="oauth-button github-signin-button" onClick={githubLogin}>
          <img src={require("../github.png")} alt="GitHub" className="oauth-icon" />
        </div>
        <div className="oauth-button facebook-signin-button" onClick={facebookLogin}>
          <img src={require("../facebook.png")} alt="Facebook" className="oauth-icon" />
        </div>
      </div>
    </div>
  );
}

export default SignInWithOAuth;

