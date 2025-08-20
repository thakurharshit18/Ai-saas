"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Star } from "lucide-react";
import axios from "axios";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [tweetStyle, setTweetStyle] = useState("");

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handlesubmit = async () => {
    try {
      const res = await axios.post("https://ai-saas-4iua.onrender.com/ask", {
        question: query,
        style: tweetStyle,
      });
      setResponse(res.data.answer);
    } catch (error) {
      console.error("There was an error in sending the request", error);
    }
  };

  const router = useRouter();
  const handletwitter = () => {
    router.push("https://x.com/compose/post");
  };

  const handleGithubStar = () => {
    window.open("https://github.com/thakurharshit18/Ai-saas", "_blank");
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative">
      <div className="absolute top-4 right-4 flex flex-col items-center space-y-1">
        <button
          onClick={handleGithubStar}
          className="text-yellow-400 hover:text-yellow-500 transition"
          aria-label="Star on GitHub"
        >
          <Star size={28} />
        </button>
        {/* ✅ Responsive text */}
        <p className="text-[10px] sm:text-xs md:text-sm text-gray-400 text-center max-w-[100px] leading-snug">
          Don’t forget to Star the repo
        </p>
      </div>

      <h2 className="mb-6 sm:mb-10 lg:mb-16 text-2xl sm:text-4xl lg:text-5xl text-center text-white font-extralight tracking-wide">
        Tweek My Tweet
      </h2>

      <div className="w-full max-w-lg sm:max-w-xl lg:max-w-2xl">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={(e) => setQuery(e.target.value)}
          onSubmit={handlesubmit}
        />
      </div>

      <div className="mt-6 sm:mt-8">
        <select
          id="tweetStyle"
          value={tweetStyle}
          onChange={(e) => setTweetStyle(e.target.value)}
          className="w-40 sm:w-52 bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block p-2.5 shadow-sm"
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
        <div className="mt-6 sm:mt-10 w-full max-w-lg sm:max-w-xl lg:max-w-2xl p-4 sm:p-6 border border-gray-700 rounded-xl bg-gray-900 shadow-md">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
            Response:
          </h3>
          <p className="text-gray-200 whitespace-pre-line text-sm sm:text-base leading-relaxed">
            {response}
          </p>
        </div>
      )}
    </div>
  );
}
