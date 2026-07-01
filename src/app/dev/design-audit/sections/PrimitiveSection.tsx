'use client'

import React, { useState } from 'react'
import { Button } from '@/components/0_Bruddle/Button'
import BaseInput from '@/components/0_Bruddle/BaseInput'
import { Card as BruddleCard } from '@/components/0_Bruddle/Card'
import Checkbox from '@/components/0_Bruddle/Checkbox'
import Divider from '@/components/0_Bruddle/Divider'
import Title from '@/components/0_Bruddle/Title'
import BaseSelect from '@/components/0_Bruddle/BaseSelect'
import PageContainer from '@/components/0_Bruddle/PageContainer'
import CloudsBackground from '@/components/0_Bruddle/CloudsBackground'
import { COMPONENT_REGISTRY } from '../data/componentRegistry'

function UsageBadge({ count }: { count: number }) {
    const bg = count > 50 ? '#98E9AB' : count > 20 ? '#FFF4CC' : '#E7E8E9'
    return (
        <span
            style={{
                background: bg,
                border: '1px solid #000',
                padding: '2px 8px',
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
            }}
        >
            {count} uses
        </span>
    )
}

function VariantLabel({ label }: { label: string }) {
    return (
        <span
            style={{
                fontSize: 10,
                color: '#5F646D',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
                display: 'block',
                marginBottom: 6,
            }}
        >
            {label}
        </span>
    )
}

function ComponentShell({ name, importPath, usageCount, description, renderNote, children }: {
    name: string
    importPath: string
    usageCount: number
    description?: string
    renderNote?: string
    children: React.ReactNode
}) {
    return (
        <div style={{ border: '2px solid #000', background: '#fff', marginBottom: 24 }}>
            <div
                style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #E7E8E9',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 12,
                }}
            >
                <div style={{ minWidth: 0 }}>
                    <span style={{ fontWeight: 800, fontSize: 14 }}>{name}</span>
                    <code style={{ marginLeft: 10, fontSize: 11, color: '#5F646D' }}>{importPath}</code>
                    {description && (
                        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#5F646D' }}>{description}</p>
                    )}
                </div>
                <UsageBadge count={usageCount} />
            </div>
            {renderNote && (
                <div style={{ padding: '6px 16px', background: '#FFF4CC', fontSize: 11, borderBottom: '1px solid #E7E8E9' }}>
                    ⚠ {renderNote}
                </div>
            )}
            <div style={{ padding: 16 }}>{children}</div>
        </div>
    )
}

function VariantGrid({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
            {children}
        </div>
    )
}

function VariantBox({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 80 }}>
            <VariantLabel label={label} />
            {children}
        </div>
    )
}

// Static toast mock — avoids needing ToastProvider context
function StaticToastMock({ type, message }: { type: 'success' | 'error' | 'info' | 'warning'; message: string }) {
    const borderColor: Record<string, string> = {
        success: '#88D987',
        error: '#EA8282',
        info: '#90A8ED',
        warning: '#FAE184',
    }
    return (
        <div
            style={{
                border: `2px solid ${borderColor[type]}`,
                background: '#fff',
                padding: '8px 16px',
                minWidth: 200,
                boxShadow: '0.25rem 0.25rem 0 #000',
            }}
        >
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{message}</p>
            <p style={{ margin: '2px 0 0', fontSize: 10, color: '#5F646D', textTransform: 'uppercase' }}>{type}</p>
        </div>
    )
}

function CheckboxDemo({ label, initialValue }: { label: string; initialValue: boolean }) {
    const [val, setVal] = useState(initialValue)
    return (
        <Checkbox
            value={val}
            label={label}
            onChange={(e) => setVal(e.target.checked)}
        />
    )
}

