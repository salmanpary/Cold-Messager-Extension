/*global chrome*/
"use client"
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/globals.css'
import { AuthContextProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }) {

  return (
    <AuthContextProvider>
      <Header/>
        <Component {...pageProps} />
      <Footer />
    </AuthContextProvider>
  );
}