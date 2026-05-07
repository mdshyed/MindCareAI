import { Card } from '@/components/ui/card'
import { Phone, AlertCircle, BookOpen, ExternalLink, Wind } from 'lucide-react'

const hotlines = [
    {
        name: 'iCall — Psychological Support',
        number: '9152987821',
        note: 'Mon – Sat, 8am – 10pm',
        color: 'from-red-500 to-rose-600',
    },
    {
        name: 'Jeevan Aastha — Suicide & Emotional Distress',
        number: '1800-233-3330',
        note: '24 / 7 Free Helpline',
        color: 'from-orange-500 to-amber-500',
    },
    {
        name: 'Tele-MANAS — National Mental Health',
        number: '14416',
        note: '24 / 7 National Helpline',
        color: 'from-purple-500 to-violet-600',
    },
]

const techniques = [
    {
        icon: AlertCircle,
        title: '5-4-3-2-1 Grounding',
        description: 'Bring yourself back to the present moment using your five senses.',
        steps: [
            'Name 5 things you can see',
            'Touch 4 things around you',
            'Listen for 3 sounds',
            'Notice 2 things you can smell',
            'Identify 1 thing you can taste',
        ],
        color: 'from-blue-500 to-cyan-500',
    },
    {
        icon: Wind,
        title: 'Box Breathing',
        description: 'Calm your nervous system with this simple 4-count technique.',
        steps: [
            'Breathe in slowly for 4 counts',
            'Hold your breath for 4 counts',
            'Exhale fully for 4 counts',
            'Hold empty for 4 counts',
            'Repeat 4 – 5 times',
        ],
        color: 'from-emerald-500 to-teal-500',
    },
]

export default function EmergencyComponent() {
    return (
        <div className="space-y-10">

            {/* Immediate danger banner */}
            <Card className="p-8 bg-gradient-to-r from-red-50 to-rose-50 border-red-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-100 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <div className="p-4 rounded-2xl bg-red-100 text-red-600 flex-shrink-0">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-red-700 mb-1">If you are in immediate danger</h2>
                        <p className="text-red-600/80">
                            Please call emergency services or go to your nearest emergency room right away.
                        </p>
                    </div>
                    <a
                        href="tel:112"
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-red-200 transition-colors w-full md:w-auto justify-center text-sm"
                    >
                        <Phone className="w-5 h-5" />
                        Call 112 — Emergency
                    </a>
                </div>
            </Card>

            {/* Hotlines */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-primary/10">
                        <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Crisis Helplines</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {hotlines.map((h, i) => (
                        <Card key={i} className="p-6 border-border bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden relative">
                            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${h.color}`} />
                            <h3 className="font-semibold text-foreground mb-3 text-sm leading-snug">{h.name}</h3>
                            <a
                                href={`tel:${h.number.replace(/[^0-9]/g, '')}`}
                                className="flex items-center gap-2 text-xl font-bold gradient-text hover:opacity-80 transition-opacity mb-2"
                            >
                                <Phone className="w-5 h-5 text-primary" />
                                {h.number}
                            </a>
                            <p className="text-xs text-muted-foreground">{h.note}</p>
                        </Card>
                    ))}
                </div>

                <div className="mt-4">
                    <a
                        href="https://findahelpline.com/countries/in"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                    >
                        Find more helplines in India <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>

            {/* Coping techniques */}
            <div>
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-xl bg-primary/10">
                        <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Quick Coping Techniques</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {techniques.map((t, i) => {
                        const Icon = t.icon
                        return (
                            <Card key={i} className="p-6 border-border bg-white hover:shadow-lg transition-all duration-300 overflow-hidden relative">
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${t.color}`} />
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{t.title}</h3>
                                        <p className="text-xs text-muted-foreground">{t.description}</p>
                                    </div>
                                </div>
                                <ol className="space-y-2.5 mt-4">
                                    {t.steps.map((step, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm text-foreground">
                                            <span className={`w-6 h-6 rounded-full bg-gradient-to-br ${t.color} text-white font-bold text-xs flex items-center justify-center flex-shrink-0`}>
                                                {idx + 1}
                                            </span>
                                            {step}
                                        </li>
                                    ))}
                                </ol>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
