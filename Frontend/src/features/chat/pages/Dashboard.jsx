import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'



const Dashboard = () => {
 const [sidebarOpen, setSidebarOpen] = useState(false);
const [chatInput, setChatInput] = useState("");

const chat = useChat();

const chats = useSelector((state) => state.chat.chats);
const currentChatId = useSelector((state) => state.chat.currentChatId);

useEffect(() => {
  chat.initializeSocketConnection();
  chat.handleGetChats();
}, []);

const handleSubmitMessage = (e) => {
  e.preventDefault();

  const trimmedMessage = chatInput.trim();

  if (!trimmedMessage) return;

  chat.handleSendMessage({
    message: trimmedMessage,
    chatId: currentChatId,
  });

  setChatInput("");
};

const openChat = (chatId) => {
  chat.handleOpenChat(chatId, chats);
};

console.log("Chats:", chats);
console.log("Current Chat ID:", currentChatId);

    
  return (
   <main className="h-screen  overflow-hidden bg-[#04070c] text-[#e4edf4]">
      <div className="relative h-full overflow-hidden">
        <div className="pointer-events-none  absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#1e9bb3_0%,_transparent_0%),radial-gradient(circle_at_bottom_right,_rgba(129,211,248,0.12)_0%,_transparent_0%),linear-gradient(180deg,_rgba(4,7,12,0.95)_0%,_rgba(4,7,12,1)_100%)]" />

<div className="relative z-10 mx-auto flex  h-full max-w-[1500px] flex-col  overflow-hidden px-3 py-1 sm:px-4 lg:flex-row lg:gap-6">          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex items-center gap-2 rounded-3xl  px-4 py-2.5 text-sm font-semibold text-white"
          >
            {sidebarOpen ? "Close" : "Menu"}
          </button>

          {/* Sidebar */}
      <aside
  className={`${
    sidebarOpen ? "block" : "hidden"
  } lg:block h-screen w-full lg:w-[280px]  bg-white/1.5 backdrop-blur-xl`}
>
  <div className="flex h-full flex-col p-3">
    
    {/* Fixed Header */}
    <div className="shrink-0">
      <div className="flex items-center ">
        <div className="flex h-12 w-12 items-center  justify-center text-[#8ce3ff]">
          <svg className="w-6 h-6 text-[#8ce3ff]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" > <path d="M5.73486 2L11.4299 7.24715V7.24595V2.01211H12.5385V7.27063L18.2591 2V7.98253H20.6078V16.6118H18.2663V21.9389L12.5385 16.9066V21.9967H11.4299V16.9896L5.74131 22V16.6118H3.39258V7.98253H5.73486V2ZM10.5942 9.0776H4.50118V15.5167H5.73992V13.4856L10.5942 9.0776ZM6.84986 13.9715V19.5565L11.4299 15.5225V9.81146L6.84986 13.9715ZM12.5704 15.4691L17.1577 19.4994V16.6118H17.1518V13.9663L12.5704 9.80608V15.4691ZM18.2663 15.5167H19.4992V9.0776H13.4516L18.2663 13.4399V15.5167ZM17.1505 7.98253V4.51888L13.3911 7.98253H17.1505ZM10.6028 7.98253L6.84346 4.51888V7.98253H10.6028Z"></path> </svg>
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#7da3aa] ">
          Perplexity
        </p>
      </div>

      <button className="mt-4 flex w-full items-center gap-1 rounded-2xl bg-[#0d2935]/90 px-2 py-1 text-sm font-semibold text-white">
        <span className="flex h-8 w-8 items-center justify-center text-lg text-[#8ce3ff]">
          +
        </span>
        <span>New Chat</span>
      </button>
    </div>

    {/* Scrollable Part */}
    <div className="mt-4 flex-1 overflow-y-auto sidebar-scroll">
      <h2 className="mb-3 px-3 text-sm font-semibold uppercase  text-[#bcdee2ef]">
        Recents
      </h2>

      <div className="flex flex-col gap-1">
        {Object.values(chats || {}).map((chatItem) => (
          <button
            key={chatItem.id}
            onClick={() => openChat(chatItem.id)}
            className="group flex w-full items-center rounded-xl px-3 py-2 text-left text-sm text-[#9ab7c0] hover:bg-[#0d2935]/80 hover:text-white"
          >
            <span className="truncate">
              {chatItem.title || "New Chat"}
            </span>
          </button>
        ))}
      </div>
    </div>

  </div>
</aside>

          {/* Main Content */}
      <section className="  flex flex-1 flex-col   overflow-hidden  ">
  {!(chats[currentChatId]?.messages?.length > 0) ? (
    /* Empty State */
    <div className="flex h-full items-center justify-center px-6  lg:ml-20 w-[80%]">
      <div className="w-full max-w-3xl">
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-semibold text-white">
            What are you looking for?
          </h1>

          <p className=" text-xs text-[#7da3aa]">
            Ask questions, explore ideas, and get accurate answers in seconds.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-4xl bg-[#0b1821]/90 px-6 py-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-[#7fa9af] focus:outline-none"
          />

          <button
            onClick={handleSubmitMessage}
            disabled={!chatInput.trim()}
            className="flex h-8.5 w-8.5 items-center justify-center rounded-2xl bg-[#8ce3ff] text-[#031b24] transition-all duration-300 hover:scale-105 hover:bg-[#7dd8ff] disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  ) : (
    /* Chat View */
    <>
      <div className="flex-1 min-h-0 overflow-y-auto px-6 py-5 chat-scroll ">
        <div className="flex flex-col gap-4  ">
          {chats[currentChatId]?.messages?.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "user"
                  ? "ml-auto w-fit max-w-[75%] rounded-[28px] bg-[#0d2836]/95 px-5 py-2"
                  : "w-fit max-w-[75%] px-5 py-4"
              }
            >
              {message.role === "user" ? (
                <p className="text-sm text-[#d6f3ff]">
                  {message.content}
                </p>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-2 text-sm text-[#d6f3ff]">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-5 text-sm text-[#d6f3ff]">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-5 text-sm text-[#d6f3ff]">
                        {children}
                      </ol>
                    ),
                    code: ({ children }) => (
                      <code className="rounded bg-black/30 px-1 py-0.5">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="overflow-x-auto rounded-xl bg-black/40 p-3">
                        {children}
                      </pre>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="flex items-center gap-3 rounded-3xl bg-[#0b1821]/90 px-5 py-1.5">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-[#7fa9af] focus:outline-none"
          />

          <button
            onClick={handleSubmitMessage}
            disabled={!chatInput.trim()}
            className="flex h-8.5 w-8.5 items-center justify-center rounded-2xl bg-[#8ce3ff] text-[#031b24] transition-all duration-300 hover:scale-105 hover:bg-[#7dd8ff] disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
            </svg>
          </button>
        </div>
      </div>
    </>
  )}
</section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
