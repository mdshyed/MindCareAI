import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Play, BookOpen, Sparkles, Clock, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

const resources = {
    meditation: [
        { title: 'Guided Breathing', duration: '5 min', description: 'Calm your mind with slow, deep breathing patterns.', gradient: 'from-blue-500 to-cyan-500' },
        { title: 'Body Scan Meditation', duration: '10 min', description: 'Release built-up tension throughout your body.', gradient: 'from-purple-500 to-violet-600' },
        { title: 'Loving Kindness', duration: '8 min', description: 'Cultivate compassion, self-love, and inner warmth.', gradient: 'from-pink-500 to-rose-500' },
        { title: 'Sleep Meditation', duration: '15 min', description: 'Wind down and prepare your mind for restful sleep.', gradient: 'from-indigo-500 to-blue-600' },
    ],
    exercises: [
        { title: '5-4-3-2-1 Grounding', description: 'Anchor yourself in the present using your five senses.', gradient: 'from-emerald-500 to-teal-500' },
        { title: 'Box Breathing', description: 'Regulate your nervous system with a 4-count breathing cycle.', gradient: 'from-cyan-500 to-blue-500' },
        { title: 'Progressive Muscle Relaxation', description: 'Systematically tense and release muscles to reduce tension.', gradient: 'from-violet-500 to-purple-600' },
        { title: 'Journaling Prompts', description: 'Structured prompts to help you process thoughts and emotions.', gradient: 'from-orange-500 to-amber-500' },
    ],
    strategies: [
        { title: 'Stress Management', description: 'Practical techniques for handling daily academic and personal stress.', gradient: 'from-red-500 to-rose-500' },
        { title: 'Sleep Hygiene', description: 'Evidence-based tips to dramatically improve your sleep quality.', gradient: 'from-indigo-500 to-violet-500' },
        { title: 'Social Connection', description: 'How to build and maintain meaningful relationships in college.', gradient: 'from-green-500 to-emerald-500' },
        { title: 'Self-Compassion', description: 'Learn to treat yourself with the kindness you deserve.', gradient: 'from-pink-500 to-fuchsia-500' },
    ],
}

export default function ResourcesComponent() {
    const [searchTerm, setSearchTerm] = useState('')

    const filter = (list) =>
        list.filter(r =>
            r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.description.toLowerCase().includes(searchTerm.toLowerCase())
        )

    return (
        <div className="space-y-8">
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-11 h-12 rounded-xl border-border bg-white focus-visible:ring-primary/40 text-sm"
                />
            </div>

            <Tabs defaultValue="meditation" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-12 bg-muted/50 p-1 rounded-xl">
                    <TabsTrigger value="meditation" className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-white text-sm">
                        Meditation
                    </TabsTrigger>
                    <TabsTrigger value="exercises" className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-white text-sm">
                        Exercises
                    </TabsTrigger>
                    <TabsTrigger value="strategies" className="rounded-lg data-[state=active]:bg-gradient-primary data-[state=active]:text-white text-sm">
                        Strategies
                    </TabsTrigger>
                </TabsList>

                {/* Meditation */}
                <TabsContent value="meditation" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filter(resources.meditation).map((item, i) => (
                            <Card key={i} className="p-5 bg-white border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
                                        <div className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full w-fit">
                                            <Clock className="w-3 h-3" />
                                            {item.duration}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toast.success(`Starting "${item.title}"...`)}
                                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-md hover:scale-110 transition-transform`}
                                    >
                                        <Play className="w-5 h-5 text-white ml-0.5" />
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Exercises */}
                <TabsContent value="exercises" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filter(resources.exercises).map((item, i) => (
                            <Card key={i} className="p-5 bg-white border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                                <button
                                    onClick={() => toast.success(`Opening "${item.title}"...`)}
                                    className="flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                                >
                                    Start exercise <ArrowRight className="w-4 h-4" />
                                </button>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* Strategies */}
                <TabsContent value="strategies" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filter(resources.strategies).map((item, i) => (
                            <Card key={i} className="p-5 bg-white border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient}`} />
                                <div className="flex items-start gap-4">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
                                        <button
                                            onClick={() => toast.success(`Opening "${item.title}"...`)}
                                            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                                        >
                                            Read more <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
