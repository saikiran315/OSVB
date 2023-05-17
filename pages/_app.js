// import "../styles/globals.css";
// import { Analytics } from '@vercel/analytics/react';
// import emailjs from '@emailjs/browser';

// // import { AuthUserProvider } from "../context/AuthUserContext";

// import { AuthContextProvider } from "../context/AuthUserContext";
// const App = () => {
//   // const [email, setEmail] = useState('');
//   // const [subject, setSubject] = useState('');
//   // const [message, setMessage] = useState('');

//   // const sendEmail = () => {
//   //   const emailjs = new EmailJS({
//   //     apiKey: 'a7Q45_gXvq8wekhqM',
//   //     host: 'smtp.gmail.com',
//   //     port: '587',
//   //     username: 'sai.dharmapu@gmail.com',
//   //     password: '!@164313',
//   //   });
 
//   //   emailjs.send({
//   //     to: email,
//   //     from: 'sai.dharmapu@gmail.com',
//   //     subject: subject,
//   //     text: message,
//   //   });
//   // };

//   return (
//     <div>
//       {/* <input
//         type="email"
//         placeholder="Recipient Email Address"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Subject"
//         value={subject}
//         onChange={(e) => setSubject(e.target.value)}
//       />
//       <textarea
//         placeholder="Message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendEmail}>Send Email</button> */}
//     </div>
//   );
// };
// export default App;


import "../styles/globals.css";
import { Analytics } from '@vercel/analytics/react';
// import { AuthUserProvider } from "../context/AuthUserContext";

import { AuthContextProvider } from "../context/AuthUserContext";
function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
      <Analytics />
    </AuthContextProvider>  
  );
}

export default MyApp;
