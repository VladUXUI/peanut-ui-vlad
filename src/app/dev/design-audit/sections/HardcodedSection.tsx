'use client'

import React from 'react'
import { HARDCODED_INSTANCES, AUDIT_SUMMARY, type HardcodedInstance } from '../data/tokenAudit'

const CATEGORY_LABELS = {
    color: 'Color',
    font: 'Font',
    spacing: 'Spacing',
    radius: 'Radius',
} as const

const CATEGORY_COLORS = {
    color: '#FF90E8',
    font: '#90A8ED',
    spacing: '#FFC900',
    radius: '#98E9AB',
} as const

function SummaryRow() {
    const entries = [
        { label: 'Colors', key: 'colors' as const, color: CATEGORY_COLORS.color },
        { label: 'Fonts', key: 'fonts' as const, color: CATEGORY_COLORS.font },
        { label: 'Spacing', key: 'spacing' as const, color: CATEGORY_COLORS.spacing },
        { label: 'Radius', key: 'radius' as const, color: CATEGORY_COLORS.radius },
    ]

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 12,
                marginBottom: 32,
            }}
        >
            {entries.map(({ label, key, color }) => {
                const { tokenUsages, hardcodedInstances } = AUDIT_SUMMARY[key]
                const total = tokenUsages + hardcodedInstances
                const tokenPct = Math.round((tokenUsages / total) * 100)
                const hardcodedPct = 100 - tokenPct

                return (
                    <div
                        key={key}
                        style={{
                            border: '2px solid #000',
                            background: '#fff',
                            padding: 16,
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <span style={{ fontWeight: 800, fontSize: 13 }}>{label}</span>
                            <div style={{ display: 'flex', gap: 6 }}>
                                <span
                                    style={{
                                        background: color,
                                        border: '1px solid #000',
                                        padding: '1px 7px',
                                        fontSize: 10,
                                        fontWeight: 700,
                                    }}
                                >
                                    {tokenUsages} tokens
                                </span>
                                <span
                                    style={{
                                        background: hardcodedInstances > 0 ? '#FF4A4A' : '#98E9AB',
                                        border: '1px solid #000',
                                        padding: '1px 7px',
                                        fontSize: 10,
                                        fontWeight: 700,
                                        color: hardcodedInstances > 0 ? '#fff' : '#000',
                                    }}
                                >
                                    {hardcodedInstances} hardcoded
                                </span>
                            </div>
                        </div>
                        <div style={{ height: 8, background: '#E7E8E9', border: '1px solid #000', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', height: '100%' }}>
                                <div style={{ width: `${tokenPct}%`, background: color }} />
                                <div style={{ width: `${hardcodedPct}%`, background: '#FF4A4A' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, color: '#5F646D' }}>
                            <span>{tokenPct}% tokens</span>
                            <span>{hardcodedPct}% hardcoded</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function InstanceCard({ instance }: { instance: HardcodedInstance }) {
    const borderColor = instance.severity === 'warn' ? '#FF4A4A' : '#5883FF'
    const categoryColor = CATEGORY_COLORS[instance.category]

    return (
        <div
            style={{
                border: '1px solid #E7E8E9',
                borderLeft: `4px solid ${borderColor}`,
                background: '#fff',
                padding: '12px 16px',
                marginBottom: 8,
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                <code style={{ fontSize: 13, fontWeight: 700, color: '#000', wordBreak: 'break-all' }}>
                    {instance.value}
                </code>
                <span
                    style={{
                        background: categoryColor,
                        border: '1px solid #000',
                        padding: '2px 8px',
                        fontSize: 10,
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                    }}
                >
                    {CATEGORY_LABELS[instance.category]}
                </span>
            </div>

            <div style={{ marginTop: 6, fontSize: 11, color: '#5F646D', fontFamily: 'monospace' }}>
                {instance.file}:{instance.line}
            </div>

            <code
                style={{
                    display: 'block',
                    marginTop: 6,
                    fontSize: 11,
                    color: '#333',
                    background: '#FAF4F0',
                    padding: '4px 8px',
                    border: '1px solid #E7E8E9',
                }}
            >
                {instance.context}
            </code>

            {instance.tokenEquivalent && (
                <div style={{ marginTop: 6, fontSize: 11, color: '#1C6A50', background: '#ECFFE9', padding: '3px 8px', border: '1px solid #88D987' }}>
                    Use token: <strong>{instance.tokenEquivalent}</strong>
                </div>
            )}
        </div>
    )
}

function FilterBar({
    activeCategory,
    onChange,
}: {
    activeCategory: string
    onChange: (cat: string) => void
}) {
    const categories = ['all', 'color', 'font', 'spacing', 'radius']
    return (
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onChange(cat)}
                    style={{
                        border: '2px solid #000',
                        padding: '4px 12px',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: activeCategory === cat ? '#000' : '#fff',
                        color: activeCategory === cat ? '#fff' : '#000',
                    }}
                >
                    {cat === 'all' ? 'All' : CATEGORY_LABELS[cat as keyof typeof CATEGORY_LABELS]}
                    {cat !== 'all' && (
                        <span style={{ marginLeft: 6, opacity: 0.7 }}>
                            ({HARDCODED_INSTANCES.filter((i) => i.category === cat).length})
                        </span>
                    )}
                </button>
            ))}
        </div>
    )
}

export function HardcodedSection() {
    return <HardcodedSectionInner />
}

function HardcodedSectionInner() {
    const [activeCategory, setActiveCategory] = React.useState('all')

    const filtered =
        activeCategory === 'all'
            ? HARDCODED_INSTANCES
            : HARDCODED_INSTANCES.filter((i) => i.category === activeCategory)

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Hardcoded Values</h2>
                <p style={{ fontSize: 13, color: '#5F646D', margin: 0 }}>
                    {HARDCODED_INSTANCES.length} instances found where raw values are used instead of design tokens.
                </p>
            </div>

            <SummaryRow />

            <FilterBar activeCategory={activeCategory} onChange={setActiveCategory} />

            <div>
                {filtered.map((instance, i) => (
                    <InstanceCard key={i} instance={instance} />
                ))}
            </div>
        </div>
    )
}

