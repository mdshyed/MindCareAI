import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, RefreshCw, ArrowRight, Heart, Lightbulb, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const questions = [
    { text: 'How often do you feel overwhelmed by stress?', reverse: true },
    { text: 'How would you rate your sleep quality lately?', reverse: false },
    { text: 'Do you feel connected to your support network (friends, family)?', reverse: false },
    { text: 'How often do you experience anxiety or worry?', reverse: true },
    { text: 'Rate your overall satisfaction with life right now.', reverse: false },
    { text: 'How well are you managing your emotions day-to-day?', reverse: false },
    { text: 'Do you have healthy ways to cope when things get hard?', reverse: false },
    { text: 'How often do you take time to care for yourself?', reverse: false },
]

const scoreLabels = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']

const getResult = (avg) => {
    if (avg >= 4) return {
        level: 'Excellent',
        description: 'Your mental wellness is in great shape! Keep up your healthy habits and routines.',
        color: 'text-emerald-600',
        bg: 'from-emerald-50 to-teal-50',
        border: 'border-emerald-200',
        icon: Heart,
        suggestions: ['Keep journaling', 'Maintain your sleep routine', 'Share your resilience with the community'],
    }
    if (avg >= 3) return {
        level: 'Good',
        description: 'You\'re doing well overall. A few small adjustments could bring you to your best.',
        color: 'text-blue-600',
        bg: 'from-blue-50 to-indigo-50',
        border: 'border-blue-200',
        icon: Lightbulb,
        suggestions: ['Try the breathing exercises', 'Browse the resources library', 'Consider a counseling check-in'],
    }
    if (avg >= 2) return {
        level: 'Fair',
        description: 'You\'re managing, but there are areas worth paying attention to. You don\'t have to do it alone.',
        color: 'text-amber-600',
        bg: 'from-amber-50 to-orange-50',
        border: 'border-amber-200',
        icon: AlertCircle,
        suggestions: ['Talk to our AI chatbot', 'Try the 5-4-3-2-1 grounding technique', 'Book a counseling session'],
    }
    return {
        level: 'Needs Attention',
        description: 'It sounds like you\'re going through a tough time. Please reach out — support is here for you.',
        color: 'text-red-600',
        bg: 'from-red-50 to-rose-50',
        border: 'border-red-200',
        icon: AlertCircle,
        suggestions: ['Chat with our AI right now', 'Visit the Emergency page for hotlines', 'Book a session with a counselor today'],
    }
}

export default function AssessmentComponent() {
    const [current, setCurrent] = useState(0)
    const [scores, setScores] = useState([])
    const [done, setDone] = useState(false)

    const handleAnswer = (rawScore) => {
        const q = questions[current]
        const score = q.reverse ? (6 - rawScore) : rawScore
        const newScores = [...scores, score]
        setScores(newScores)

        if (current < questions.length - 1) {
            setCurrent(current + 1)
        } else {
            setDone(true)
        }
    }

    const reset = () => {
        setCurrent(0)
        setScores([])
        setDone(false)
    }

    const progress = ((current + (done ? 1 : 0)) / questions.length) * 100

    if (done) {
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length
        const result = getResult(avg)
        const Icon = result.icon

        return (
            <div className="space-y-6">
                <Card className={`p-8 text-center bg-gradient-to-br ${result.bg} border ${result.border} shadow-xl`}>
                    <div className={`w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center mb-6 shadow-md animate-float`}>
                        <Icon className={`w-10 h-10 ${result.color}`} />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-1">Assessment Complete</h2>
                    <p className="text-muted-foreground mb-6">Here's your wellness snapshot</p>

                    <div className="bg-white/70 backdrop-blur rounded-2xl px-8 py-6 mb-6 border border-white/50 shadow-sm">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-2">Overall Wellness</p>
                        <p className={`text-5xl font-bold mb-3 ${result.color}`}>{result.level}</p>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">{result.description}</p>
                    </div>

                    <div className="text-left mb-6">
                        <p className="text-sm font-semibold text-foreground mb-3">We suggest:</p>
                        <ul className="space-y-2">
                            {result.suggestions.map((s, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${result.color}`} />
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button onClick={reset} variant="outline" className="gap-2">
                            <RefreshCw className="w-4 h-4" /> Retake Assessment
                        </Button>
                        <Button asChild className="gap-2 bg-gradient-primary text-white">
                            <Link to="/chatbot">Talk to AI <ArrowRight className="w-4 h-4" /></Link>
                        </Button>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <Card className="p-8 bg-white border-border shadow-xl rounded-2xl">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-muted-foreground">
                        Question {current + 1} <span className="text-muted-foreground/60">of {questions.length}</span>
                    </span>
                    <span className="text-sm font-bold gradient-text">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2.5 rounded-full" />
            </div>

            {/* Question */}
            <div className="min-h-[80px] mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                    {questions[current].text}
                </h3>
            </div>

            {/* Score buttons */}
            <div className="grid grid-cols-5 gap-3 mb-4">
                {[1, 2, 3, 4, 5].map((score) => (
                    <button
                        key={score}
                        onClick={() => handleAnswer(score)}
                        className="group flex flex-col items-center gap-2 p-3 rounded-xl border-2 border-border bg-white hover:border-primary hover:bg-gradient-to-b hover:from-primary/5 hover:to-secondary/5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                    >
                        <span className="text-2xl font-bold text-foreground group-hover:gradient-text transition-colors">{score}</span>
                        <span className="text-[10px] text-muted-foreground text-center leading-tight group-hover:text-primary transition-colors">
                            {scoreLabels[score - 1]}
                        </span>
                    </button>
                ))}
            </div>

            <div className="flex justify-between px-1">
                <span className="text-xs text-muted-foreground">Not at all / Never</span>
                <span className="text-xs text-muted-foreground">Completely / Always</span>
            </div>
        </Card>
    )
}
