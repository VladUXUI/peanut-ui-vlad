'use client'

import React from 'react'
import { COLOR_TOKENS, FONT_SCALE, SPACING_TOKENS, type ColorToken, type FontScale, type SpacingToken } from '../data/tokenAudit'

type TokenTab = 'colors' | 'fonts' | 'spacing' | 'radius' | 'shadows'

type ShadowToken = {
    name: string
    cssLight: string
    cssDark: string
    offset: string
    direction: 'primary' | 'secondary'
    usageCount: number
    isBtn: boolean
    note?: string
}

const SHADOW_TOKENS: ShadowToken[] = [
    // Container — generic / primary direction (down-right)
    { name: 'shadow-2',             cssLight: '0.125rem 0.125rem 0 #000000',    cssDark: '0.125rem 0.125rem 0 rgba(255,255,255,.25)',    offset: '2px × 2px',   direction: 'primary',   usageCount: 5,  isBtn: false },
    { name: 'shadow-4',             cssLight: '0.25rem 0.25rem 0 #000000',      cssDark: '0.25rem 0.25rem 0 rgba(255,255,255,.25)',      offset: '4px × 4px',   direction: 'primary',   usageCount: 14, isBtn: false },
    { name: 'shadow-primary-4',     cssLight: '0.25rem 0.25rem 0 #000000',      cssDark: '0.25rem 0.25rem 0 rgba(255,255,255,.25)',      offset: '4px × 4px',   direction: 'primary',   usageCount: 0,  isBtn: false, note: 'alias of shadow-4' },
    { name: 'shadow-primary-6',     cssLight: '0.375rem 0.375rem 0 #000000',    cssDark: '0.375rem 0.375rem 0 rgba(255,255,255,.25)',    offset: '6px × 6px',   direction: 'primary',   usageCount: 3,  isBtn: false },
    { name: 'shadow-primary-8',     cssLight: '0.5rem 0.5rem 0 #000000',        cssDark: '0.5rem 0.5rem 0 rgba(255,255,255,.25)',        offset: '8px × 8px',   direction: 'primary',   usageCount: 1,  isBtn: false },
    // Container — secondary direction (right + up)
    { name: 'shadow-secondary-4',   cssLight: '0.25rem -0.25rem 0 #000000',     cssDark: '0.25rem -0.25rem 0 rgba(255,255,255,.25)',     offset: '4px × −4px',  direction: 'secondary', usageCount: 1,  isBtn: false },
    { name: 'shadow-secondary-6',   cssLight: '0.375rem -0.375rem 0 #000000',   cssDark: '0.375rem -0.375rem 0 rgba(255,255,255,.25)',   offset: '6px × −6px',  direction: 'secondary', usageCount: 1,  isBtn: false },
    { name: 'shadow-secondary-8',   cssLight: '0.5rem -0.5rem 0 #000000',       cssDark: '0.5rem -0.5rem 0 rgba(255,255,255,.25)',       offset: '8px × −8px',  direction: 'secondary', usageCount: 1,  isBtn: false },
    // Button — primary direction
    { name: 'btn-shadow-primary-3', cssLight: '0.1875rem 0.1875rem 0 #000000',  cssDark: '0.1875rem 0.1875rem 0 rgba(255,255,255,.25)',  offset: '3px × 3px',   direction: 'primary',   usageCount: 1,  isBtn: true },
    { name: 'btn-shadow-primary-4', cssLight: '0.25rem 0.25rem 0 #000000',      cssDark: '0.25rem 0.25rem 0 rgba(255,255,255,.25)',      offset: '4px × 4px',   direction: 'primary',   usageCount: 8,  isBtn: true },
    { name: 'btn-shadow-primary-6', cssLight: '0.375rem 0.375rem 0 #000000',    cssDark: '0.375rem 0.375rem 0 rgba(255,255,255,.25)',    offset: '6px × 6px',   direction: 'primary',   usageCount: 1,  isBtn: true },
    { name: 'btn-shadow-primary-8', cssLight: '0.5rem 0.5rem 0 #000000',        cssDark: '0.5rem 0.5rem 0 rgba(255,255,255,.25)',        offset: '8px × 8px',   direction: 'primary',   usageCount: 1,  isBtn: true },
    // Button — secondary direction
    { name: 'btn-shadow-secondary-3', cssLight: '0.1875rem -0.1875rem 0 #000000', cssDark: '0.1875rem -0.1875rem 0 rgba(255,255,255,.25)', offset: '3px × −3px', direction: 'secondary', usageCount: 1, isBtn: true },
    { name: 'btn-shadow-secondary-4', cssLight: '0.25rem -0.25rem 0 #000000',     cssDark: '0.25rem -0.25rem 0 rgba(255,255,255,.25)',     offset: '4px × −4px', direction: 'secondary', usageCount: 1, isBtn: true },
    { name: 'btn-shadow-secondary-6', cssLight: '0.375rem -0.375rem 0 #000000',   cssDark: '0.375rem -0.375rem 0 rgba(255,255,255,.25)',   offset: '6px × −6px', direction: 'secondary', usageCount: 1, isBtn: true },
    { name: 'btn-shadow-secondary-8', cssLight: '0.5rem -0.5rem 0 #000000',       cssDark: '0.5rem -0.5rem 0 rgba(255,255,255,.25)',       offset: '8px × −8px', direction: 'secondary', usageCount: 1, isBtn: true },
]

