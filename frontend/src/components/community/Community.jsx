import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Heart, MessageCircle, Smile } from 'lucide-react'
import toast from 'react-hot-toast'

const initialPosts = [
    {
        id: 1,
        initial: 'A',
        gradient: 'from-purple-400 to-violet-500',
        author: 'Anonymous',
        content: 'Just finished my first meditation session! Feeling so much calmer. If you\'re on the fence about trying it — just start with 5 minutes. 🌿',
        likes: 24,
        comments: 3,
        time: '2h ago',
    },
    {
        id: 2,
        initial: 'P',
        gradient: 'from-pink-400 to-rose-500',
        author: 'Peer Support',
        content: 'Struggled a lot today but reminded myself that I am stronger than my anxiety. To anyone reading this — you are not alone, and it does get better. Sending love 💙',
        likes: 42,
        comments: 7,
        time: '5h ago',
    },
    {
        id: 3,
        initial: 'M',
        gradient: 'from-blue-400 to-cyan-500',
        author: 'Mindful Moment',
        content: 'Tip that helped me this week: put your phone away 30 minutes before bed. My sleep has improved so much. Small changes really do add up! 🌙',
        likes: 31,
        comments: 5,
        time: '1d ago',
    },
]

const gradients = [
    'from-purple-400 to-violet-500',
    'from-pink-400 to-rose-500',
    'from-emerald-400 to-teal-500',
    'from-orange-400 to-amber-500',
    'from-blue-400 to-cyan-500',
]

export default function CommunityComponent() {
    const [posts, setPosts] = useState(initialPosts)
    const [newPost, setNewPost] = useState('')
    const [likedPosts, setLikedPosts] = useState(new Set())

    const handlePost = () => {
        if (!newPost.trim()) return
        const post = {
            id: Date.now(),
            initial: 'Y',
            gradient: gradients[Math.floor(Math.random() * gradients.length)],
            author: 'You',
            content: newPost.trim(),
            likes: 0,
            comments: 0,
            time: 'Just now',
        }
        setPosts([post, ...posts])
        setNewPost('')
        toast.success('Your post was shared with the community!')
    }

    const toggleLike = (id) => {
        const next = new Set(likedPosts)
        if (next.has(id)) {
            next.delete(id)
        } else {
            next.add(id)
        }
        setLikedPosts(next)
    }

    return (
        <div className="space-y-6">

            {/* New post box */}
            <Card className="p-6 bg-white border-border shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        Y
                    </div>
                    <p className="text-sm text-muted-foreground">Share something with the community...</p>
                </div>
                <Textarea
                    placeholder="Your thoughts, a win, a struggle — all welcome here. Posts are anonymous by default."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="mb-4 border-border bg-muted/30 min-h-[100px] resize-none focus-visible:ring-primary/40 rounded-xl text-sm"
                />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Smile className="w-4 h-4 text-primary" />
                        <span>Your post is anonymous</span>
                    </div>
                    <Button
                        onClick={handlePost}
                        disabled={!newPost.trim()}
                        className="bg-gradient-primary hover:opacity-90 text-white px-6 rounded-xl"
                    >
                        Share
                    </Button>
                </div>
            </Card>

            {/* Posts */}
            <div className="space-y-4">
                {posts.map((post) => (
                    <Card key={post.id} className="p-6 border-border bg-white hover:shadow-md transition-all duration-300">
                        <div className="flex items-start gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                {post.initial}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="font-semibold text-foreground text-sm">{post.author}</p>
                                    <span className="text-xs text-muted-foreground">·</span>
                                    <p className="text-xs text-muted-foreground">{post.time}</p>
                                </div>
                            </div>
                        </div>

                        <p className="text-foreground text-sm leading-relaxed mb-5">{post.content}</p>

                        <div className="flex items-center gap-6 pt-4 border-t border-border">
                            <button
                                onClick={() => toggleLike(post.id)}
                                className={`flex items-center gap-2 text-sm transition-all duration-200 ${
                                    likedPosts.has(post.id)
                                        ? 'text-pink-500 scale-105'
                                        : 'text-muted-foreground hover:text-pink-500'
                                }`}
                            >
                                <Heart className={`w-4 h-4 transition-all ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                            </button>
                            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                <span>{post.comments}</span>
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
