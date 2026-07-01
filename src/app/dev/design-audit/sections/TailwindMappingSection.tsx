'use client'

import React, { useState } from 'react'

type ColorPair = {
    twClass: string
    twHex: string
    twUsages: number
    brandName: string | null
    brandHex: string | null
    brandUsages: number | null
}

type ColorGroup = {
    family: string
    pairs: ColorPair[]
}

const TAILWIND_IN_USE: ColorGroup[] = [
    {
        family: 'Gray',
        pairs: [
            { twClass: 'gray-50',  twHex: '#f9fafb', twUsages: 10, brandName: 'gray/50',  brandHex: '#FAF4F0', brandUsages: 217 },
            { twClass: 'gray-100', twHex: '#f3f4f6', twUsages: 9,  brandName: 'gray/100', brandHex: '#EFEFF0', brandUsages: 20 },
            { twClass: 'gray-200', twHex: '#e5e7eb', twUsages: 38, brandName: 'gray/200', brandHex: '#E7E8E9', brandUsages: 36 },
            { twClass: 'gray-300', twHex: '#d1d5db', twUsages: 32, brandName: 'gray/200', brandHex: '#E7E8E9', brandUsages: 36 },
            { twClass: 'gray-400', twHex: '#9ca3af', twUsages: 22, brandName: 'gray/600', brandHex: '#5F646D', brandUsages: 447 },
            { twClass: 'gray-500', twHex: '#6b7280', twUsages: 47, brandName: 'gray/600', brandHex: '#5F646D', brandUsages: 447 },
            { twClass: 'gray-600', twHex: '#4b5563', twUsages: 34, brandName: 'gray/600', brandHex: '#5F646D', brandUsages: 447 },
            { twClass: 'gray-700', twHex: '#374151', twUsages: 34, brandName: 'gray/900', brandHex: '#161616', brandUsages: 20 },
            { twClass: 'gray-800', twHex: '#1f2937', twUsages: 3,  brandName: 'gray/900', brandHex: '#161616', brandUsages: 20 },
            { twClass: 'gray-900', twHex: '#111827', twUsages: 19, brandName: 'gray/950', brandHex: '#000000', brandUsages: 390 },
        ],
    },
    {
        family: 'Yellow',
        pairs: [
            { twClass: 'yellow-100', twHex: '#fef9c3', twUsages: 6,  brandName: 'yellow/25',  brandHex: '#FEFCE8', brandUsages: 10 },
            { twClass: 'yellow-400', twHex: '#facc15', twUsages: 14, brandName: 'yellow/500', brandHex: '#FFC900', brandUsages: 126 },
            { twClass: 'yellow-700', twHex: '#a16207', twUsages: 4,  brandName: 'yellow/700', brandHex: '#CA8A04', brandUsages: 11 },
        ],
    },
    {
        family: 'Blue',
        pairs: [
            { twClass: 'blue-100', twHex: '#dbeafe', twUsages: 9, brandName: 'blue/100', brandHex: '#E9EEFB', brandUsages: 3 },
            { twClass: 'blue-500', twHex: '#3b82f6', twUsages: 3, brandName: 'blue/500', brandHex: '#5883FF', brandUsages: 9 },
            { twClass: 'blue-600', twHex: '#2563eb', twUsages: 3, brandName: 'blue/500', brandHex: '#5883FF', brandUsages: 9 },
        ],
    },
    {
        family: 'Purple',
        pairs: [
            { twClass: 'purple-200', twHex: '#e9d5ff', twUsages: 4, brandName: 'purple/100', brandHex: '#EFE4FF', brandUsages: 54 },
            { twClass: 'purple-600', twHex: '#9333ea', twUsages: 8, brandName: 'purple/500', brandHex: '#AE7AFF', brandUsages: 1 },
            { twClass: 'purple-700', twHex: '#7e22ce', twUsages: 3, brandName: 'purple/600', brandHex: '#6340DF', brandUsages: 6 },
        ],
    },
    {
        family: 'Orange',
        pairs: [
            { twClass: 'orange-500', twHex: '#f97316', twUsages: 6, brandName: null, brandHex: null, brandUsages: null },
            { twClass: 'orange-600', twHex: '#ea580c', twUsages: 7, brandName: null, brandHex: null, brandUsages: null },
        ],
    },
    {
        family: 'Red',
        pairs: [
            { twClass: 'red-50',  twHex: '#fef2f2', twUsages: 4, brandName: 'pink/50',  brandHex: '#FFE9E9', brandUsages: 2 },
            { twClass: 'red-500', twHex: '#ef4444', twUsages: 7, brandName: 'red/300',  brandHex: '#FF4A4A', brandUsages: 1 },
            { twClass: 'red-800', twHex: '#991b1b', twUsages: 3, brandName: 'red/800',  brandHex: '#B3261E', brandUsages: 67 },
        ],
    },
    {
        family: 'Green',
        pairs: [
            { twClass: 'green-700', twHex: '#15803d', twUsages: 3, brandName: 'green/900', brandHex: '#1C6A50', brandUsages: 10 },
        ],
    },
    {
        family: 'Cyan',
        pairs: [
            { twClass: 'cyan-600', twHex: '#0891b2', twUsages: 5, brandName: 'teal/500', brandHex: '#23A094', brandUsages: 6 },
        ],
    },
    {
        family: 'Pink',
        pairs: [
            { twClass: 'pink-100', twHex: '#fce7f3', twUsages: 6, brandName: 'pink/100', brandHex: '#FBEAEA', brandUsages: 1 },
        ],
    },
]