// Tailwind built-in colors used in src/components but NOT defined as project tokens
const BUILTIN_COLORS_IN_USE = [
    { name: 'red-50',     value: '#fef2f2', uses: 1  },
    { name: 'red-500',    value: '#ef4444', uses: 7  },
    { name: 'red-900',    value: '#7f1d1d', uses: 1  },
    { name: 'blue-100',   value: '#dbeafe', uses: 1  },
    { name: 'blue-500',   value: '#3b82f6', uses: 2  },
    { name: 'blue-600',   value: '#2563eb', uses: 1  },
    { name: 'blue-700',   value: '#1d4ed8', uses: 1  },
    { name: 'purple-50',  value: '#faf5ff', uses: 2  },
    { name: 'purple-100', value: '#f3e8ff', uses: 2  },
    { name: 'purple-500', value: '#a855f7', uses: 1  },
    { name: 'purple-600', value: '#9333ea', uses: 1  },
    { name: 'purple-700', value: '#7e22ce', uses: 2  },
    { name: 'purple-900', value: '#581c87', uses: 1  },
]

// Tailwind default text sizes used in src/components — no project tokens defined for these
const BODY_SIZES_IN_USE = [
    { name: 'text-xs',   size: '0.75rem',  px: '12px', lineHeight: '1rem',       uses: 94  },
    { name: 'text-sm',   size: '0.875rem', px: '14px', lineHeight: '1.3125rem',  uses: 242, note: 'overridden in config' },
    { name: 'text-base', size: '1rem',     px: '16px', lineHeight: '1.5rem',     uses: 72  },
    { name: 'text-lg',   size: '1.125rem', px: '18px', lineHeight: '1.75rem',    uses: 43  },
    { name: 'text-xl',   size: '1.25rem',  px: '20px', lineHeight: '1.75rem',    uses: 60  },
    { name: 'text-2xl',  size: '1.5rem',   px: '24px', lineHeight: '2rem',       uses: 30  },
    { name: 'text-3xl',  size: '1.875rem', px: '30px', lineHeight: '2.25rem',    uses: 12  },
    { name: 'text-4xl',  size: '2.25rem',  px: '36px', lineHeight: '2.5rem',     uses: 10  },
    { name: 'text-5xl',  size: '3rem',     px: '48px', lineHeight: '1',          uses: 4   },
]

const RADIUS_TOKENS = [
    { name: 'rounded-none', value: '0px', tailwind: 'rounded-none' },
    { name: 'rounded-sm', value: '2px', tailwind: 'rounded-sm' },
    { name: 'rounded', value: '4px', tailwind: 'rounded' },
    { name: 'rounded-md', value: '6px', tailwind: 'rounded-md' },
    { name: 'rounded-lg', value: '8px', tailwind: 'rounded-lg' },
    { name: 'rounded-xl', value: '12px', tailwind: 'rounded-xl' },
    { name: 'rounded-2xl', value: '16px', tailwind: 'rounded-2xl' },
    { name: 'rounded-full', value: '9999px', tailwind: 'rounded-full' },
    { name: 'rounded-1 (custom)', value: '0.0625rem (1px)', tailwind: 'rounded-1' },
]

