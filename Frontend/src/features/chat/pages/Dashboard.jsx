import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useChat } from "../hooks/useChat";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useAuth } from "../../auth/hooks/useAuth";
import { toggleTheme } from "../../theme/theme.slice";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatToDelete, setChatToDelete] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fileInputRef = useRef(null);

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

    if (!trimmedMessage && !selectedImage) return;

    chat.handleSendMessage({
      message: trimmedMessage,
      chatId: currentChatId,
      image: selectedImage,
    });

    setChatInput("");
    setSelectedImage(null);
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId, chats);
  };

  console.log("Chats:", chats);
  console.log("Current Chat ID:", currentChatId);

  return (
    <main
      className="
    relative h-screen overflow-hidden
    bg-gradient-to-b
    from-white
    via-[#f8fafc]
    to-[#edf2f7]

    dark:bg-gradient-to-b
    dark:from-[#03060a]
    dark:via-[#071019]
    dark:to-[#0b1722]

    text-gray-900
    dark:text-white

    transition-all
    duration-300
  "
    >
      <div className="flex items-center gap-2">
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="
flex
h-11
w-11
items-center
justify-center
rounded-xl

border
border-gray-200
bg-white
text-gray-700
shadow-[0_2px_10px_rgba(15,23,42,0.08)]

dark:border-[#1d3a49]
dark:bg-[#0b1722]
dark:text-[#8ce3ff]
dark:shadow-[0_8px_24px_rgba(0,0,0,0.45)]

transition-all
duration-300

hover:-translate-y-0.5
hover:shadow-[0_6px_18px_rgba(15,23,42,0.12)]
hover:border-sky-200

dark:hover:bg-[#102230]
dark:hover:border-[#2b5568]
dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.55)]
dark:hover:text-[#a7ecff]

active:scale-95
"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-[#8ce3ff]"
              >
                <path d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-slate-700"
              >
                <path d="M10 7C10 10.866 13.134 14 17 14C18.9584 14 20.729 13.1957 21.9995 11.8995C22 11.933 22 11.9665 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.0335 2 12.067 2 12.1005 2.00049C10.8043 3.27098 10 5.04157 10 7Z" />
              </svg>
            )}
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
            className={`${sidebarOpen ? "block" : "hidden"
              } lg:block h-screen w-full lg:w-[280px] bg-[#fcfcfc] border-r border-gray-200 dark:border-none dark:bg-[#0b1821] backdrop-blur-xl`}
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

                  <p className="text-xl font-semibold tracking-tight  dark:text-[#F3F3F3] text-gray-900">
                    Perplexity
                  </p>
                </div>

                <button
                  onClick={chat.handleNewChat}
                  className="mt-4 flex w-full items-center cursor-pointer  rounded text-gray-900
dark:bg-[#0d2935]/70 bg-[#F3F3F3] shadow-[0_2px_12px_rgba(0,0,0,0.04)]  dark:text-white text-[#1111] px-2 py-1 text-sm font-semibold hover:bg-[#e7e7e7]  dark:hover:bg-[#0d2935]/90"
                >
                  <span className="flex h-7 w-7 items-center justify-center text-lg text-[#2eacd6] dark:text-[#8ce3ff]">
                    +
                  </span>
                  <span>New Chat</span>
                </button>
              </div>

              {/* Scrollable Part */}
              <div className="mt-4 flex-1 overflow-y-auto sidebar-scroll">
                <h2 className="mb-3 px-3 text-xs font-semibold uppercase  text-[#222]  dark:text-[#bcdee2ef]">
                  Recents
                </h2>

                <div className="flex flex-col gap-1">
                  {Object.values(chats || {}).map((chatItem) => (
                    <div
                      key={chatItem.id}
                      className="group flex items-center justify-between rounded-lg hover:bg-[#F3F3F3] dark:hover:bg-[#0d2935]/80"
                    >
                      <button
                        onClick={() => openChat(chatItem.id)}
                        className="flex-1 px-3 py-2 text-left text-sm cursor-pointer dark:text-[#9ab7c0] dark:hover:text-[#9ab7c0] hover:text-[#333]"
                      >
                        <span className="truncate block">
                          {chatItem.title || "New Chat"}
                        </span>
                      </button>

                      <button
                        onClick={() => setChatToDelete(chatItem.id)}
                        className="mr-2   cursor-pointer hidden rounded-lg p-1 text-gray-400 transition hover:bg-gray-500/20 group-hover:block"
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
                <div className="mt-auto rounded-2xl   dark:bg-[#0b1821]/80 p-3 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full bg-[#F3F3F3] dark:bg-[#8ce3ff] text-sm font-bold text-[#222] dark:text-[#031b24]">
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
                      className="rounded-xl cursor-pointer px-3 py-2 text-xs font-medium dark:text-[#8ce3ff] text-[#222] transition hover:bg-black/9 dark:hover:bg-white/5 dark:hover:text-white"
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

                  <div
                    className="
    rounded-[32px]
    border border-gray-200
    bg-white
    shadow-[0_8px_24px_rgba(15,23,42,0.06)]

    dark:border-none
    dark:bg-[#08131d]
    dark:shadow-[0_10px_35px_rgba(0,0,0,0.45)]

    px-2.5
    py-1.5
    transition-all
    duration-300
  "
                  >
                    {selectedImage && (
                      <div className="mb-3 relative w-fit">
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          className="h-20 rounded-xl object-cover"
                        />

                        <button
                          onClick={() => setSelectedImage(null)}
                          className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-black text-white text-xs"
                        >
                          ×
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      {/* Upload Button */}
                      <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="flex h-8 w-8  items-center justify-center rounded-4xl  text-gray-300 transition-all duration-200 cursor-pointer hover:bg-[#0b4f6d] hover:scale-105 active:scale-95"
                      >
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                        </svg>
                      </button>

                      <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files.length) {
                            setSelectedImage(e.target.files[0]);
                          }
                        }}
                      />

                      {/* Text Input */}
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSubmitMessage();
                          }
                        }}
                        placeholder="Ask anything..."
                        className="flex-1 bg-transparent text-sm text-black dark:text-white placeholder:text-[#7fa9af] focus:outline-none"
                      />

                      {/* Send Button */}
                      <button
                        type="button"
                        onClick={handleSubmitMessage}
                        disabled={!chatInput.trim() && !selectedImage}
                        className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-[#8ce3ff]
text-[#05222c]
transition-all
duration-300
hover:scale-105
hover:bg-[#74dcff]
active:scale-95
disabled:opacity-40
cursor-pointer
disabled:shadow-none
"
                      >
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                        </svg>
                      </button>
                    </div>
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
                            ? "ml-auto max-w-[75%] rounded-3xl bg-[#F3F3F3]  dark:bg-[#0d2836]/95 px-3 py-2"
                            : "max-w-[75%] rounded-3xl p-4"
                        }
                      >
                        {/* Display uploaded image */}
                        {message.image && (
                          <img
                            src={message.image}
                            alt="Uploaded"
                            className="mb-3 max-h-72 w-auto rounded-2xl object-cover"
                          />
                        )}

                        {/* User message */}
                        {message.role === "user" ? (
                          message.content && (
                            <p className="text-sm   dark:text-[#d6f3ff]">
                              {message.content}
                            </p>
                          )
                        ) : (
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({ children }) => (
                                <p className="mb-2 text-sm  dark:text-[#d6f3ff]">
                                  {children}
                                </p>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc pl-5 text-sm dark:text-[#d6f3ff]">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal pl-5 text-sm dark:text-[#d6f3ff]">
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

               <div
  className="
    mb-4
    rounded-[30px]

   border
border-gray-200

dark:border-[#1f3f52]

  dark:[bg-gradient-to-b
    from-[#0f1d28]
    via-[#0d1822]
    to-[#0b141c]
]
    dark:bg-[#0d1822]

bg-[#fcfcfc]
    backdrop-blur-xl

    px-2.5
    py-1.5


    transition-all
    duration-300

    

    focus-within:border-[#4fa8c8]
    focus-within:shadow-[0_0_18px_rgba(140,227,255,.15)]
  "
>
                  <div className="flex items-center gap-1 ">
                    {/* Upload Button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="flex h-8 w-8 items-center justify-center rounded-4xl  text-gray-200 transition-all duration-200 cursor-pointer hover:bg-[#F3F3F3] hover:scale-105 active:scale-95"
                    >
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                      </svg>
                    </button>

                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files.length) {
                          setSelectedImage(e.target.files[0]);
                        }
                      }}
                    />

                    {/* Text Input */}
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSubmitMessage();
                        }
                      }}
                      placeholder="Ask anything..."
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-[#7fa9af] focus:outline-none"
                    />

                    {/* Send Button */}
                    <button
                      type="button"
                      onClick={handleSubmitMessage}
                      disabled={!chatInput.trim() && !selectedImage}
                      className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-[#8ce3ff]
text-[#05222c]
transition-all
duration-300
hover:scale-105
hover:bg-[#74dcff]
active:scale-95
disabled:opacity-40
cursor-pointer
disabled:shadow-none
"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
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
                className="rounded-xl  px-4 py-2 text-sm font-medium text-white hover:text-[#8ce3ff]"
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