function hexDistance(a: string, b: string): number {
    const parse = (h: string) => {
        const c = h.replace('#', '')
        return [parseInt(c.slice(0,2),16), parseInt(c.slice(2,4),16), parseInt(c.slice(4,6),16)]
    }
    const [ar,ag,ab] = parse(a)
    const [br,bg,bb] = parse(b)
    return Math.sqrt((ar-br)**2 + (ag-bg)**2 + (ab-bb)**2)
}

function MatchBadge({ twHex, brandHex }: { twHex: string; brandHex: string }) {
    const dist = hexDistance(twHex, brandHex)
    const close = dist < 20
    const near = dist < 60
    return (
        <span style={{
            fontSize: 10,
            fontWeight: 700,
            padding: '2px 6px',
            background: close ? '#ECFFE9' : near ? '#FFF4CC' : '#FFE9E9',
            border: `1px solid ${close ? '#88D987' : near ? '#FAE184' : '#EA8282'}`,
            color: close ? '#1C6A50' : near ? '#885B00' : '#B3261E',
            whiteSpace: 'nowrap',
        }}>
            {close ? '≈ very close' : near ? '≈ close' : '≠ different'}
        </span>
    )
}

function Swatch({ hex, label, sub, usages }: { hex: string; label: string; sub?: string; usages?: number }) {
    const dark = parseInt(hex.replace('#','').slice(0,2),16) < 128
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 90 }}>
            <div style={{
                width: 80,
                height: 56,
                background: hex,
                border: '1.5px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {usages !== undefined && (
                    <span style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.45)',
                    }}>
                        {usages}×
                    </span>
                )}
            </div>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#000' }}>{label}</div>
                {sub && <div style={{ fontSize: 10, color: '#5F646D', fontFamily: 'monospace' }}>{sub}</div>}
            </div>
        </div>
    )
}

function NoBrandSwatch() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 90 }}>
            <div style={{
                width: 80,
                height: 56,
                border: '1.5px dashed #d1d5db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fafafa',
            }}>
                <span style={{ fontSize: 18, color: '#d1d5db' }}>—</span>
            </div>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#B3261E' }}>no match</div>
            </div>
        </div>
    )
}

export function TailwindMappingSection() {
    const [filter, setFilter] = useState<'all' | 'close' | 'different' | 'missing'>('all')

    const totalUsages = TAILWIND_IN_USE.flatMap(g => g.pairs).reduce((s, p) => s + p.twUsages, 0)
    const missingCount = TAILWIND_IN_USE.flatMap(g => g.pairs).filter(p => !p.brandHex).length
    const differentCount = TAILWIND_IN_USE.flatMap(g => g.pairs).filter(p => p.brandHex && hexDistance(p.twHex, p.brandHex) >= 60).length

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Tailwind → Brand Mapping</h2>
                <p style={{ fontSize: 13, color: '#5F646D', margin: '0 0 12px' }}>
                    27 Tailwind base colors currently in use in code, paired with the nearest brand primitive.
                    Usage counts shown on each swatch.
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    <div style={{ padding: '4px 12px', background: '#E7E8E9', border: '1px solid #000', fontSize: 12, fontWeight: 700 }}>
                        {totalUsages} total usages
                    </div>
                    <div style={{ padding: '4px 12px', background: '#FFE9E9', border: '1px solid #EA8282', fontSize: 12, fontWeight: 700, color: '#B3261E' }}>
                        {missingCount} with no brand match
                    </div>
                    <div style={{ padding: '4px 12px', background: '#FFF4CC', border: '1px solid #FAE184', fontSize: 12, fontWeight: 700, color: '#885B00' }}>
                        {differentCount} noticeably different
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
                {(['all', 'close', 'different', 'missing'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '4px 12px',
                            fontSize: 12,
                            fontWeight: 700,
                            border: '1.5px solid #000',
                            cursor: 'pointer',
                            background: filter === f ? '#000' : '#fff',
                            color: filter === f ? '#fff' : '#000',
                            textTransform: 'capitalize',
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {TAILWIND_IN_USE.map(group => {
                const visible = group.pairs.filter(p => {
                    if (filter === 'all') return true
                    if (filter === 'missing') return !p.brandHex
                    if (filter === 'close') return p.brandHex && hexDistance(p.twHex, p.brandHex) < 60
                    if (filter === 'different') return p.brandHex && hexDistance(p.twHex, p.brandHex) >= 60
                    return true
                })
                if (!visible.length) return null

                return (
                    <div key={group.family} style={{ marginBottom: 32 }}>
                        <div style={{
                            fontSize: 11,
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            color: '#5F646D',
                            marginBottom: 12,
                            paddingBottom: 6,
                            borderBottom: '1px solid #E7E8E9',
                        }}>
                            {group.family}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {visible.map(pair => (
                                <div
                                    key={pair.twClass}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 16,
                                        padding: '12px 16px',
                                        background: '#fff',
                                        border: '1.5px solid #E7E8E9',
                                    }}
                                >
                                    {/* Tailwind swatch */}
                                    <Swatch
                                        hex={pair.twHex}
                                        label={pair.twClass}
                                        sub={pair.twHex}
                                        usages={pair.twUsages}
                                    />

                                    {/* Arrow */}
                                    <div style={{ fontSize: 18, color: '#9CA3AF', flexShrink: 0 }}>→</div>

                                    {/* Brand swatch */}
                                    {pair.brandHex && pair.brandName
                                        ? <Swatch hex={pair.brandHex} label={pair.brandName} sub={pair.brandHex} usages={pair.brandUsages ?? undefined} />
                                        : <NoBrandSwatch />
                                    }

                                    {/* Match badge */}
                                    {pair.brandHex && (
                                        <MatchBadge twHex={pair.twHex} brandHex={pair.brandHex} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