// Group color tokens by their group field
function groupColors(tokens: ColorToken[]) {
    const groups: Record<string, ColorToken[]> = {}
    for (const token of tokens) {
        if (!groups[token.group]) groups[token.group] = []
        groups[token.group].push(token)
    }
    return groups
}

function getContrastColor(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

function ColorSwatch({ token }: { token: ColorToken }) {
    const [copied, setCopied] = React.useState(false)
    const textColor = getContrastColor(token.value.replace('var(--', '').length < 8 ? '#888888' : token.value)

    const handleCopy = () => {
        navigator.clipboard.writeText(token.value).catch(() => {})
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    const countBg = token.usageCount > 50 ? '#98E9AB' : token.usageCount > 10 ? '#FFF4CC' : token.usageCount > 0 ? '#E7E8E9' : '#F5F5F5'
    const countColor = token.usageCount > 0 ? '#000' : '#9CA3AF'

    const hasRole = !!token.semanticRole
    const swatchWidth = hasRole ? 96 : 72

    return (
        <div
            onClick={handleCopy}
            title={`Click to copy ${token.value}`}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                width: swatchWidth,
                cursor: 'pointer',
            }}
        >
            <div
                style={{
                    width: 52,
                    height: 52,
                    background: token.value,
                    border: '1px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    color: textColor,
                    fontWeight: 700,
                }}
            >
                {copied ? '✓' : ''}
            </div>
            <span style={{ fontSize: 9, textAlign: 'center', fontWeight: 700, lineHeight: 1.2 }}>{token.name}</span>
            <span style={{ fontSize: 9, color: '#5F646D', fontFamily: 'monospace', textAlign: 'center' }}>{token.value}</span>
            <span
                style={{
                    background: countBg,
                    color: countColor,
                    border: '1px solid #E7E8E9',
                    padding: '1px 5px',
                    fontSize: 8,
                    fontWeight: 700,
                    borderRadius: 2,
                }}
            >
                {token.usageCount}×
            </span>
            {token.semanticRole && (
                <span
                    style={{
                        background: '#EFE4FF',
                        color: '#6340DF',
                        border: '1px solid #C4A8FF',
                        padding: '1px 5px',
                        fontSize: 8,
                        fontWeight: 700,
                        borderRadius: 2,
                        textAlign: 'center',
                        lineHeight: 1.4,
                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                    }}
                >
                    {token.semanticRole}
                </span>
            )}
        </div>
    )
}

