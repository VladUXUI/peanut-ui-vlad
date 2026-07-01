'use client'

import React, { useState } from 'react'
import { Button } from '@/components/0_Bruddle/Button'
import { Icon } from '@/components/Global/Icons/Icon'
import { ComponentShell, SectionHeader, KindDivider, Row, VBox } from './_shell'

export function ButtonsSection({ search }: { search: string }) {
    const q = search.toLowerCase()
    const show = (name: string) => name.toLowerCase().includes(q)

    return (
        <div>
            <SectionHeader
                title="Buttons"
                description="All button components and inline button patterns across the app."
            />

            <KindDivider label="Components" />

            {show('button') && (
                <ComponentShell
                    name="Button"
                    importPath="@/components/0_Bruddle/Button"
                    usageCount={157}
                    description="Primary interaction component with variant, size, shadow, loading, icon, and long-press support."
                    kind="component"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div>
                            <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 8 }}>Variants</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
                                <VBox label="purple"><Button variant="purple">Send money</Button></VBox>
                                <VBox label="purple + shadow-4"><Button variant="purple" shadowSize="4">Send money</Button></VBox>
                                <VBox label="stroke"><Button variant="stroke">Cancel</Button></VBox>
                                <VBox label="primary-soft"><Button variant="primary-soft">Soft action</Button></VBox>
                                <VBox label="dark"><Button variant="dark">Dark CTA</Button></VBox>
                                <VBox label="transparent-dark"><Button variant="transparent-dark">Link</Button></VBox>
                                <VBox label="transparent-light">
                                    <div style={{ background: '#000', padding: 8 }}>
                                        <Button variant="transparent-light">Light link</Button>
                                    </div>
                                </VBox>
                            </div>
                        </div>
                        <div>
                            <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 8 }}>States & Sizes</span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
                                <VBox label="default"><Button variant="purple">Default</Button></VBox>
                                <VBox label="small"><Button variant="purple" size="small">Small</Button></VBox>
                                <VBox label="loading"><Button variant="purple" loading>Loading…</Button></VBox>
                                <VBox label="disabled"><Button variant="purple" disabled>Disabled</Button></VBox>
                                <VBox label="with left icon">
                                    <Button variant="purple">
                                        <Icon name="arrow-up-right" size={16} />
                                        Send
                                    </Button>
                                </VBox>
                            </div>
                        </div>
                    </div>
                </ComponentShell>
            )}

            <KindDivider label="Inline Patterns" />

            {show('action') && (
                <HomeActionButtonShell />
            )}

            {show('raw') && (
                <ComponentShell
                    name="Raw <button> text link"
                    importPath="Various — no shared component"
                    usageCount={10}
                    description="Plain <button> elements used as text links instead of Button variant='transparent-dark'."
                    kind="inline"
                    instanceCount={10}
                    locations={[
                        'src/components/Global/TransactionHistory/index.tsx',
                        'src/components/Global/SuccessViewComponents/index.tsx',
                        'src/components/Peanut/Send/index.tsx',
                        'src/components/Peanut/Request/index.tsx',
                        'src/components/Peanut/Offramp/index.tsx',
                    ]}
                >
                    <div>
                        <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 8 }}>What it looks like</span>
                        <Row>
                            <VBox label="current (raw button)">
                                <button
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        cursor: 'pointer',
                                        color: '#000',
                                        fontSize: 14,
                                        fontWeight: 600,
                                        textDecoration: 'underline',
                                    }}
                                >
                                    View details
                                </button>
                            </VBox>
                            <VBox label="should be">
                                <Button variant="transparent-dark" size="small">View details</Button>
                            </VBox>
                        </Row>
                    </div>
                </ComponentShell>
            )}
        </div>
    )
}

function HomeActionButtonShell() {
    return (
        <ComponentShell
            name="ActionButton / ActionButtonGroup"
            importPath="src/app/(mobile-ui)/home/page.tsx — local functions, not exported"
            usageCount={4}
            description="Rounded pill buttons for the four primary home actions. Two sizes: large (Send/Request) and small (Add/Withdraw). Defined inline in the home page — should be extracted to a shared component."
            kind="inline"
            instanceCount={4}
            locations={[
                'src/app/(mobile-ui)/home/page.tsx:185 — ActionButton (Send)',
                'src/app/(mobile-ui)/home/page.tsx:186 — ActionButton (Request)',
                'src/app/(mobile-ui)/home/page.tsx:197 — ActionButton (Add)',
                'src/app/(mobile-ui)/home/page.tsx:198 — ActionButton (Withdraw)',
            ]}
        >
            <HomeActionButtonPreview />
        </ComponentShell>
    )
}

function HomeActionButton({ label, action, variant = 'primary-soft', size = 'small' }: {
    label: string
    action: 'add' | 'withdraw' | 'send' | 'request'
    variant?: 'purple' | 'primary-soft'
    size?: 'small' | 'large'
}) {
    const iconSize = size === 'large' ? 18 : 16
    const iconName = action === 'send' ? 'arrow-up-right' : action === 'withdraw' ? 'arrow-up' : action === 'add' ? 'arrow-down' : 'arrow-down-left'
    return (
        <Button
            variant={variant}
            shadowSize="4"
            size={size}
            className={`flex w-auto cursor-pointer items-center justify-center rounded-full ${size === 'large' ? 'h-12 gap-x-2 px-6' : 'h-10 gap-x-1 px-5'}`}
        >
            <Icon name={iconName as 'arrow-up-right' | 'arrow-up' | 'arrow-down' | 'arrow-down-left'} size={iconSize} fill="currentColor" />
            <span className={`whitespace-nowrap font-semibold ${size === 'small' ? 'text-sm' : 'text-base'}`}>{label}</span>
        </Button>
    )
}

function HomeActionButtonPreview() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <VBox label="large — Send / Request (purple)">
                <div style={{ display: 'flex', gap: 16 }}>
                    <HomeActionButton label="Send" action="send" variant="purple" size="large" />
                    <HomeActionButton label="Request" action="request" variant="purple" size="large" />
                </div>
            </VBox>
            <VBox label="small — Add / Withdraw (primary-soft)">
                <div style={{ display: 'flex', gap: 16 }}>
                    <HomeActionButton label="Add" action="add" size="small" />
                    <HomeActionButton label="Withdraw" action="withdraw" size="small" />
                </div>
            </VBox>
            <VBox label="all four together (home layout)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <HomeActionButton label="Add" action="add" size="small" />
                        <HomeActionButton label="Withdraw" action="withdraw" size="small" />
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <HomeActionButton label="Send" action="send" variant="purple" size="large" />
                        <HomeActionButton label="Request" action="request" variant="purple" size="large" />
                    </div>
                </div>
            </VBox>
        </div>
    )
}
