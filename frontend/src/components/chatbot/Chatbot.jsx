import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader, Bot, User, AlertCircle } from 'lucide-react'
import api from '@/lib/api'

const suggestions = [
    "I'm feeling anxious today",
    'How do I manage stress?',
    "I'm having trouble sleeping",
    'Tell me about mindfulness',
]

export default function ChatbotComponent() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm here to listen and support you. How are you feeling today? 💙" },
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isLoading])

    const sendMessage = async (text) => {
        const msg = text.trim()
        if (!msg || isLoading) return

        setMessages(prev => [...prev, { role: 'user', content: msg }])
        setInput('')
        setIsLoading(true)
        setError(null)

        try {
            const history = messages
                .filter(m => m.role !== 'system')
                .map(m => ({ role: m.role, content: m.content }))

            const { data } = await api.post('/chatbot/message', {
                message: msg,
                conversationHistory: history,
            })

            if (data.success) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
            } else {
                throw new Error(data.message)
            }
        } catch (err) {
            const errMsg = err.response?.data?.message || err.message || 'Failed to get a response.'
            setError(errMsg)
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm having trouble connecting right now. Please try again in a moment. 🙏",
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            sendMessage(input)
        }
    }

    return (
        <div className="space-y-4">
            {error && (
                <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Chat window */}
            <div className="h-[520px] flex flex-col rounded-2xl border border-border bg-gradient-to-b from-white to-muted/20 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-white">
                    <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center shadow-sm">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-foreground">MindCareAI Assistant</p>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <p className="text-xs text-muted-foreground">Online — here to support you</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            {msg.role === 'assistant' ? (
                                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center flex-shrink-0 mt-1">
                                    <User className="w-4 h-4 text-slate-600" />
                                </div>
                            )}
                            <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                msg.role === 'user'
                                    ? 'bg-gradient-primary text-white rounded-tr-sm'
                                    : 'bg-white text-foreground border border-border rounded-tl-sm'
                            }`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                                <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-white border border-border px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Quick suggestions */}
            <div className="grid grid-cols-2 gap-2">
                {suggestions.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => sendMessage(s)}
                        disabled={isLoading}
                        className="text-left text-sm px-4 py-2.5 rounded-xl border border-border bg-white hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200 disabled:opacity-50"
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Input */}
            <div className="flex gap-3">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message... (Enter to send)"
                    disabled={isLoading}
                    className="h-12 rounded-xl border-border bg-white focus-visible:ring-primary/40 text-sm"
                />
                <Button
                    onClick={() => sendMessage(input)}
                    disabled={isLoading || !input.trim()}
                    className="h-12 w-12 rounded-xl bg-gradient-primary hover:opacity-90 flex-shrink-0 shadow-md shadow-primary/20"
                >
                    {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </Button>
            </div>
        </div>
    )
}