function BuiltinColorSwatch({ name, value, uses }: { name: string; value: string; uses: number }) {
    const [copied, setCopied] = React.useState(false)
    const r = parseInt(value.slice(1, 3), 16)
    const g = parseInt(value.slice(3, 5), 16)
    const b = parseInt(value.slice(5, 7), 16)
    const textColor = (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? '#000' : '#fff'

    return (
        <div
            onClick={() => { navigator.clipboard.writeText(value).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
            title={`Click to copy ${value}`}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 72, cursor: 'pointer' }}
        >
            <div style={{ width: 52, height: 52, background: value, border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: textColor, fontWeight: 700 }}>
                {copied ? '✓' : ''}
            </div>
            <span style={{ fontSize: 9, textAlign: 'center', fontWeight: 700, lineHeight: 1.2, fontFamily: 'monospace' }}>{name}</span>
            <span style={{ fontSize: 9, color: '#5F646D', fontFamily: 'monospace', textAlign: 'center' }}>{value}</span>
            <span style={{ background: '#FFF4CC', border: '1px solid #E7E8E9', padding: '1px 5px', fontSize: 8, fontWeight: 700, borderRadius: 2 }}>
                {uses}×
            </span>
        </div>
    )
}

function ColorsTab() {
    const groups = groupColors(COLOR_TOKENS)
    const groupOrder = ['primary', 'secondary', 'neutral', 'error', 'success', 'outline', 'base', 'yellow', 'green', 'teal', 'gray', 'grey', 'purple (legacy)', 'violet', 'cyan', 'orange']

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Colors</h2>
                <p style={{ fontSize: 13, color: '#5F646D', margin: '0 0 12px' }}>
                    {COLOR_TOKENS.length} project tokens across {Object.keys(groups).length} groups, plus {BUILTIN_COLORS_IN_USE.length} Tailwind built-in colors used without project tokens. Click a swatch to copy the hex.
                </p>
                <div style={{ background: '#FFF4CC', border: '1px solid #FFC900', padding: '8px 12px', fontSize: 12, color: '#5F646D' }}>
                    ⚠ The built-in Tailwind colors at the bottom are <strong>not project tokens</strong> — they bypass the design system entirely. Any of them that map to a project color (e.g. <code>red-500</code> ≈ <code>error-3</code>) should be replaced.
                </div>
            </div>
            {groupOrder.map((groupName) => {
                const tokens = groups[groupName]
                if (!tokens) return null
                return (
                    <div key={groupName} style={{ marginBottom: 28 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5F646D', marginBottom: 12, paddingBottom: 6, borderBottom: '1px solid #E7E8E9' }}>
                            {groupName}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                            {tokens.map((token) => (
                                <ColorSwatch key={token.name} token={token} />
                            ))}
                        </div>
                    </div>
                )
            })}

            {/* Built-in Tailwind colors — not project tokens */}
            <div style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, paddingBottom: 6, borderBottom: '2px solid #FFC900', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ background: '#FFC900', border: '1px solid #000', padding: '1px 6px', fontSize: 9 }}>UNDOCUMENTED</span>
                    Tailwind built-in colors in use
                </div>
                <p style={{ fontSize: 11, color: '#5F646D', margin: '8px 0 12px' }}>
                    These are Tailwind defaults — not defined anywhere in <code>tailwind.config.js</code>. {BUILTIN_COLORS_IN_USE.length} distinct colors, {BUILTIN_COLORS_IN_USE.reduce((s, c) => s + c.uses, 0)} total usages in <code>src/components</code>.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 16 }}>
                    {BUILTIN_COLORS_IN_USE.map((c) => (
                        <BuiltinColorSwatch key={c.name} {...c} />
                    ))}
                </div>
                <div style={{ background: '#FAF4F0', border: '1px solid #E7E8E9', padding: '10px 14px', fontSize: 11, color: '#5F646D' }}>
                    <strong>Likely replacements:</strong>{' '}
                    <code>red-500</code> → <code>error-3 (#FF4A4A)</code> &nbsp;·&nbsp;
                    <code>red-50</code> → <code>error-6 (#FFE9E9)</code> &nbsp;·&nbsp;
                    <code>purple-*</code> → no direct equivalent (violet-3 is closest at <code>#6340DF</code>) &nbsp;·&nbsp;
                    <code>blue-*</code> → no project token defined
                </div>
            </div>
        </div>
    )
}

function FontsTab() {
    const totalBodyUses = BODY_SIZES_IN_USE.reduce((s, t) => s + t.uses, 0)

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Typography</h2>
                <p style={{ fontSize: 13, color: '#5F646D', margin: '0 0 12px' }}>
                    {FONT_SCALE.length} custom tokens defined in tailwind.config.js (all headings, weight 800). Body/paragraph text uses Tailwind defaults — {totalBodyUses} usages across {BODY_SIZES_IN_USE.length} sizes with no project tokens.
                </p>
                <div style={{ background: '#FFF4CC', border: '1px solid #FFC900', padding: '8px 12px', fontSize: 12, color: '#5F646D' }}>
                    ⚠ <strong>No body text tokens are defined.</strong> <code>text-sm</code> (242 uses), <code>text-base</code> (72 uses), and <code>text-xl</code> (60 uses) are the de-facto body scale but are undocumented Tailwind defaults — no project role, no line-height intent, no weight baked in.
                </div>
            </div>

            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5F646D', marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid #E7E8E9' }}>
                Heading scale — project tokens (tailwind.config.js)
            </div>
            <div style={{ background: '#fff', border: '2px solid #000', marginBottom: 32 }}>
                {FONT_SCALE.map((scale, i) => (
                    <FontScaleRow key={scale.name} scale={scale} isLast={i === FONT_SCALE.length - 1} />
                ))}
            </div>

            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, paddingBottom: 6, borderBottom: '2px solid #FFC900', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: '#FFC900', border: '1px solid #000', padding: '1px 6px', fontSize: 9 }}>UNDOCUMENTED</span>
                Body & utility sizes — Tailwind defaults in use
            </div>
            <div style={{ background: '#fff', border: '2px solid #000', marginBottom: 32 }}>
                {BODY_SIZES_IN_USE.map((size, i) => {
                    const useBg = size.uses > 100 ? '#FFE9E9' : size.uses > 50 ? '#FFF4CC' : '#F5F5F5'
                    return (
                        <div
                            key={size.name}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16,
                                padding: '12px 20px',
                                borderBottom: i === BODY_SIZES_IN_USE.length - 1 ? 'none' : '1px solid #E7E8E9',
                                minHeight: 52,
                            }}
                        >
                            <span style={{ width: 72, fontSize: 11, fontWeight: 800, color: '#5F646D', flexShrink: 0, fontFamily: 'monospace' }}>
                                {size.name}
                            </span>
                            <span style={{ fontSize: Math.min(parseFloat(size.size), 1.5) + 'rem', lineHeight: size.lineHeight, flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                The quick brown fox
                            </span>
                            <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'monospace', flexShrink: 0, textAlign: 'right' }}>
                                {size.px} / lh {size.lineHeight}
                                {size.note && <span style={{ marginLeft: 6, color: '#FFC900', fontWeight: 700 }}>({size.note})</span>}
                            </span>
                            <span style={{ background: useBg, border: '1px solid #E7E8E9', padding: '2px 7px', fontSize: 10, fontWeight: 700, flexShrink: 0, borderRadius: 2 }}>
                                {size.uses}×
                            </span>
                        </div>
                    )
                })}
            </div>

            <div style={{ background: '#fff', border: '2px solid #000', padding: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5F646D', marginBottom: 16 }}>
                    Font Families
                </div>
                {[
                    { name: 'font-sans', description: 'Roboto (default)', sample: 'The quick brown fox jumps over the lazy dog' },
                    { name: 'font-display', description: 'Sniglet', sample: 'The quick brown fox jumps over the lazy dog' },
                    { name: 'font-condensed', description: 'Roboto (wdth: 50)', sample: 'The quick brown fox jumps over the lazy dog' },
                    { name: 'font-knerd-filled', description: 'Knerd Filled (custom)', sample: 'PEANUT' },
                    { name: 'font-knerd-outline', description: 'Knerd Outline (custom)', sample: 'PEANUT' },
                ].map(({ name, description, sample }) => (
                    <div key={name} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '10px 0', borderBottom: '1px solid #E7E8E9' }}>
                        <span style={{ width: 160, fontSize: 11, fontWeight: 700, color: '#5F646D', flexShrink: 0, fontFamily: 'monospace' }}>{name}</span>
                        <span
                            className={name}
                            style={{ fontSize: 18, flex: 1 }}
                        >
                            {sample}
                        </span>
                        <span style={{ fontSize: 11, color: '#9CA3AF' }}>{description}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function FontScaleRow({ scale, isLast }: { scale: FontScale; isLast: boolean }) {
    // Cap the preview font size to avoid overflow on large heading scales
    const previewSize = Math.min(parseFloat(scale.size), 3)
    const countBg = scale.usageCount > 50 ? '#98E9AB' : scale.usageCount > 5 ? '#FFF4CC' : scale.usageCount > 0 ? '#E7E8E9' : '#F5F5F5'
    const countColor = scale.usageCount > 0 ? '#000' : '#9CA3AF'

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '12px 20px',
                borderBottom: isLast ? 'none' : '1px solid #E7E8E9',
                minHeight: 56,
            }}
        >
            <span
                style={{
                    width: 56,
                    fontSize: 11,
                    fontWeight: 800,
                    color: '#5F646D',
                    flexShrink: 0,
                    fontFamily: 'monospace',
                }}
            >
                {scale.name}
            </span>
            <span
                style={{
                    fontSize: `${previewSize}rem`,
                    lineHeight: scale.lineHeight,
                    fontWeight: Number(scale.weight) as React.CSSProperties['fontWeight'],
                    flex: 1,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                }}
            >
                The quick brown fox
            </span>
            <span style={{ fontSize: 10, color: '#9CA3AF', textAlign: 'right', flexShrink: 0, fontFamily: 'monospace' }}>
                {scale.size} / {scale.lineHeight} / w{scale.weight}
            </span>
            <span style={{
                background: countBg,
                color: countColor,
                border: '1px solid #E7E8E9',
                padding: '2px 7px',
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 2,
                flexShrink: 0,
                width: 36,
                textAlign: 'center',
            }}>
                {scale.usageCount}×
            </span>
        </div>
    )
}

