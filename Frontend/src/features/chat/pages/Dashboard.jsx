import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../../auth/hooks/useAuth";
import { toggleTheme } from "../../theme/theme.slice";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatToDelete, setChatToDelete] = useState(null);

  const auth = useAuth();
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

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
    <main className="h-screen relative overflow-hidden bg-[#F1F5F9] dark:bg-[#04070c] text-gray-900 dark:text-white transition-colors duration-300">
      {" "}
      <div className="flex items-center gap-2">
        <div className="absolute top-2 right-3 z-50">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="absolute top-4 right-6 z-50 rounded-xl border border-black/10 dark:border-white/10 bg-white/5 px-2.5 py-1.5 backdrop-blur-md"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
      <div className="relative h-full overflow-hidden">
        <div className="pointer-events-none  absolute inset-0 " />

        <div className="relative z-10 mx-auto flex  h-full max-w-[1500px] flex-col  overflow-hidden px-3 py-1 sm:px-4 lg:flex-row lg:gap-6">
          {" "}
          {/* Mobile Menu Button */}
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
            } lg:block h-screen w-full lg:w-[280px]  bg-white dark:bg-[#0b1821] backdrop-blur-xl`}
          >
            <div className="flex h-full flex-col p-3">
              {/* Fixed Header */}
              <div className="shrink-0">
                <div className="flex items-center ">
                  <div className="flex h-12 w-12 items-center  justify-center text-[#0d5269] dark:text-[#8ce3ff]">
                    <svg
                      className="w-6 h-6 text-[#2eacd6] dark:text-[#8ce3ff]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      {" "}
                      <path d="M5.73486 2L11.4299 7.24715V7.24595V2.01211H12.5385V7.27063L18.2591 2V7.98253H20.6078V16.6118H18.2663V21.9389L12.5385 16.9066V21.9967H11.4299V16.9896L5.74131 22V16.6118H3.39258V7.98253H5.73486V2ZM10.5942 9.0776H4.50118V15.5167H5.73992V13.4856L10.5942 9.0776ZM6.84986 13.9715V19.5565L11.4299 15.5225V9.81146L6.84986 13.9715ZM12.5704 15.4691L17.1577 19.4994V16.6118H17.1518V13.9663L12.5704 9.80608V15.4691ZM18.2663 15.5167H19.4992V9.0776H13.4516L18.2663 13.4399V15.5167ZM17.1505 7.98253V4.51888L13.3911 7.98253H17.1505ZM10.6028 7.98253L6.84346 4.51888V7.98253H10.6028Z"></path>{" "}
                    </svg>
                  </div>

                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#222] dark:text-[#7da3aa] ">
                    Perplexity
                  </p>
                </div>

                <button
                  onClick={chat.handleNewChat}
                  className="mt-4 flex w-full items-center  roundedbg-gray-200 text-gray-900
dark:bg-[#0d2935]/70 bg-[#e9e9e9] dark:text-white text-[#1111] px-2 py-1 text-sm font-semibold hover:bg-[#dddada]  dark:hover:bg-[#0d2935]/90"
                >
                  <span className="flex h-7 w-7 items-center justify-center text-lg text-[#2eacd6] dark:text-[#8ce3ff]">
                    +
                  </span>
                  <span>New Chat</span>
                </button>
              </div>

              {/* Scrollable Part */}
              <div className="mt-4 flex-1 overflow-y-auto sidebar-scroll">
                <h2 className="mb-3 px-3 text-sm font-semibold uppercase  text-[#222]  dark:text-[#bcdee2ef]">
                  Recents
                </h2>

                <div className="flex flex-col gap-1">
                  {Object.values(chats || {}).map((chatItem) => (
                    <div
                      key={chatItem.id}
                      className="group flex items-center justify-between rounded-lg hover:bg-[#dddada] dark:hover:bg-[#0d2935]/80"
                    >
                      <button
                        onClick={() => openChat(chatItem.id)}
                        className="flex-1 px-3 py-2 text-left text-sm dark:text-[#9ab7c0] dark:hover:text-[#9ab7c0] hover:text-[#333]"
                      >
                        <span className="truncate block">
                          {chatItem.title || "New Chat"}
                        </span>
                      </button>

                      <button
                        onClick={() => setChatToDelete(chatItem.id)}
                        className="mr-2 hidden rounded-lg p-1 text-red-400 transition hover:bg-red-500/20 group-hover:block"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7L18.132 19.142A2 2 0 0116.138 21H7.862A2 2 0 015.868 19.142L5 7M10 11V17M14 11V17M4 7H20M15 7V4A1 1 0 0014 3H10A1 1 0 009 4V7"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-auto border-t border-black/20 dark:border-white/10 pt-4">
                {/* <div className="mb-3 rounded-xl  flex items-center justify-between bg-[#0d2935]/50 p-3">
   <div>
     <p className="text-xs text-[#7da3aa]">Signed in as</p>

    <p className="truncate text-xs font-medium text-white">
      {user?.email}
    </p>
   </div>
  <div>
      <button
    onClick={auth.handleLogout}
    className="w-fit rounded text-sm bg-[#4B7D8F] px-2 py-1 text-white transition hover:bg-[#22657e]"
  >
    Logout
  </button>
  </div>
  </div> */}

                <div className="mt-auto rounded-2xl  dark:bg-[#0b1821]/80 p-3 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-[#3333] dark:bg-[#8ce3ff] text-sm font-bold text-[#222] dark:text-[#031b24]">
                        {user?.email?.charAt(0).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-wider text-[#222] dark:text-[#7da3aa]">
                          Signed in as
                        </p>

                        <p className="truncate text-xs font-semibold text-[#222] dark:text-white">
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={auth.handleLogout}
                      className="rounded-xl px-3 py-2 text-xs font-medium dark:text-[#8ce3ff] text-[#222] transition hover:bg-black/9 dark:hover:bg-white/5 dark:hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          {/* Main Content */}
          <section className="  flex flex-1 flex-col max-w-3/5 mx-auto  overflow-hidden  ">
            {!(chats[currentChatId]?.messages?.length > 0) ? (
              /* Empty State */
              <div className="flex h-full items-center justify-center px-6  ">
                <div className="w-full max-w-3xl">
                  <div className="mb-5 text-center">
                    <h1 className="text-2xl font-semibold text-black dark:text-white">
                      What are you looking for?
                    </h1>

                    <p className=" text-xs dark:text-[#7da3aa]">
                      Ask questions, explore ideas, and get accurate answers in
                      seconds.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 rounded-4xl bg-white dark:bg-[#0b1821]/90 px-6 py-2 text-gray-900 dark:text-white">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask anything..."
                      className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-[#7fa9af] focus:outline-none"
                    />

                    <button
                      onClick={handleSubmitMessage}
                      disabled={!chatInput.trim()}
                      className="flex h-8.5 w-8.5 items-center justify-center rounded-2xl bg-[#999] dark:bg-[#8ce3ff] text-[#0f0e0e] dark:text-[#031b24] transition-all duration-300 hover:scale-105 dark:hover:bg-[#7dd8ff]  hover:bg-[#5f6163] hover:text-[white] disabled:opacity-50"
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
                            ? "ml-auto w-fit max-w-[75%] rounded-[28px] bg-[#b1b1b166] dark:bg-[#0d2836]/95 px-5 py-2"
                            : "w-fit max-w-[75%] px-5 py-4"
                        }
                      >
                        {message.role === "user" ? (
                          <p className="text-sm text-[#111] dark:text-[#d6f3ff]">
                            {message.content}
                          </p>
                        ) : (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => (
                                <p className="mb-2 text-sm text-[#111] dark:text-[#d6f3ff]">
                                  {children}
                                </p>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc pl-5 text-sm  text-[#111] dark:text-[#d6f3ff]">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal pl-5 text-sm  text-[#111] dark:text-[#d6f3ff]">
                                  {children}
                                </ol>
                              ),
                              code: ({ children }) => (
                                <code className="rounded bg-[#ffffff66] dark:bg-black/30 px-1 py-0.5">
                                  {children}
                                </code>
                              ),
                              pre: ({ children }) => (
                                <pre className="overflow-x-auto rounded-xl  bg-[#b8b1b166] dark:bg-black/40 p-3">
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
                  <div className="flex items-center gap-3 rounded-3xl bg-[#b1b1b166]  dark:bg-[#0b1821]/90 px-5 py-1.5">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask anything..."
                      className="flex-1 bg-transparent text-sm text-black dark:text-white placeholder:text-[#202525] dark:placeholder:text-[#7fa9af] focus:outline-none"
                    />

                    <button
                      onClick={handleSubmitMessage}
                      disabled={!chatInput.trim()}
                      className="
flex h-8.5 w-8.5 items-center justify-center
rounded-2xl
bg-[#969696] text-white
hover:bg-[#7a7a7a]

dark:bg-[#8ce3ff]
dark:text-[#031b24]
dark:hover:bg-[#7dd8ff]

transition-all duration-300
hover:scale-105
disabled:opacity-50
"
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
      {chatToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#0b1821] p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-white">Delete Chat?</h2>

            <p className="mt-2 text-sm text-[#9ab7c0]">
              This conversation will be permanently deleted and cannot be
              recovered.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setChatToDelete(null)}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  await chat.handleDeleteChat(chatToDelete);
                  setChatToDelete(null);
                }}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
