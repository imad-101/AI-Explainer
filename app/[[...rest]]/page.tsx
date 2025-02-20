"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { Brain, Lightbulb, Zap, MessageCircle } from "lucide-react";
import { SignUp, SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function LandingPage() {
  const [showIn, setShowIn] = useState(false);
  const { user, isSignedIn } = useUser();
  const features = [
    { icon: Brain, text: "AI-Powered Explanations" },
    { icon: Lightbulb, text: "Adaptive Learning" },
    { icon: Zap, text: "Instant Answers" },
  ];
  const demoConversation = [
    {
      role: "bot",
      message: "Hello! How can I explain something to you today?",
    },
    { role: "user", message: "Can you explain quantum computing?" },
    {
      role: "bot",
      message:
        "Quantum computing is like a super-powerful computer that uses the weird rules of quantum physics to solve complex problems much faster than regular computers.",
    },
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<
    typeof demoConversation
  >([]);

  useEffect(() => {
    if (currentMessageIndex < demoConversation.length) {
      const timer = setTimeout(() => {
        setDisplayedMessages((prev) => [
          ...prev,
          demoConversation[currentMessageIndex],
        ]);
        setCurrentMessageIndex((prev) => prev + 1);
      }, 2000); // Adjust timing as needed

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, demoConversation]);

  return (
    <div className="flex flex-col md:flex-row gap-8  justify-between ">
      {/* Left side - Welcome Message */}
      <div className="flex-2 md:ml-28 flex items-center justify-center p-6 mx-auto">
        <div className="max-w-xl space-y-8 md:mt-5 ">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-indigo-700"
          >
            AI Explainer
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your AI-powered explanation companion. Get concepts explained at
            your preferred level, from simple to advanced. Start learning with
            ELI Bot today!
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <feature.icon className="w-6 h-6 text-indigo-600" />
                <span className="text-gray-700">{feature.text}</span>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          ></motion.div>

          {/* Interactive Animation Demo */}
          <motion.div
            className="bg-white p-4 rounded-lg shadow-lg hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="space-y-2 h-64 overflow-y-auto">
              <AnimatePresence>
                {displayedMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-start space-x-2 mt-7"
                  >
                    {msg.role === "bot" ? (
                      <div className="bg-indigo-100 p-2 rounded-full">
                        <Brain className="w-6 h-6 text-indigo-600" />
                      </div>
                    ) : (
                      <div className="bg-blue-100 p-2 rounded-full">
                        <MessageCircle className="w-6 h-6 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={`flex-1 p-3 rounded-lg ${
                        msg.role === "bot" ? "bg-indigo-100" : "bg-blue-100"
                      }`}
                    >
                      <p className="text-gray-700">{msg.message}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="mt-2 flex justify-end"></div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Login/Signup placeholder */}
      <div
        className=" md:ml-16 flex-1 flex items-center mx-auto justify-center p-2 mb-5 md:mb-0"
        id="account"
      >
        {user && isSignedIn ? (
          <p className="text-2xl text-gray-700">
            You Are Already Signed In{" "}
            <span className="text-blue-600">
              <Link href={"/chat-bot"}>Click Here To Go To The Dashboard</Link>
            </span>
          </p>
        ) : (
          <div className="w-full max-w-sm">
            {showIn ? (
              <SignIn
                appearance={{
                  elements: {
                    footer: "hidden", // Hides Clerk's built-in "Sign up" link
                  },
                }}
              />
            ) : (
              <SignUp
                appearance={{
                  elements: {
                    footer: "hidden", // Hides Clerk's built-in "Sign in" link
                  },
                }}
              />
            )}
            {/* Custom toggle link below */}
            <p className="text-center mt-4 text-gray-700">
              {showIn ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className="text-blue-600 cursor-pointer underline"
                onClick={() => setShowIn(!showIn)}
              >
                {showIn ? "Sign up" : "Sign in"}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