function SpacingTab() {
    const MAX_BAR_PX = 200
    const maxRem = Math.max(...SPACING_TOKENS.map((t) => t.remValue))

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Spacing</h2>
                <p style={{ fontSize: 13, color: '#5F646D', margin: 0 }}>
                    Custom spacing tokens that extend Tailwind&apos;s default scale. Use as <code>p-13</code>, <code>mt-4.5</code>, etc.
                </p>
            </div>
            <div style={{ background: '#fff', border: '2px solid #000', padding: '4px 0' }}>
                {SPACING_TOKENS.map((token) => (
                    <SpacingRow key={token.name} token={token} maxRem={maxRem} maxBarPx={MAX_BAR_PX} />
                ))}
            </div>
        </div>
    )
}

function SpacingRow({ token, maxRem, maxBarPx }: { token: SpacingToken; maxRem: number; maxBarPx: number }) {
    const barWidth = Math.max(2, (token.remValue / maxRem) * maxBarPx)

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 16px',
                borderBottom: '1px solid #F0F0F0',
            }}
        >
            <span style={{ width: 40, fontSize: 11, fontWeight: 700, fontFamily: 'monospace', flexShrink: 0 }}>
                {token.name}
            </span>
            <div
                style={{
                    width: barWidth,
                    height: 20,
                    background: '#FF90E8',
                    border: '1px solid #000',
                    flexShrink: 0,
                }}
            />
            <span style={{ fontSize: 10, color: '#9CA3AF', fontFamily: 'monospace' }}>{token.value}</span>
        </div>
    )
}

