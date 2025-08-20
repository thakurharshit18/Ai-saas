"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import axios from 'axios';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
export default function HeroSection() {
  const [query,setQuery]=useState("");
  const [response,setResponse]=useState("");
  const [tweetStyle,setTweetStyle]=useState("");
 const placeholders=[
"What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?"
 ]
  const handlesubmit = async ()=> {
try {
    const res =  await axios.post("http://localhost:3002/ask",{
    question:query,
    style:tweetStyle
});
setResponse(res.data.answer);
  }
 catch (error) {
    console.error("there was a error in sending the request",error);
}

  }  
  const router =useRouter();
const handletwitter = ()=>{
  router.push("https://x.com/compose/post")
}

  return (
<>
<div className='bg-black'>
<div className="h-screen flex flex-col justify-center items-center px-4">
  <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-white text-glow font-extralight">
    Tweek My Tweet
  </h2>
  <PlaceholdersAndVanishInput 
    placeholders={placeholders}
    onChange={(e)=>setQuery(e.target.value)} 
    onSubmit={handlesubmit}
  />
 <div className="text-white mt-6">
  
  <select
    id="tweetStyle"
    value={tweetStyle}
    onChange={(e) => {
      console.log("Selected:", e.target.value); // ✅ Debug check
      setTweetStyle(e.target.value);
    }}
    className="bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-lg 
               focus:ring-blue-500 focus:border-blue-500 block w-52 p-2.5 shadow-sm"
  >
    <option value="">Style</option>
    <option value="sarcastic">Sarcastic</option>
    <option value="sad">Sad</option>
    <option value="formal">Formal</option>
    <option value="casual">Casual</option>
    <option value="serious">Serious</option>
  </select>
</div>

  {response && (
    <div className="mt-6 w-full max-w-2xl p-4 border border-gray-700 rounded-xl bg-gray-900 shadow-md">
      <h3 className="text-lg font-semibold text-white mb-2">Response:</h3>
      <p className="text-gray-200 whitespace-pre-line">{response}</p>
    </div>
  )}

  {/* <button className='text-white'
  onClick={handletwitter}><X size={20}/></button> */}
</div>

</div>

</>  
)}
