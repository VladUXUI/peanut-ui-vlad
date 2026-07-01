'use client'

import React, { useState } from 'react'
import Title from '@/components/0_Bruddle/Title'
import Divider from '@/components/0_Bruddle/Divider'
import PageContainer from '@/components/0_Bruddle/PageContainer'
import CloudsBackground from '@/components/0_Bruddle/CloudsBackground'
import { ComponentShell, SectionHeader, KindDivider, Row, VBox } from './_shell'

function StaticToastMock({ type, message }: { type: 'success' | 'error' | 'info' | 'warning'; message: string }) {
    const borderColor: Record<string, string> = {
        success: '#88D987',
        error: '#EA8282',
        info: '#90A8ED',
        warning: '#FAE184',
    }
    return (
        <div style={{
            border: `2px solid ${borderColor[type]}`,
            background: '#fff',
            padding: '8px 16px',
            minWidth: 200,
            boxShadow: '0.25rem 0.25rem 0 #000',
        }}>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{message}</p>
            <p style={{ margin: '2px 0 0', fontSize: 10, color: '#5F646D', textTransform: 'uppercase' }}>{type}</p>
        </div>
    )
}

export function TypographyLayoutSection({ search }: { search: string }) {
    const q = search.toLowerCase()
    const show = (name: string) => name.toLowerCase().includes(q)

    return (
        <div>
            <SectionHeader
                title="Typography & Layout"
                description="Display text components, dividers, layout wrappers, and decorative backgrounds."
            />

            <KindDivider label="Components" />

            {show('title') && (
                <ComponentShell
                    name="Title"
                    importPath="@/components/0_Bruddle/Title"
                    usageCount={8}
                    description="Display title using knerd-filled / knerd-outline fonts with offset shadow effect."
                    kind="component"
                >
                    <Row>
                        <VBox label="default">
                            <div style={{ background: '#FF90E8', padding: 16, display: 'inline-block' }}>
                                <Title text="Peanut" className="text-h3" />
                            </div>
                        </VBox>
                        <VBox label="no offset">
                            <div style={{ background: '#FFC900', padding: 16, display: 'inline-block' }}>
                                <Title text="Peanut" offset={false} className="text-h3" />
                            </div>
                        </VBox>
                        <VBox label="large on dark">
                            <div style={{ background: '#000', padding: 16, display: 'inline-block' }}>
                                <Title text="Peanut" className="text-h2" />
                            </div>
                        </VBox>
                    </Row>
                </ComponentShell>
            )}

            {show('divider') && (
                <ComponentShell
                    name="Divider"
                    importPath="@/components/0_Bruddle/Divider"
                    usageCount={11}
                    description="Horizontal rule with optional centered text."
                    kind="component"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <VBox label="plain">
                            <div style={{ width: 300 }}><Divider /></div>
                        </VBox>
                        <VBox label="with text">
                            <div style={{ width: 300 }}><Divider text="or" /></div>
                        </VBox>
                    </div>
                </ComponentShell>
            )}

            {show('pagecontainer') && (
                <ComponentShell
                    name="PageContainer"
                    importPath="@/components/0_Bruddle/PageContainer"
                    usageCount={31}
                    description="Full-width flex wrapper that constrains content to max-w-xl on desktop."
                    kind="component"
                >
                    <Row>
                        <VBox label="alignItems: start">
                            <div style={{ width: 320, background: '#FAF4F0', border: '1px dashed #E7E8E9', height: 80 }}>
                                <PageContainer alignItems="start" className="h-full">
                                    <div style={{ background: '#FF90E8', padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>Content (start)</div>
                                </PageContainer>
                            </div>
                        </VBox>
                        <VBox label="alignItems: center">
                            <div style={{ width: 320, background: '#FAF4F0', border: '1px dashed #E7E8E9', height: 80 }}>
                                <PageContainer alignItems="center" className="h-full">
                                    <div style={{ background: '#FFC900', padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>Content (center)</div>
                                </PageContainer>
                            </div>
                        </VBox>
                    </Row>
                </ComponentShell>
            )}

            {show('toast') && (
                <ComponentShell
                    name="Toast"
                    importPath="@/components/0_Bruddle/Toast"
                    usageCount={22}
                    description="Context-based toast system. Wrap with ToastProvider, trigger via useToast() hook."
                    renderNote="Displayed as static visual mocks — actual toasts are triggered via useToast() hook at runtime"
                    kind="component"
                >
                    <Row>
                        <VBox label="info"><StaticToastMock type="info" message="Link copied to clipboard" /></VBox>
                        <VBox label="success"><StaticToastMock type="success" message="Payment sent!" /></VBox>
                        <VBox label="error"><StaticToastMock type="error" message="Something went wrong" /></VBox>
                        <VBox label="warning"><StaticToastMock type="warning" message="Balance running low" /></VBox>
                    </Row>
                </ComponentShell>
            )}

            {show('clouds') && (
                <ComponentShell
                    name="CloudsBackground"
                    importPath="@/components/0_Bruddle/CloudsBackground"
                    usageCount={3}
                    description="Animated floating cloud SVGs as a decorative background layer."
                    kind="component"
                >
                    <VBox label="default">
                        <div style={{ height: 160, width: '100%', position: 'relative', overflow: 'hidden', background: '#EFE4FF', border: '1px solid #E7E8E9' }}>
                            <CloudsBackground />
                        </div>
                    </VBox>
                </ComponentShell>
            )}
        </div>
    )
}