function RadiusTab() {
    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Border Radius</h2>
                <p style={{ fontSize: 13, color: '#5F646D', margin: 0 }}>
                    Tailwind&apos;s default radius scale plus <code>rounded-1</code> (custom 1px). Only 1 custom token is defined — consider expanding.
                </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                {RADIUS_TOKENS.map((token) => (
                    <div
                        key={token.name}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 8,
                            background: '#fff',
                            border: '2px solid #000',
                            padding: 16,
                            minWidth: 120,
                        }}
                    >
                        <div
                            style={{
                                width: 56,
                                height: 56,
                                background: '#FF90E8',
                                border: '2px solid #000',
                                borderRadius: token.value === '9999px' ? '9999px' : token.value,
                            }}
                        />
                        <span style={{ fontSize: 10, fontWeight: 800, textAlign: 'center' }}>{token.name}</span>
                        <span style={{ fontSize: 9, color: '#5F646D', fontFamily: 'monospace', textAlign: 'center' }}>{token.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ShadowRow({ token }: { token: ShadowToken }) {
    const countBg = token.usageCount > 10 ? '#98E9AB' : token.usageCount > 0 ? '#FFF4CC' : '#F5F5F5'
    const countColor = token.usageCount > 0 ? '#000' : '#9CA3AF'

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '14px 20px',
            borderBottom: '1px solid #F0F0F0',
        }}>
            {/* Preview — primary direction shifts box down-right, secondary up-right */}
            <div style={{
                width: 64,
                height: 40,
                flexShrink: 0,
                background: '#FAF4F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <div style={{
                    width: 36,
                    height: 24,
                    background: '#fff',
                    border: '1.5px solid #000',
                    boxShadow: token.cssLight,
                }} />
            </div>

            {/* Name + note */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 800, fontFamily: 'monospace' }}>{token.name}</span>
                {token.note && (
                    <span style={{ marginLeft: 8, fontSize: 10, color: '#9CA3AF' }}>({token.note})</span>
                )}
                <div style={{ fontSize: 10, color: '#5F646D', fontFamily: 'monospace', marginTop: 2 }}>
                    {token.cssLight}
                </div>
            </div>

            {/* Offset */}
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#5F646D', flexShrink: 0, width: 72, textAlign: 'right' }}>
                {token.offset}
            </span>

            {/* Direction badge */}
            <span style={{
                fontSize: 9,
                fontWeight: 800,
                padding: '2px 6px',
                background: token.direction === 'primary' ? '#E9EEFB' : '#EFE4FF',
                color: token.direction === 'primary' ? '#5883FF' : '#6340DF',
                border: `1px solid ${token.direction === 'primary' ? '#90A8ED' : '#BA8BFF'}`,
                flexShrink: 0,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
            }}>
                {token.direction === 'primary' ? '↘ primary' : '↗ secondary'}
            </span>

            {/* Usage count */}
            <span style={{
                background: countBg,
                color: countColor,
                border: '1px solid #E7E8E9',
                padding: '2px 7px',
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 2,
                flexShrink: 0,
                width: 36,
                textAlign: 'center',
            }}>
                {token.usageCount}×
            </span>
        </div>
    )
}

