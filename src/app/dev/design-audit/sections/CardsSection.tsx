'use client'

import React from 'react'
import { Card as BruddleCard } from '@/components/0_Bruddle/Card'
import GlobalCard from '@/components/Global/Card'
import InfoCard from '@/components/Global/InfoCard'
import { ActionListCard } from '@/components/ActionListCard'
import PeanutActionCard from '@/components/Global/PeanutActionCard'
import { SuccessViewDetailsCard } from '@/components/Global/SuccessViewComponents/SuccessViewDetailsCard'
import { Icon } from '@/components/Global/Icons/Icon'
import { ComponentShell, SectionHeader, KindDivider, Row, VBox } from './_shell'

export function CardsSection({ search }: { search: string }) {
    const q = search.toLowerCase()
    const show = (name: string) => name.toLowerCase().includes(q)

    return (
        <div>
            <SectionHeader
                title="Cards"
                description="All card primitives and composed card components."
            />

            <KindDivider label="Components" />

            {show('card (bruddle)') || show('bruddle') || show('card') ? (
                <ComponentShell
                    name="Card (Bruddle)"
                    importPath="@/components/0_Bruddle/Card"
                    usageCount={25}
                    description="Primitive container with optional drop shadow in primary or secondary direction."
                    kind="component"
                >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' }}>
                        {[
                            { label: 'no shadow', props: {} },
                            { label: 'shadow-4', props: { shadowSize: '4' as const } },
                            { label: 'shadow-primary-8', props: { shadowSize: '8' as const, color: 'primary' as const } },
                            { label: 'shadow-secondary-4', props: { shadowSize: '4' as const, color: 'secondary' as const } },
                        ].map(({ label, props }) => (
                            <VBox key={label} label={label}>
                                <BruddleCard {...props} className="p-4 border border-n-1 text-sm font-medium w-32 text-center">
                                    Card content
                                </BruddleCard>
                            </VBox>
                        ))}
                    </div>
                </ComponentShell>
            ) : null}

            {show('card (global)') || show('global card') || show('card') ? (
                <ComponentShell
                    name="Card (Global)"
                    importPath="@/components/Global/Card"
                    usageCount={66}
                    description="List card with position-aware border radius for stacked groups (single/first/middle/last)."
                    kind="component"
                >
                    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        <div>
                            <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 6 }}>stacked group</span>
                            <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 280 }}>
                                <GlobalCard position="first" className="p-4 text-sm font-medium">First in group</GlobalCard>
                                <GlobalCard position="middle" className="p-4 text-sm font-medium">Middle in group</GlobalCard>
                                <GlobalCard position="middle" className="p-4 text-sm font-medium">Middle in group</GlobalCard>
                                <GlobalCard position="last" className="p-4 text-sm font-medium">Last in group</GlobalCard>
                            </div>
                        </div>
                        <div>
                            <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 6 }}>single</span>
                            <GlobalCard position="single" className="p-4 text-sm font-medium max-w-[280px]">Single card</GlobalCard>
                        </div>
                        <div>
                            <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 6 }}>no border</span>
                            <GlobalCard position="single" border={false} className="p-4 text-sm font-medium bg-grey-3 max-w-[240px]">No border card</GlobalCard>
                        </div>
                    </div>
                </ComponentShell>
            ) : null}

            {show('infocard') || show('info card') ? (
                <ComponentShell
                    name="InfoCard"
                    importPath="@/components/Global/InfoCard"
                    usageCount={20}
                    description="Contextual information card with variant-based color theming."
                    kind="component"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 420 }}>
                        {(['info', 'warning', 'error', 'success', 'default'] as const).map((variant) => (
                            <div key={variant}>
                                <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 6 }}>{variant}</span>
                                <InfoCard
                                    variant={variant}
                                    title={variant.charAt(0).toUpperCase() + variant.slice(1)}
                                    description={
                                        variant === 'info' ? 'Transfers are instant with zero fees.' :
                                        variant === 'warning' ? 'Network fees apply on this chain.' :
                                        variant === 'error' ? 'This transaction could not be completed.' :
                                        variant === 'success' ? 'Funds received in your account.' :
                                        'This feature is in beta.'
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </ComponentShell>
            ) : null}

            {show('actionlistcard') || show('action list') ? (
                <ComponentShell
                    name="ActionListCard"
                    importPath="@/components/ActionListCard"
                    usageCount={28}
                    description="List item card with left icon, title, optional description, and click handler. Default right indicator is a pink circle chevron (Button rounded-full + shadowSize=4). Compare to ProfileMenuItem in Navigation which uses a bare NavigationArrow — two visual patterns for the same 'go forward' concept."
                    kind="component"
                >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
                        <div>
                            <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 6 }}>default right indicator — pink circle chevron</span>
                            <div style={{ display: 'flex', flexDirection: 'column', width: 360 }}>
                                <ActionListCard
                                    title="Your Badges"
                                    description="3 badges earned"
                                    leftIcon={<Icon name="badge" size={20} />}
                                    position="first"
                                    onClick={() => {}}
                                />
                                <ActionListCard
                                    title="Points Balance"
                                    description="1,250 pts"
                                    leftIcon={<Icon name="star" size={20} />}
                                    position="middle"
                                    onClick={() => {}}
                                />
                                <ActionListCard
                                    title="Invite Friends"
                                    description="Earn 500 pts per referral"
                                    leftIcon={<Icon name="invite-heart" size={20} />}
                                    position="last"
                                    onClick={() => {}}
                                    rightContent={<Icon name="external-link" size={16} />}
                                />
                            </div>
                        </div>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>⚠ inconsistency — vs ProfileMenuItem bare arrow</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: 280 }}>
                                <div style={{ padding: '12px 16px', background: '#fff', border: '1px solid #E7E8E9', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 14, fontWeight: 500 }}>ActionListCard</span>
                                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#FF90E8', border: '1px solid #000', boxShadow: '0.12rem 0.12rem 0 #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name="chevron-up" size={14} className="rotate-90" />
                                    </div>
                                </div>
                                <div style={{ padding: '12px 16px', background: '#fff', border: '1px solid #E7E8E9', borderTop: 'none', borderRadius: '0 0 8px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 14, fontWeight: 500 }}>ProfileMenuItem</span>
                                    <Icon name="chevron-up" size={24} className="rotate-90" />
                                </div>
                            </div>
                            <div style={{ marginTop: 8, fontSize: 11, color: '#FF4A4A', maxWidth: 280 }}>Same UX intent, different visual — ActionListCard uses pink circle (Button primitive), ProfileMenuItem uses bare NavigationArrow.</div>
                        </div>
                    </div>
                </ComponentShell>
            ) : null}

            {show('peanutactioncard') || show('peanut action') ? (
                <ComponentShell
                    name="PeanutActionCard"
                    importPath="@/components/Global/PeanutActionCard"
                    usageCount={4}
                    description="Promotional action card for send/request flows with social share hint."
                    kind="component"
                >
                    <Row>
                        <VBox label="send variant"><PeanutActionCard type="send" /></VBox>
                        <VBox label="request variant"><PeanutActionCard type="request" /></VBox>
                    </Row>
                </ComponentShell>
            ) : null}

            {show('successviewdetailscard') || show('success view') ? (
                <ComponentShell
                    name="SuccessViewDetailsCard"
                    importPath="@/components/Global/SuccessViewComponents/SuccessViewDetailsCard"
                    usageCount={6}
                    description="Post-transaction summary card with amount, description, and status badge."
                    kind="component"
                >
                    <div style={{ maxWidth: 360 }}>
                        <SuccessViewDetailsCard
                            title="Payment sent"
                            amountDisplay="$25.00"
                            description="Payment link created and shared"
                            status="completed"
                        />
                    </div>
                </ComponentShell>
            ) : null}
        </div>
    )
}
