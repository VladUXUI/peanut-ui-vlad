'use client'

import React from 'react'

export type ComponentKind = 'component' | 'inline'

export function UsageBadge({ count }: { count: number }) {
    const bg = count > 50 ? '#98E9AB' : count > 20 ? '#FFF4CC' : '#E7E8E9'
    return (
        <span style={{ background: bg, border: '1px solid #000', padding: '2px 8px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
            {count} uses
        </span>
    )
}

export function VariantLabel({ label }: { label: string }) {
    return (
        <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 6 }}>
            {label}
        </span>
    )
}

export function Row({ children }: { children: React.ReactNode }) {
    return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>{children}</div>
}

export function VBox({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <VariantLabel label={label} />
            {children}
        </div>
    )
}

export function CannotRenderNote({ reason }: { reason: string }) {
    return (
        <div style={{ padding: '12px 16px', background: '#FAF4F0', border: '1px dashed #E7E8E9', fontSize: 12, color: '#5F646D' }}>
            Cannot render standalone: {reason}
        </div>
    )
}

export function ComponentShell({
    name,
    importPath,
    usageCount,
    description,
    renderNote,
    kind = 'component',
    instanceCount,
    locations,
    children,
}: {
    name: string
    importPath: string
    usageCount: number
    description?: string
    renderNote?: string
    kind?: ComponentKind
    instanceCount?: number
    locations?: string[]
    children: React.ReactNode
}) {
    const isInline = kind === 'inline'
    const borderLeft = isInline ? '4px solid #FFC900' : '4px solid #98E9AB'

    return (
        <div style={{ border: '2px solid #000', borderLeft, background: '#fff', marginBottom: 20 }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid #E7E8E9', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 800, fontSize: 14 }}>{name}</span>
                        {isInline ? (
                            <span style={{ background: '#FFC900', border: '1px solid #000', padding: '1px 7px', fontSize: 9, fontWeight: 800, letterSpacing: '0.06em' }}>
                                INLINE
                            </span>
                        ) : (
                            <span style={{ background: '#98E9AB', border: '1px solid #000', padding: '1px 7px', fontSize: 9, fontWeight: 800, letterSpacing: '0.06em' }}>
                                COMPONENT
                            </span>
                        )}
                        <code style={{ fontSize: 11, color: '#5F646D' }}>{importPath}</code>
                    </div>
                    {description && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#5F646D' }}>{description}</p>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                    <UsageBadge count={usageCount} />
                    {isInline && instanceCount !== undefined && (
                        <span style={{ background: '#FF4A4A', color: '#fff', padding: '1px 6px', fontSize: 9, fontWeight: 700 }}>
                            {instanceCount} inline instances
                        </span>
                    )}
                </div>
            </div>
            {renderNote && (
                <div style={{ padding: '6px 16px', background: '#FFF4CC', fontSize: 11, borderBottom: '1px solid #E7E8E9' }}>
                    ⚠ {renderNote}
                </div>
            )}
            {isInline && locations && locations.length > 0 && (
                <div style={{ padding: '6px 16px', background: '#FFFBEB', borderBottom: '1px solid #E7E8E9' }}>
                    {locations.slice(0, 4).map((loc, i) => (
                        <div key={i} style={{ fontSize: 10, fontFamily: 'monospace', color: '#5F646D', lineHeight: 1.6 }}>{loc}</div>
                    ))}
                    {locations.length > 4 && (
                        <div style={{ fontSize: 10, color: '#9CA3AF' }}>+{locations.length - 4} more — see Audit → Inline Patterns</div>
                    )}
                </div>
            )}
            <div style={{ padding: 16 }}>{children}</div>
        </div>
    )
}

export function SectionHeader({ title, description }: { title: string; description: string }) {
    return (
        <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>{title}</h2>
            <p style={{ fontSize: 13, color: '#5F646D', margin: 0 }}>{description}</p>
        </div>
    )
}

export function KindDivider({ label }: { label: string }) {
    const isInline = label.toLowerCase().includes('inline')
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            margin: '24px 0 16px',
        }}>
            <div style={{
                background: isInline ? '#FFC900' : '#98E9AB',
                border: '2px solid #000',
                padding: '3px 12px',
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
            }}>
                {label}
            </div>
            <div style={{ flex: 1, height: 2, background: '#E7E8E9' }} />
        </div>
    )
}