function ShadowsTab() {
    const containerTokens = SHADOW_TOKENS.filter(t => !t.isBtn)
    const btnTokens = SHADOW_TOKENS.filter(t => t.isBtn)
    const totalUsages = SHADOW_TOKENS.reduce((s, t) => s + t.usageCount, 0)

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Shadows</h2>
                <p style={{ fontSize: 13, color: '#5F646D', margin: '0 0 12px' }}>
                    Hard flat offset shadows — Peanut&apos;s signature elevation style. No blur, solid black offset.
                    Color is always <code>#000000</code> light / <code>rgba(255,255,255,0.25)</code> dark.
                    {' '}{totalUsages} total usages across {SHADOW_TOKENS.filter(t => t.usageCount > 0).length} classes.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                    <div style={{ padding: '4px 12px', background: '#E9EEFB', border: '1px solid #90A8ED', fontSize: 12, fontWeight: 700, color: '#5883FF' }}>
                        ↘ primary — down-right
                    </div>
                    <div style={{ padding: '4px 12px', background: '#EFE4FF', border: '1px solid #BA8BFF', fontSize: 12, fontWeight: 700, color: '#6340DF' }}>
                        ↗ secondary — right + up
                    </div>
                </div>
            </div>

            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5F646D', marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid #E7E8E9' }}>
                Container shadows
            </div>
            <div style={{ background: '#fff', border: '2px solid #000', marginBottom: 32 }}>
                {containerTokens.map(t => <ShadowRow key={t.name} token={t} />)}
            </div>

            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5F646D', marginBottom: 8, paddingBottom: 6, borderBottom: '1px solid #E7E8E9' }}>
                Button shadows
            </div>
            <div style={{ background: '#fff', border: '2px solid #000', marginBottom: 32 }}>
                {btnTokens.map(t => <ShadowRow key={t.name} token={t} />)}
            </div>
        </div>
    )
}

export function TokenSection({ tab }: { tab: TokenTab }) {
    if (tab === 'colors') return <ColorsTab />
    if (tab === 'fonts') return <FontsTab />
    if (tab === 'spacing') return <SpacingTab />
    if (tab === 'radius') return <RadiusTab />
    if (tab === 'shadows') return <ShadowsTab />
    return null
}
