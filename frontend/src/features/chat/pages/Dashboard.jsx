import React, { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import { 
  Plus, 
  Clock, 
  Bookmark, 
  FolderOpen, 
  Settings, 
  Share2, 
  MoreHorizontal, 
  Zap, 
  Paperclip, 
  ArrowUp,
  Globe,
  LayoutGrid
} from 'lucide-react'

const Dashboard = () => {
    const chat = useChat()
    const [chatInput, setChatInput] = useState('')
    const { chats, currentChatId, isLoading } = useSelector(state => state.chat)
    const scrollRef = useRef(null)

    useEffect(() => {
        chat.initializeSocketConnection()
        chat.handleGetChats()
    }, [])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [chats, currentChatId, isLoading])

    const handleSubmitMessage = (event) => {
        event.preventDefault()
        const trimmed = chatInput.trim()
        if (!trimmed) return
        chat.handleSendMessage({ message: trimmed, chatId: currentChatId })
        setChatInput('')
    }

    const currentChat = chats[currentChatId]

    return (
        <div className="flex h-screen bg-[#0c0c0e] text-[#f0f0f0] font-sans selection:bg-[#19c9c8]/30 overflow-hidden">
            
            {/* ──────── SIDEBAR ──────── */}
            <aside className="w-[230px] shrink-0 bg-[#0f0f11] border-r border-white/5 flex flex-col p-4">
                {/* Logo */}
                <div className="flex items-center gap-3 px-2 mb-6 cursor-pointer group">
                    <div className="w-8 h-8 rounded-lg bg-[#19c9c8] flex items-center justify-center shadow-lg shadow-[#19c9c8]/20 transition-transform group-hover:scale-105">
                        <Zap size={18} className="text-black fill-black" />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white font-outfit">Perplexity AI</span>
                </div>

                {/* New Search Button */}
                <button 
                    onClick={() => chat.handleOpenChat(null)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#19c9c8] text-black font-bold text-sm mb-8 hover:brightness-110 active:scale-[0.98] transition-all shadow-xl shadow-[#19c9c8]/10"
                >
                    <Plus size={18} strokeWidth={3} />
                    New Search
                </button>

                {/* Recent Section */}
                <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
                    <div>
                        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/40 mb-3 px-2">Recent Searches</p>
                        <div className="space-y-1">
                            {Object.values(chats).reverse().map((c) => (
                                <button
                                    key={c.id || c._id}
                                    onClick={() => chat.handleOpenChat(c.id || c._id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
                                        (c.id || c._id) === currentChatId 
                                        ? 'bg-white/10 text-white font-medium' 
                                        : 'text-white/50 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    <Clock size={15} className={`${(c.id || c._id) === currentChatId ? 'text-[#19c9c8]' : 'text-white/20 group-hover:text-white/40'}`} />
                                    <span className="text-[13px] truncate leading-tight">{c.title || 'Untitled'}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/40 mb-3 px-2">Library</p>
                        <div className="space-y-1">
                            <LibraryItem icon={<Bookmark size={15} />} label="Saved Articles" />
                            <LibraryItem icon={<FolderOpen size={15} />} label="Projects" />
                        </div>
                    </div>
                </div>

                {/* User Profile */}
                <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 cursor-pointer transition-colors">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-xs text-white">AR</div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-xs font-semibold truncate">Alex Rivera</p>
                            <p className="text-[10px] text-[#19c9c8] font-bold">Pro Member</p>
                        </div>
                        <Settings size={15} className="text-white/30 hover:text-white transition-colors" />
                    </div>
                </div>
            </aside>

            {/* ──────── MAIN CONTENT ──────── */}
            <main className="flex-1 flex flex-col relative min-w-0">
                
                {/* Header (Breadcrumb) */}
                <header className="flex items-center justify-between h-14 px-8 border-b border-white/5">
                    <div className="flex items-center gap-2 text-[13px] text-white/50">
                        <span>Searches</span>
                        <span className="text-white/20">/</span>
                        <span className="text-white truncate max-w-[300px]">{currentChat?.title || 'New Thread'}</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/40">
                        <Share2 size={18} className="hover:text-white transition-colors cursor-pointer" />
                        <MoreHorizontal size={18} className="hover:text-white transition-colors cursor-pointer" />
                    </div>
                </header>

                {/* Messages Container */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
                    {!currentChatId ? (
                        /* Initial View */
                        <div className="h-full flex flex-col items-center justify-center space-y-8 pb-20 px-8">
                            <h2 className="text-5xl font-bold tracking-tight text-center font-outfit leading-tight bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent">
                                What do you <br/> want to know?
                            </h2>
                            <div className="w-full max-w-2xl">
                                <SearchInput value={chatInput} onChange={setChatInput} onSubmit={handleSubmitMessage} />
                                <div className="mt-8 flex flex-wrap justify-center gap-3">
                                    <QuickAction label="Summarize Article" onClick={() => {
                                        setChatInput("Summarize Article: ")
                                    }} />
                                    <QuickAction label="What is Pro?" onClick={() => {
                                        chat.handleSendMessage({ message: "What is Perplexity Pro?", chatId: null })
                                    }} />
                                    <QuickAction label="Next.js Guide" onClick={() => {
                                        chat.handleSendMessage({ message: "Comprehensive guide to Next.js 15 Server Actions", chatId: null })
                                    }} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Chat Active View */
                        <div className="max-w-3xl mx-auto px-8 py-10 space-y-12 pb-40">
                            
                            {/* Heading (styled like screenshot) */}
                            <h1 className="text-4xl font-extrabold tracking-tight leading-tight font-outfit">
                                {currentChat?.messages?.[0]?.content?.split(' ').map((word, i, arr) => (
                                    <span key={i} className={i > 1 && i < 4 ? 'text-[#19c9c8]' : 'text-white'}>
                                        {word}{i !== arr.length - 1 ? ' ' : ''}
                                    </span>
                                )) || 'Untitled Search'}
                            </h1>

                            {/* Conversation */}
                            <div className="space-y-10">
                                {currentChat?.messages?.map((msg, idx) => (
                                    <div key={idx} className="space-y-6">
                                        {msg.role === 'user' ? (
                                            /* We only show user messages if it's NOT the first message as a heading */
                                            idx > 0 && (
                                                <div className="flex justify-end">
                                                    <div className="bg-white/10 border border-white/10 px-5 py-3 rounded-2xl text-[15px] font-medium max-w-[85%]">
                                                        {msg.content}
                                                    </div>
                                                </div>
                                            )
                                        ) : (
                                            /* AI RESPONSE */
                                            <div className="space-y-6">
                                                {/* Sources Grid (Mock Sources for UI) */}
                                                {idx === 1 && (
                                                  <div className="space-y-4">
                                                      <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                                                          <LayoutGrid size={12} strokeWidth={3} /> Sources
                                                      </div>
                                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                          <SourceCard icon="橙" site="UX Collective" desc="The evolution of Glassmorphism in 2024 UI Trends." id="1" />
                                                          <SourceCard icon="🟩" site="CSS-Tricks" desc="Mastering backdrop-filter and transparency." id="2" />
                                                          <SourceCard icon="⬛" site="NN/g" desc="Accessibility concerns with translucent UI." id="3" />
                                                      </div>
                                                  </div>
                                                )}

                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 text-[#19c9c8] text-[10px] font-bold tracking-widest uppercase">
                                                        <Zap size={13} className="fill-[#19c9c8]" /> AI Response
                                                    </div>
                                                    <div className="text-[15px] leading-relaxed text-white/90">
                                                        <ReactMarkdown
                                                            components={{
                                                                p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                                                                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                                                                ul: ({ children }) => <ul className="mb-4 list-disc pl-5 space-y-2">{children}</ul>,
                                                                li: ({ children }) => <li>{children}</li>,
                                                                code: ({ children }) => (
                                                                  <code className="text-[#19c9c8] bg-[#19c9c8]/10 px-1.5 py-0.5 rounded font-mono text-sm border border-[#19c9c8]/20">
                                                                    {children}
                                                                  </code>
                                                                ),
                                                                pre: ({ children }) => (
                                                                  <pre className="p-4 rounded-2xl bg-black/40 border border-white/10 overflow-x-auto mb-4 scrollbar-thin scrollbar-thumb-white/10">
                                                                    {children}
                                                                  </pre>
                                                                ),
                                                            }}
                                                        >
                                                            {msg.content}
                                                        </ReactMarkdown>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex items-center gap-3 text-white/40 animate-pulse bg-white/5 border border-white/5 p-6 rounded-3xl">
                                        <Zap size={18} className="animate-spin text-[#19c9c8]" />
                                        <span className="text-sm font-medium">Generating answer...</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Fixed Bottom Input Bar */}
                {currentChatId && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-[#0c0c0e] via-[#0c0c0e]/90 to-transparent">
                      <div className="max-w-3xl mx-auto">
                          <SearchInput 
                              value={chatInput} 
                              onChange={setChatInput} 
                              onSubmit={handleSubmitMessage} 
                              placeholder="Ask a follow-up question..." 
                              compact 
                          />
                          <p className="text-center text-[10px] text-white/20 mt-3 font-medium uppercase tracking-tighter">Perplexity AI can make mistakes. Verify your facts.</p>
                      </div>
                  </div>
                )}
            </main>
        </div>
    )
}

/* ──────── HELPERS ──────── */

const SearchInput = ({ value, onChange, onSubmit, placeholder = "Ask anything...", compact = false }) => (
    <div className={`glass relative rounded-3xl border border-white/10 shadow-2xl transition-all focus-within:border-white/20 focus-within:bg-white/6 ${compact ? 'py-2 px-3' : 'p-2 pr-3'}`}>
        <form onSubmit={onSubmit} className="flex items-center gap-3">
            <div className="pl-4 flex items-center text-white/40">
                <Paperclip size={18} className="hover:text-white transition-colors cursor-pointer" />
            </div>
            <input 
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent border-none outline-none text-base text-white placeholder-white/30 h-12 py-2"
            />
            <div className="flex items-center gap-2">
                <div className="pro-badge hidden md:block">⚡ &nbsp;Pro</div>
                <button 
                    disabled={!value.trim()}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${value.trim() ? 'bg-[#19c9c8] text-black shadow-lg shadow-[#19c9c8]/30 scale-100' : 'bg-white/5 text-white/20 scale-90'}`}
                >
                    <ArrowUp size={22} strokeWidth={3} />
                </button>
            </div>
        </form>
    </div>
)

const SourceCard = ({ icon, site, desc, id }) => (
    <div className="bg-white/4 border border-white/10 rounded-2xl p-4 hover:bg-white/7 transition-all cursor-pointer group">
        <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-[10px]">{icon}</div>
            <span className="text-xs font-bold truncate text-white/90">{site}</span>
        </div>
        <p className="text-[11px] leading-relaxed text-white/50 line-clamp-2 mb-3">{desc}</p>
        <span className="text-[10px] font-bold text-white/20">{id}</span>
    </div>
)

const LibraryItem = ({ icon, label }) => (
    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/50 hover:bg-white/5 hover:text-white transition-all">
        <span className="text-white/20">{icon}</span>
        <span className="text-[13px] font-medium">{label}</span>
    </button>
)

const QuickAction = ({ label, onClick }) => (
    <button onClick={onClick} className="px-4 py-2 rounded-full border border-white/10 text-xs text-white/40 hover:bg-white/5 hover:border-white/20 hover:text-white transition-all font-medium">
        {label}
    </button>
)

export default Dashboard