"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, Send, Trash2 } from "lucide-react";

const difficultyLevels = [
  "Kindergarten",
  "Elementary",
  "High School",
  "College",
];

export default function ChatbotUI() {
  const [messages, setMessages] = useState<
    { role: "user" | "bot"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("Elementary");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `You are an AI model that explains everything in detail to the user. Address the user directly, not as a group. Provide a clear and detailed explanation of the following prompt: '${input}', at a '${difficultyLevel}' level. Clearly mention that you are explaining it at this difficulty level. Do not use any special text formatting such as bold, italics, or bullet points. Present the explanation in well-structured paragraphs only. `,
        }),
      });

      const data = await res.json();
      const botResponse = data.response || "Error fetching response";

      setMessages((prev) => [...prev, { role: "bot", content: botResponse }]);
    } catch (error) {
      console.error("Request failed:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error connecting to API" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Clear Chat Function
  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div>
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl shadow-none bg-indigo-200 text-gray-700">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Explain Like I am in ..
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewChat}
                className="md:flex items-center gap-1 hidden"
              >
                <Trash2 className="h-4 w-4" /> New Chat
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewChat}
                className="md:hidden"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Tabs
              defaultValue={difficultyLevel}
              className="w-full"
              onValueChange={setDifficultyLevel}
            >
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 bg-indigo-300">
                {difficultyLevels.map((level) => (
                  <TabsTrigger
                    value={level}
                    key={level}
                    className="text-black md:bg-transparent data-[state=active]:bg-white data-[state=inactive]:bg-indigo-300 md:data-[state=inactive]:bg-transparent"
                  >
                    {level}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh] pr-4 mt-12">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 mb-4 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "bot" && (
                    <Avatar className="h-8 w-8 hidden md:block">
                      <AvatarImage src="/bot-avatar.png" alt="AI Bot" />
                      <AvatarFallback>
                        <Brain className="text-gray-500" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={` max-w-full  p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-indigo-400 text-white"
                        : "bg-gray-100 text-black"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <Avatar className="h-8 w-8 hidden md:block">
                      <AvatarImage src="/user-avatar.png" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {loading && (
                <p className="text-center text-gray-500">Thinking...</p>
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow bg-indigo-300 outline-none border-none"
                disabled={loading}
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gray-700"
                disabled={loading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