export function PrimitiveSection({ search }: { search: string }) {
    const entries = COMPONENT_REGISTRY.filter(
        (e) => e.group === 'primitive' && e.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Primitives (0_Bruddle)</h2>
                <p style={{ fontSize: 13, color: '#5F646D', margin: 0 }}>
                    10 foundational components that everything else is built on.
                    {search && ` Showing results for "${search}".`}
                </p>
            </div>

            {/* Button */}
            {entries.find((e) => e.name === 'Button') && (
                <ComponentShell
                    name="Button"
                    importPath="@/components/0_Bruddle/Button"
                    usageCount={157}
                    description="Primary interaction component with variant, size, shadow, loading, icon, and long-press support."
                >
                    <VariantGrid>
                        <VariantBox label="purple"><Button variant="purple">Send money</Button></VariantBox>
                        <VariantBox label="purple + shadow-4"><Button variant="purple" shadowSize="4">Send money</Button></VariantBox>
                        <VariantBox label="stroke"><Button variant="stroke">Cancel</Button></VariantBox>
                        <VariantBox label="primary-soft"><Button variant="primary-soft">Soft action</Button></VariantBox>
                        <VariantBox label="dark"><Button variant="dark">Dark CTA</Button></VariantBox>
                        <VariantBox label="transparent-dark"><Button variant="transparent-dark">Link</Button></VariantBox>
                        <VariantBox label="transparent-light" ><div style={{ background: '#000', padding: 8 }}><Button variant="transparent-light">Light link</Button></div></VariantBox>
                        <VariantBox label="small"><Button variant="purple" size="small">Small</Button></VariantBox>
                        <VariantBox label="loading"><Button variant="purple" loading>Loading…</Button></VariantBox>
                        <VariantBox label="disabled"><Button variant="purple" disabled>Disabled</Button></VariantBox>
                    </VariantGrid>
                </ComponentShell>
            )}

            {/* BaseInput */}
            {entries.find((e) => e.name === 'BaseInput') && (
                <ComponentShell
                    name="BaseInput"
                    importPath="@/components/0_Bruddle/BaseInput"
                    usageCount={14}
                    description="Base text input with size variants (sm/md/lg) and optional right-slot content."
                >
                    <VariantGrid>
                        <VariantBox label="sm"><BaseInput variant="sm" placeholder="Small input" className="w-48" /></VariantBox>
                        <VariantBox label="md (default)"><BaseInput placeholder="Enter amount…" className="w-48" /></VariantBox>
                        <VariantBox label="lg"><BaseInput variant="lg" placeholder="Large input" className="w-48" /></VariantBox>
                        <VariantBox label="with right content">
                            <BaseInput
                                placeholder="0.00"
                                className="w-48"
                                rightContent={<span className="text-sm font-bold text-grey-1 pr-2">USD</span>}
                            />
                        </VariantBox>
                    </VariantGrid>
                </ComponentShell>
            )}

            {/* Card (Bruddle) */}
            {entries.find((e) => e.name === 'Card (Bruddle)') && (
                <ComponentShell
                    name="Card (Bruddle)"
                    importPath="@/components/0_Bruddle/Card"
                    usageCount={25}
                    description="Primitive container with optional drop shadow in primary or secondary direction."
                >
                    <VariantGrid>
                        {[
                            { label: 'no shadow', props: {} },
                            { label: 'shadow-4', props: { shadowSize: '4' as const } },
                            { label: 'shadow-primary-8', props: { shadowSize: '8' as const, color: 'primary' as const } },
                            { label: 'shadow-secondary-4', props: { shadowSize: '4' as const, color: 'secondary' as const } },
                        ].map(({ label, props }) => (
                            <VariantBox key={label} label={label}>
                                <BruddleCard {...props} className="p-4 border border-n-1 text-sm font-medium w-32 text-center">
                                    Card content
                                </BruddleCard>
                            </VariantBox>
                        ))}
                    </VariantGrid>
                </ComponentShell>
            )}

            {/* Checkbox */}
            {entries.find((e) => e.name === 'Checkbox') && (
                <ComponentShell
                    name="Checkbox"
                    importPath="@/components/0_Bruddle/Checkbox"
                    usageCount={7}
                    description="Custom styled checkbox with optional label. Interactive below."
                >
                    <VariantGrid>
                        <VariantBox label="unchecked">
                            <CheckboxDemo label="I agree to terms" initialValue={false} />
                        </VariantBox>
                        <VariantBox label="checked">
                            <CheckboxDemo label="Already checked" initialValue={true} />
                        </VariantBox>
                        <VariantBox label="no label">
                            <CheckboxDemo label="" initialValue={false} />
                        </VariantBox>
                    </VariantGrid>
                </ComponentShell>
            )}

            {/* Divider */}
            {entries.find((e) => e.name === 'Divider') && (
                <ComponentShell
                    name="Divider"
                    importPath="@/components/0_Bruddle/Divider"
                    usageCount={11}
                    description="Horizontal rule with optional centered text."
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <div>
                            <VariantLabel label="plain" />
                            <div style={{ width: 300 }}><Divider /></div>
                        </div>
                        <div>
                            <VariantLabel label="with text" />
                            <div style={{ width: 300 }}><Divider text="or" /></div>
                        </div>
                    </div>
                </ComponentShell>
            )}

            {/* Title */}
            {entries.find((e) => e.name === 'Title') && (
                <ComponentShell
                    name="Title"
                    importPath="@/components/0_Bruddle/Title"
                    usageCount={8}
                    description="Display title using knerd-filled / knerd-outline fonts with offset shadow effect."
                >
                    <VariantGrid>
                        <VariantBox label="default">
                            <div style={{ background: '#FF90E8', padding: 16, display: 'inline-block' }}>
                                <Title text="Peanut" className="text-h3" />
                            </div>
                        </VariantBox>
                        <VariantBox label="no offset">
                            <div style={{ background: '#FFC900', padding: 16, display: 'inline-block' }}>
                                <Title text="Peanut" offset={false} className="text-h3" />
                            </div>
                        </VariantBox>
                        <VariantBox label="large on dark">
                            <div style={{ background: '#000', padding: 16, display: 'inline-block' }}>
                                <Title text="Peanut" className="text-h2" />
                            </div>
                        </VariantBox>
                    </VariantGrid>
                </ComponentShell>
            )}

            {/* BaseSelect */}
            {entries.find((e) => e.name === 'BaseSelect') && (
                <ComponentShell
                    name="BaseSelect"
                    importPath="@/components/0_Bruddle/BaseSelect"
                    usageCount={5}
                    description="Radix UI select dropdown with custom styling."
                >
                    <VariantGrid>
                        <VariantBox label="default">
                            <BaseSelect
                                options={[
                                    { label: 'Argentina', value: 'AR' },
                                    { label: 'Brazil', value: 'BR' },
                                    { label: 'Mexico', value: 'MX' },
                                    { label: 'Colombia', value: 'CO' },
                                ]}
                                placeholder="Select country"
                            />
                        </VariantBox>
                        <VariantBox label="disabled">
                            <BaseSelect
                                options={[{ label: 'Argentina', value: 'AR' }]}
                                placeholder="Disabled"
                                disabled
                            />
                        </VariantBox>
                    </VariantGrid>
                </ComponentShell>
            )}

            {/* PageContainer */}
            {entries.find((e) => e.name === 'PageContainer') && (
                <ComponentShell
                    name="PageContainer"
                    importPath="@/components/0_Bruddle/PageContainer"
                    usageCount={31}
                    description="Full-width flex wrapper that constrains content to max-w-xl on desktop."
                >
                    <VariantGrid>
                        <VariantBox label="alignItems: start">
                            <div style={{ width: '100%', background: '#FAF4F0', border: '1px dashed #E7E8E9', height: 80 }}>
                                <PageContainer alignItems="start" className="h-full">
                                    <div style={{ background: '#FF90E8', padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
                                        Content (start)
                                    </div>
                                </PageContainer>
                            </div>
                        </VariantBox>
                        <VariantBox label="alignItems: center">
                            <div style={{ width: '100%', background: '#FAF4F0', border: '1px dashed #E7E8E9', height: 80 }}>
                                <PageContainer alignItems="center" className="h-full">
                                    <div style={{ background: '#FFC900', padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>
                                        Content (center)
                                    </div>
                                </PageContainer>
                            </div>
                        </VariantBox>
                    </VariantGrid>
                </ComponentShell>
            )}

            {/* Toast (static mock) */}
            {entries.find((e) => e.name === 'Toast') && (
                <ComponentShell
                    name="Toast"
                    importPath="@/components/0_Bruddle/Toast"
                    usageCount={22}
                    description="Context-based toast system. In the app: wrap with ToastProvider, trigger via useToast() hook."
                    renderNote="Displayed as static visual mocks — actual toasts are triggered via useToast() hook at runtime"
                >
                    <VariantGrid>
                        <VariantBox label="info"><StaticToastMock type="info" message="Link copied to clipboard" /></VariantBox>
                        <VariantBox label="success"><StaticToastMock type="success" message="Payment sent!" /></VariantBox>
                        <VariantBox label="error"><StaticToastMock type="error" message="Something went wrong" /></VariantBox>
                        <VariantBox label="warning"><StaticToastMock type="warning" message="Balance running low" /></VariantBox>
                    </VariantGrid>
                </ComponentShell>
            )}

            {/* CloudsBackground */}
            {entries.find((e) => e.name === 'CloudsBackground') && (
                <ComponentShell
                    name="CloudsBackground"
                    importPath="@/components/0_Bruddle/CloudsBackground"
                    usageCount={3}
                    description="Animated floating cloud SVGs as a decorative background layer."
                >
                    <VariantBox label="default">
                        <div style={{ height: 160, width: '100%', position: 'relative', overflow: 'hidden', background: '#EFE4FF', border: '1px solid #E7E8E9' }}>
                            <CloudsBackground />
                        </div>
                    </VariantBox>
                </ComponentShell>
            )}

            {entries.length === 0 && (
                <div style={{ textAlign: 'center', padding: 40, color: '#9CA3AF', fontSize: 13 }}>
                    No components match &ldquo;{search}&rdquo;
                </div>
            )}
        </div>
    )
}
