'use client'

import React, { useState } from 'react'
import { ButtonsSection } from './sections/ButtonsSection'
import { InputsSection } from './sections/InputsSection'
import { CardsSection } from './sections/CardsSection'
import { NavigationSection } from './sections/NavigationSection'
import { FeedbackSection } from './sections/FeedbackSection'
import { BadgesSection } from './sections/BadgesSection'
import { OverlaysSection } from './sections/OverlaysSection'
import { DisplaySection } from './sections/DisplaySection'
import { TypographyLayoutSection } from './sections/TypographyLayoutSection'
import { TokenSection } from './sections/TokenSection'
import { HardcodedSection } from './sections/HardcodedSection'
import { IconsSection } from './sections/IconsSection'
import { InlinePatternsSection } from './sections/InlinePatternsSection'
import { TailwindMappingSection } from './sections/TailwindMappingSection'
import { HARDCODED_INSTANCES } from './data/tokenAudit'

type NavId =
    | 'cat-buttons'
    | 'cat-inputs'
    | 'cat-cards'
    | 'cat-navigation'
    | 'cat-feedback'
    | 'cat-badges'
    | 'cat-overlays'
    | 'cat-display'
    | 'cat-typography'
    | 'tokens-colors'
    | 'tokens-fonts'
    | 'tokens-spacing'
    | 'tokens-radius'
    | 'tokens-shadows'
    | 'icons'
    | 'hardcoded'
    | 'inline-patterns'
    | 'tailwind-mapping'

const hardcodedCount = HARDCODED_INSTANCES.length

function SidebarGroup({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ marginBottom: 4 }}>
            <div
                style={{
                    padding: '8px 16px 4px',
                    fontSize: 9,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#9CA3AF',
                }}
            >
                {label}
            </div>
            {children}
        </div>
    )
}

function SidebarItem({
    id,
    label,
    active,
    onClick,
    count,
    badge,
    hasInline,
}: {
    id: NavId
    label: string
    active: NavId
    onClick: (id: NavId) => void
    count?: number
    badge?: string
    hasInline?: boolean
}) {
    const isActive = active === id
    return (
        <button
            onClick={() => onClick(id)}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '7px 16px',
                fontSize: 13,
                fontWeight: isActive ? 800 : 500,
                textAlign: 'left',
                cursor: 'pointer',
                background: isActive ? '#000' : 'transparent',
                color: isActive ? '#fff' : '#000',
                border: 'none',
                borderLeft: isActive ? '3px solid #FF90E8' : '3px solid transparent',
                transition: 'none',
            }}
        >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {label}
                {hasInline && (
                    <span style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: isActive ? '#FFC900' : '#FFC900',
                        flexShrink: 0,
                        display: 'inline-block',
                    }} title="Has inline patterns" />
                )}
            </span>
            <span style={{ display: 'flex', gap: 4 }}>
                {count !== undefined && (
                    <span
                        style={{
                            background: isActive ? 'rgba(255,255,255,0.2)' : '#E7E8E9',
                            color: isActive ? '#fff' : '#5F646D',
                            padding: '1px 6px',
                            fontSize: 10,
                            fontWeight: 700,
                            borderRadius: 2,
                        }}
                    >
                        {count}
                    </span>
                )}
                {badge && (
                    <span
                        style={{
                            background: '#FF4A4A',
                            color: '#fff',
                            padding: '1px 6px',
                            fontSize: 10,
                            fontWeight: 700,
                            borderRadius: 2,
                        }}
                    >
                        {badge}
                    </span>
                )}
            </span>
        </button>
    )
}

