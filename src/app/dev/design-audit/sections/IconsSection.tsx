'use client'

import React, { useState } from 'react'
import { Icon, type IconName } from '@/components/Global/Icons/Icon'

const ALL_ICONS: IconName[] = [
    'alert',
    'alert-filled',
    'arrow-down',
    'arrow-down-left',
    'arrow-up',
    'arrow-up-right',
    'arrow-exchange',
    'achievements',
    'badge',
    'ban',
    'bank',
    'bell',
    'bug',
    'bulb',
    'camera',
    'camera-flip',
    'cancel',
    'check',
    'check-circle',
    'chevron-down',
    'chevron-up',
    'clock',
    'copy',
    'credit-card',
    'currency',
    'docs',
    'dollar',
    'double-check',
    'download',
    'error',
    'exchange',
    'external-link',
    'eye',
    'eye-slash',
    'failed',
    'fees',
    'gift',
    'globe-lock',
    'history',
    'home',
    'info',
    'info-filled',
    'invite-heart',
    'link',
    'link-slash',
    'lock',
    'logout',
    'meter',
    'minus-circle',
    'mobile-install',
    'more-horizontal',
    'paperclip',
    'clip',
    'paste',
    'peanut-support',
    'pending',
    'plus',
    'plus-circle',
    'processing',
    'qr-code',
    'question-mark',
    'retry',
    'search',
    'share',
    'shield',
    'smile',
    'split',
    'star',
    'success',
    'switch',
    'trash',
    'trophy',
    'txn-off',
    'undo',
    'upload-cloud',
    'user',
    'user-id',
    'user-plus',
    'wallet',
    'wallet-cancel',
    'wallet-outline',
]

const SIZES = [16, 20, 24, 32] as const

export function IconsSection({ search }: { search: string }) {
    const [activeSize, setActiveSize] = useState<number>(24)
    const [copied, setCopied] = useState<string | null>(null)

    const filtered = ALL_ICONS.filter((name) => name.includes(search.toLowerCase()))

    const handleCopy = (name: string) => {
        navigator.clipboard.writeText(`<Icon name="${name}" size={${activeSize}} />`).catch(() => {})
        setCopied(name)
        setTimeout(() => setCopied(null), 1500)
    }

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Icons</h2>
                <p style={{ fontSize: 13, color: '#5F646D', margin: '0 0 8px' }}>
                    {ALL_ICONS.length} named icons from <code>@/components/Global/Icons/Icon</code>. Lucide-based + 6 custom SVGs.
                    {search && ` Showing results for "${search}".`}
                </p>
                <div style={{ background: '#FFF4CC', border: '1px solid #FFC900', padding: '8px 12px', fontSize: 12, color: '#5F646D' }}>
                    ⚠ This catalogue covers the <code>Icon</code> component only.{' '}
                    <strong>3 out-of-system icon usages</strong> were also found:{' '}
                    1 direct Lucide import (<code>Users</code> → should be <code>split</code>),{' '}
                    1 asset SVG as <code>&lt;Image&gt;</code> (<code>LOGOUT_ICON</code> → should be <code>logout</code>),{' '}
                    and 4 inline <code>&lt;svg&gt;</code> elements (3 brand logos, 1 QR reticule).{' '}
                    See <strong>Audit → Inline Patterns</strong> for the full list.
                </div>
            </div>

            {/* Size selector */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                <span style={{ fontSize: 12, fontWeight: 700, alignSelf: 'center', color: '#5F646D' }}>Preview size:</span>
                {SIZES.map((s) => (
                    <button
                        key={s}
                        onClick={() => setActiveSize(s)}
                        style={{
                            border: '2px solid #000',
                            padding: '4px 12px',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                            background: activeSize === s ? '#000' : '#fff',
                            color: activeSize === s ? '#fff' : '#000',
                        }}
                    >
                        {s}px
                    </button>
                ))}
            </div>

            {/* All sizes header row */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: 8,
                }}
            >
                {filtered.map((name) => {
                    const isCopied = copied === name
                    return (
                        <div
                            key={name}
                            onClick={() => handleCopy(name)}
                            title={`Click to copy usage snippet`}
                            style={{
                                border: '1px solid #E7E8E9',
                                background: isCopied ? '#ECFFE9' : '#fff',
                                padding: '12px 8px 10px',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 8,
                                transition: 'background 0.1s',
                            }}
                        >
                            {/* All 4 sizes in a row */}
                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', justifyContent: 'center' }}>
                                {SIZES.map((s) => (
                                    <div
                                        key={s}
                                        style={{
                                            opacity: activeSize === s ? 1 : 0.3,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        <Icon name={name} size={s} />
                                        <span style={{ fontSize: 7, color: '#9CA3AF' }}>{s}</span>
                                    </div>
                                ))}
                            </div>

                            <span
                                style={{
                                    fontSize: 10,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    textAlign: 'center',
                                    color: isCopied ? '#1C6A50' : '#000',
                                    wordBreak: 'break-all',
                                }}
                            >
                                {isCopied ? '✓ copied' : name}
                            </span>
                        </div>
                    )
                })}
            </div>

            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: 40, color: '#9CA3AF', fontSize: 13 }}>
                    No icons match &ldquo;{search}&rdquo;
                </div>
            )}
        </div>
    )
}
