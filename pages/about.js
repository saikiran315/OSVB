import React,{useState} from 'react'
import Head from "next/head";
const about = () => {
    const [buttonText, setButtonText] = useState('Click me!')
    function handleClick() {
        setButtonText('You clicked the button!')
      }
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
          <Head>
            <title>About page</title>
            <meta name="description" content="This is the about page" />
          </Head>
          <h1 className="text-4xl font-bold mb-4">About page</h1>
          <p className="mb-8">Welcome to the about page!</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleClick}>{buttonText}</button>
        </div>
      )
}

export default about