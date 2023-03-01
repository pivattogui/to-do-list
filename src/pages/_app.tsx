import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';
import Head from "next/head";
import AppLayout from '../components/AppLayout';


const contextClass = {
  success: "bg-white text-green-600 text-green-800",
  error: "bg-white shadow-md text-red-800 font-medium",
  info: "bg-gray-600",
  default: "bg-indigo-500 text-white",
  warning: "bg-white shadow-md text-yellow-700 font-medium",
  dark: "bg-white font-gray-300",
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>ToDoList</title>
      </Head>
      <div className="h-screen">
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <ToastContainer
          transition={Slide}
          toastClassName={(props) => contextClass[props.type || "default"] +
            " relative rounded-lg flex p-6 min-h-10 mt-5 overflow-hidden cursor-pointer"
          }
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </SessionProvider>
  )
}