export function DesignAuditShell() {
    const [active, setActive] = useState<NavId>('cat-buttons')
    const [search, setSearch] = useState('')

    function renderSection() {
        if (active === 'cat-buttons') return <ButtonsSection search={search} />
        if (active === 'cat-inputs') return <InputsSection search={search} />
        if (active === 'cat-cards') return <CardsSection search={search} />
        if (active === 'cat-navigation') return <NavigationSection search={search} />
        if (active === 'cat-feedback') return <FeedbackSection search={search} />
        if (active === 'cat-badges') return <BadgesSection search={search} />
        if (active === 'cat-overlays') return <OverlaysSection search={search} />
        if (active === 'cat-display') return <DisplaySection search={search} />
        if (active === 'cat-typography') return <TypographyLayoutSection search={search} />
        if (active === 'icons') return <IconsSection search={search} />
        if (active === 'hardcoded') return <HardcodedSection />
        if (active === 'inline-patterns') return <InlinePatternsSection />
        if (active === 'tailwind-mapping') return <TailwindMappingSection />
        if (active.startsWith('tokens-')) {
            return <TokenSection tab={active.replace('tokens-', '') as 'colors' | 'fonts' | 'spacing' | 'radius' | 'shadows'} />
        }
        return null
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-roboto), system-ui, sans-serif', background: '#FAF4F0' }}>
            {/* Sidebar */}
            <aside
                style={{
                    width: 220,
                    minWidth: 220,
                    borderRight: '2px solid #000',
                    background: '#fff',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {/* Header */}
                <div style={{ padding: '20px 16px 14px', borderBottom: '2px solid #000' }}>
                    <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em' }}>Design Audit</div>
                    <div
                        style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: '#fff',
                            background: '#FF4A4A',
                            display: 'inline-block',
                            padding: '1px 6px',
                            marginTop: 4,
                        }}
                    >
                        DEV ONLY
                    </div>
                </div>

                {/* Search */}
                <div style={{ padding: '10px 12px', borderBottom: '1px solid #E7E8E9' }}>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Filter components…"
                        style={{
                            width: '100%',
                            border: '1px solid #000',
                            padding: '5px 10px',
                            fontSize: 12,
                            outline: 'none',
                            boxSizing: 'border-box',
                            background: '#FAF4F0',
                        }}
                    />
                </div>

                {/* Nav */}
                <div style={{ flex: 1, paddingTop: 8, paddingBottom: 16 }}>
                    {/* Legend */}
                    <div style={{ padding: '4px 16px 8px', display: 'flex', gap: 12, alignItems: 'center' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#9CA3AF' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFC900', display: 'inline-block' }} />
                            has inline patterns
                        </span>
                    </div>

                    <SidebarGroup label="Components">
                        <SidebarItem id="cat-buttons" label="Buttons" active={active} onClick={setActive} count={3} hasInline />
                        <SidebarItem id="cat-inputs" label="Inputs & Controls" active={active} onClick={setActive} count={12} hasInline />
                        <SidebarItem id="cat-cards" label="Cards" active={active} onClick={setActive} count={6} />
                        <SidebarItem id="cat-navigation" label="Navigation" active={active} onClick={setActive} count={6} />
                        <SidebarItem id="cat-feedback" label="Feedback" active={active} onClick={setActive} count={8} hasInline />
                        <SidebarItem id="cat-badges" label="Badges" active={active} onClick={setActive} count={2} />
                        <SidebarItem id="cat-overlays" label="Overlays" active={active} onClick={setActive} count={3} />
                        <SidebarItem id="cat-display" label="Display & Actions" active={active} onClick={setActive} count={12} hasInline />
                        <SidebarItem id="cat-typography" label="Typography & Layout" active={active} onClick={setActive} count={5} />
                    </SidebarGroup>

                    <SidebarGroup label="Design Tokens">
                        <SidebarItem id="tokens-colors" label="Colors" active={active} onClick={setActive} count={73} />
                        <SidebarItem id="tokens-fonts" label="Typography" active={active} onClick={setActive} count={14} />
                        <SidebarItem id="tokens-spacing" label="Spacing" active={active} onClick={setActive} count={21} />
                        <SidebarItem id="tokens-radius" label="Border Radius" active={active} onClick={setActive} />
                        <SidebarItem id="tokens-shadows" label="Shadows" active={active} onClick={setActive} count={16} />
                    </SidebarGroup>

                    <SidebarGroup label="Design System">
                        <SidebarItem id="tailwind-mapping" label="Tailwind → Brand" active={active} onClick={setActive} count={27} />
                    </SidebarGroup>

                    <SidebarGroup label="Audit">
                        <SidebarItem id="icons" label="Icons" active={active} onClick={setActive} count={82} />
                        <SidebarItem
                            id="hardcoded"
                            label="Hardcoded Values"
                            active={active}
                            onClick={setActive}
                            badge={String(hardcodedCount)}
                        />
                        <SidebarItem
                            id="inline-patterns"
                            label="Inline Patterns"
                            active={active}
                            onClick={setActive}
                            badge="86"
                        />
                    </SidebarGroup>
                </div>
            </aside>

            {/* Main content */}
            <main
                style={{
                    flex: 1,
                    padding: '32px 40px',
                    minWidth: 0,
                    maxWidth: '100%',
                }}
            >
                {renderSection()}
            </main>
        </div>
    )
}
