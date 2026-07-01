'use client'

import React from 'react'
import Loading from '@/components/Global/Loading'
import PeanutLoading from '@/components/Global/PeanutLoading'
import ErrorAlert from '@/components/Global/ErrorAlert'
import EmptyState from '@/components/Global/EmptyStates/EmptyState'
import ProgressBar from '@/components/Global/ProgressBar'
import RouteExpiryTimer from '@/components/Global/RouteExpiryTimer'
import { ComponentShell, SectionHeader, KindDivider, Row, VBox } from './_shell'

export function FeedbackSection({ search }: { search: string }) {
    const q = search.toLowerCase()
    const show = (name: string) => name.toLowerCase().includes(q)

    const futureExpiry = new Date(Date.now() + 5 * 60 * 1000).toISOString()
    const nearExpiry = new Date(Date.now() + 25 * 1000).toISOString()

    return (
        <div>
            <SectionHeader
                title="Feedback"
                description="Loading states, error messages, empty states, and progress indicators."
            />

            <KindDivider label="Components" />

            {show('loading') ? (
                <ComponentShell
                    name="Loading"
                    importPath="@/components/Global/Loading"
                    usageCount={18}
                    description="Minimal CSS spinner. Size controlled via className."
                    kind="component"
                >
                    <Row>
                        <VBox label="small (default)"><Loading /></VBox>
                        <VBox label="medium"><Loading className="h-6 w-6" /></VBox>
                        <VBox label="large"><Loading className="h-10 w-10" /></VBox>
                        <VBox label="colored"><Loading className="h-6 w-6 text-primary-1" /></VBox>
                    </Row>
                </ComponentShell>
            ) : null}

            {show('peanutloading') || show('peanut loading') ? (
                <ComponentShell
                    name="PeanutLoading"
                    importPath="@/components/Global/PeanutLoading"
                    usageCount={39}
                    description="Branded loading state with spinning peanut logo and optional message."
                    kind="component"
                >
                    <Row>
                        <VBox label="default"><div style={{ width: 180 }}><PeanutLoading /></div></VBox>
                        <VBox label="with message"><div style={{ width: 220 }}><PeanutLoading message="Processing payment…" /></div></VBox>
                    </Row>
                </ComponentShell>
            ) : null}

            {show('erroralert') || show('error alert') ? (
                <ComponentShell
                    name="ErrorAlert"
                    importPath="@/components/Global/ErrorAlert"
                    usageCount={35}
                    description="Inline error text with icon. Uses error token color."
                    kind="component"
                >
                    <Row>
                        <VBox label="default">
                            <div style={{ maxWidth: 300 }}><ErrorAlert description="Could not load your balance. Please try again." /></div>
                        </VBox>
                        <VBox label="short">
                            <ErrorAlert description="Invalid amount" iconSize={12} />
                        </VBox>
                    </Row>
                </ComponentShell>
            ) : null}

            {show('emptystate') || show('empty state') ? (
                <ComponentShell
                    name="EmptyState"
                    importPath="@/components/Global/EmptyStates/EmptyState"
                    usageCount={21}
                    description="Empty state card with icon, title, description, and optional CTA."
                    kind="component"
                >
                    <div style={{ maxWidth: 360 }}>
                        <EmptyState icon="info" title="Nothing here yet" description="Send your first payment to get started." />
                    </div>
                </ComponentShell>
            ) : null}

            {show('progressbar') || show('progress bar') ? (
                <ComponentShell
                    name="ProgressBar"
                    importPath="@/components/Global/ProgressBar"
                    usageCount={7}
                    description="Goal-tracking progress bar with visual markers for goal and progress positions."
                    kind="component"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 420 }}>
                        <VBox label="under goal (40%)"><ProgressBar goal={100} progress={40} isClosed={false} /></VBox>
                        <VBox label="near goal (90%)"><ProgressBar goal={100} progress={90} isClosed={false} /></VBox>
                        <VBox label="over goal"><ProgressBar goal={50} progress={75} isClosed={false} /></VBox>
                        <VBox label="closed"><ProgressBar goal={100} progress={120} isClosed={true} /></VBox>
                    </div>
                </ComponentShell>
            ) : null}

            {show('routeexpirytimer') || show('expiry') ? (
                <ComponentShell
                    name="RouteExpiryTimer"
                    importPath="@/components/Global/RouteExpiryTimer"
                    usageCount={5}
                    description="Countdown timer with progress bar and near-expiry/expired callbacks."
                    kind="component"
                >
                    <Row>
                        <VBox label="5 min remaining">
                            <div style={{ maxWidth: 300 }}><RouteExpiryTimer expiry={futureExpiry} /></div>
                        </VBox>
                        <VBox label="near expiry (~25s)">
                            <div style={{ maxWidth: 300 }}><RouteExpiryTimer expiry={nearExpiry} /></div>
                        </VBox>
                        <VBox label="loading state">
                            <div style={{ maxWidth: 300 }}><RouteExpiryTimer isLoading /></div>
                        </VBox>
                        <VBox label="error state">
                            <div style={{ maxWidth: 300 }}><RouteExpiryTimer error="Payment link expired" /></div>
                        </VBox>
                    </Row>
                </ComponentShell>
            ) : null}

            <KindDivider label="Inline Patterns" />

            {show('progress') || show('inline progress') ? (
                <ComponentShell
                    name="Inline progress bar"
                    importPath="Various — no shared component"
                    usageCount={3}
                    description="Raw div-based progress bars created inline instead of using the ProgressBar component."
                    kind="inline"
                    instanceCount={3}
                    locations={[
                        'src/components/Peanut/Offramp/index.tsx — div w-N bg-primary-1 h-1',
                        'src/components/Global/InvitesGraph/index.tsx — inline style width + background',
                        'src/components/Home/PerkClaimModal.tsx — hardcoded width percentage',
                    ]}
                >
                    <div>
                        <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 8 }}>What it looks like vs what to use</span>
                        <Row>
                            <VBox label="current (inline div)">
                                <div style={{ width: 240, height: 6, background: '#E7E8E9', borderRadius: 3 }}>
                                    <div style={{ width: '65%', height: '100%', background: '#FF90E8', borderRadius: 3 }} />
                                </div>
                            </VBox>
                            <VBox label="should be">
                                <div style={{ width: 240 }}>
                                    <ProgressBar goal={100} progress={65} isClosed={false} />
                                </div>
                            </VBox>
                        </Row>
                    </div>
                </ComponentShell>
            ) : null}

            {show('spinner') || show('loading spinner') || show('inline loading') ? (
                <ComponentShell
                    name="Inline loading spinner"
                    importPath="Various — no shared component"
                    usageCount={3}
                    description="Raw CSS/Tailwind spinner animations created inline instead of using the Loading component."
                    kind="inline"
                    instanceCount={3}
                    locations={[
                        'src/components/Peanut/Send/index.tsx — animate-spin border-t-2',
                        'src/components/Peanut/Claim/index.tsx — animate-spin border-t-2',
                        'src/components/Global/QRCodeWrapper/index.tsx — animate-spin h-8 w-8',
                    ]}
                >
                    <Row>
                        <VBox label="current (inline)">
                            <div
                                style={{
                                    width: 24,
                                    height: 24,
                                    border: '2px solid #E7E8E9',
                                    borderTop: '2px solid #000',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                }}
                            />
                            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        </VBox>
                        <VBox label="should be">
                            <Loading className="h-6 w-6" />
                        </VBox>
                    </Row>
                </ComponentShell>
            ) : null}
        </div>
    )
}
