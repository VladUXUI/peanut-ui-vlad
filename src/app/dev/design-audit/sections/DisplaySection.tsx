'use client'

import React, { useState } from 'react'
import QRCodeWrapper from '@/components/Global/QRCodeWrapper'
import CopyToClipboard from '@/components/Global/CopyToClipboard'
import MoreInfo from '@/components/Global/MoreInfo'
import { MarqueeWrapper } from '@/components/Global/MarqueeWrapper'
import { AnimateOnView } from '@/components/Global/AnimateOnView'
import { Icon } from '@/components/Global/Icons/Icon'
import { Tooltip } from '@/components/Tooltip'
import { FAQsPanel } from '@/components/Global/FAQs'
import Carousel from '@/components/Global/Carousel'
import { Button } from '@/components/0_Bruddle/Button'
import { Slider } from '@/components/Global/Slider'
import AvatarWithBadge from '@/components/Profile/AvatarWithBadge'
import { ComponentShell, SectionHeader, KindDivider, Row, VBox } from './_shell'

function SliderDemo() {
    const [value, setValue] = useState([75])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
            <VBox label={`current value: ${value[0]}%`}>
                <Slider value={value} onValueChange={setValue} min={0} max={100} />
            </VBox>
            <VBox label="default (100%)">
                <Slider defaultValue={[100]} min={0} max={100} />
            </VBox>
        </div>
    )
}

export function DisplaySection({ search }: { search: string }) {
    const q = search.toLowerCase()
    const show = (name: string) => name.toLowerCase().includes(q)

    return (
        <div>
            <SectionHeader
                title="Display & Actions"
                description="Utility display components, copy actions, overlays, and inline UI patterns."
            />

            <KindDivider label="Components" />

            {show('icon') ? (
                <ComponentShell
                    name="Icon"
                    importPath="@/components/Global/Icons/Icon"
                    usageCount={300}
                    description="Lucide icon wrapper with custom Peanut icons. Use the Icons tab for the full 82-icon catalogue with copy-to-clipboard."
                    kind="component"
                >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        {([
                            'success', 'error', 'alert', 'info', 'pending', 'cancel',
                            'check', 'search', 'copy', 'share', 'chevron-up', 'chevron-down',
                            'arrow-up', 'arrow-down', 'wallet', 'user', 'qr-code', 'undo',
                            'star', 'home', 'history', 'dollar', 'link', 'external-link',
                        ] as const).map((name) => (
                            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                <div style={{ padding: 8, border: '1px solid #E7E8E9', background: '#FAF4F0' }}>
                                    <Icon name={name} size={24} />
                                </div>
                                <span style={{ fontSize: 9, color: '#5F646D', fontFamily: 'monospace' }}>{name}</span>
                            </div>
                        ))}
                    </div>
                </ComponentShell>
            ) : null}

            {show('avatarwithbadge') || show('avatar') ? (
                <ComponentShell
                    name="AvatarWithBadge"
                    importPath="@/components/Profile/AvatarWithBadge"
                    usageCount={45}
                    description="Circular avatar showing user initials, an icon, or an image/logo. Used for contacts, country flags, transaction avatars, and token logos."
                    kind="component"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div>
                            <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 8 }}>Sizes</span>
                            <Row>
                                <VBox label="tiny">
                                    <AvatarWithBadge name="Alice" size="tiny" />
                                </VBox>
                                <VBox label="extra-small">
                                    <AvatarWithBadge name="Alice" size="extra-small" />
                                </VBox>
                                <VBox label="small">
                                    <AvatarWithBadge name="Alice" size="small" />
                                </VBox>
                                <VBox label="medium (default)">
                                    <AvatarWithBadge name="Alice" size="medium" />
                                </VBox>
                                <VBox label="large">
                                    <AvatarWithBadge name="Alice" size="large" />
                                </VBox>
                            </Row>
                        </div>
                        <div>
                            <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 8 }}>Modes</span>
                            <Row>
                                <VBox label="initials (auto-color)">
                                    <AvatarWithBadge name="Bob Smith" size="small" />
                                </VBox>
                                <VBox label="icon">
                                    <AvatarWithBadge icon="wallet" size="small" className="bg-n-1" />
                                </VBox>
                                <VBox label="logo (flag)">
                                    <AvatarWithBadge
                                        logo="https://flagcdn.com/w80/br.png"
                                        name="Brazil"
                                        size="small"
                                        fallback={{ icon: 'globe-lock', bgColor: '#E7E8E9' }}
                                    />
                                </VBox>
                                <VBox label="multiple users">
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        {['Carlos', 'Daniela', 'Eduardo'].map((n) => (
                                            <AvatarWithBadge key={n} name={n} size="extra-small" />
                                        ))}
                                    </div>
                                </VBox>
                            </Row>
                        </div>
                    </div>
                </ComponentShell>
            ) : null}

            {show('qrcode') || show('qr code') ? (
                <ComponentShell
                    name="QRCodeWrapper"
                    importPath="@/components/Global/QRCodeWrapper"
                    usageCount={8}
                    description="QR code with centered logo overlay, loading state and blur effect."
                    kind="component"
                >
                    <Row>
                        <VBox label="default"><QRCodeWrapper url="https://peanut.me/pay/abc123xyz" /></VBox>
                        <VBox label="loading"><QRCodeWrapper url="https://peanut.me/pay/abc123" isLoading /></VBox>
                        <VBox label="blurred"><QRCodeWrapper url="https://peanut.me/pay/abc123" isBlurred /></VBox>
                    </Row>
                </ComponentShell>
            ) : null}

            {show('copytoclipboard') || show('copy') ? (
                <ComponentShell
                    name="CopyToClipboard"
                    importPath="@/components/Global/CopyToClipboard"
                    usageCount={10}
                    description="Copy-to-clipboard button. Renders as icon or button. Shows check state after copy."
                    kind="component"
                >
                    <Row>
                        <VBox label="icon (default)"><CopyToClipboard textToCopy="https://peanut.me/pay/abc" /></VBox>
                        <VBox label="icon (large)"><CopyToClipboard textToCopy="https://peanut.me/pay/abc" iconSize="8" /></VBox>
                        <VBox label="button type"><CopyToClipboard textToCopy="Copy this text" type="button" /></VBox>
                        <VBox label="button + small"><CopyToClipboard textToCopy="Copy" type="button" buttonSize="small" /></VBox>
                    </Row>
                </ComponentShell>
            ) : null}

            {show('moreinfo') || show('more info') ? (
                <ComponentShell
                    name="MoreInfo"
                    importPath="@/components/Global/MoreInfo"
                    usageCount={11}
                    description="Info icon that opens a positioned tooltip with text or rich content."
                    kind="component"
                >
                    <Row>
                        <VBox label="plain text">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span className="text-sm font-medium">Network fee</span>
                                <MoreInfo text="This fee is charged by the blockchain network, not Peanut." />
                            </div>
                        </VBox>
                        <VBox label="rich content">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span className="text-sm font-medium">Slippage</span>
                                <MoreInfo text={<span>Max <strong>0.5%</strong> price movement allowed</span>} />
                            </div>
                        </VBox>
                    </Row>
                </ComponentShell>
            ) : null}

            {show('tooltip') ? (
                <ComponentShell
                    name="Tooltip"
                    importPath="@/components/Tooltip"
                    usageCount={11}
                    description="Portal-based tooltip with position auto-correction. Wraps any trigger element."
                    kind="component"
                >
                    <Row>
                        <VBox label="top (default)">
                            <Tooltip content="This is a tooltip" position="top">
                                <Button variant="stroke" size="small">Hover me</Button>
                            </Tooltip>
                        </VBox>
                        <VBox label="bottom">
                            <Tooltip content="Bottom tooltip" position="bottom">
                                <Button variant="stroke" size="small">Bottom</Button>
                            </Tooltip>
                        </VBox>
                        <VBox label="rich content">
                            <Tooltip content={<span>Fees: <strong>~$0.02</strong></span>} position="top">
                                <span style={{ cursor: 'help', borderBottom: '1px dashed #5F646D', fontSize: 13 }}>Network fee</span>
                            </Tooltip>
                        </VBox>
                    </Row>
                </ComponentShell>
            ) : null}

            {show('marquee') ? (
                <ComponentShell
                    name="MarqueeWrapper"
                    importPath="@/components/Global/MarqueeWrapper"
                    usageCount={5}
                    description="Auto-scrolling banner using react-fast-marquee."
                    kind="component"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <VBox label="left (default)">
                            <MarqueeWrapper backgroundColor="bg-primary-1" className="border border-n-1 py-2">
                                {['Send', 'Receive', 'Pay', 'Claim', 'Split'].map((t) => (
                                    <span key={t} className="mx-6 font-bold text-sm">{t} →</span>
                                ))}
                            </MarqueeWrapper>
                        </VBox>
                        <VBox label="right direction">
                            <MarqueeWrapper backgroundColor="bg-secondary-1" direction="right" className="border border-n-1 py-2">
                                {['🥜', '💸', '⚡', '🌎', '🔗'].map((e, i) => (
                                    <span key={i} className="mx-6 text-lg">{e}</span>
                                ))}
                            </MarqueeWrapper>
                        </VBox>
                    </div>
                </ComponentShell>
            ) : null}

            {show('animateonview') || show('animate') ? (
                <ComponentShell
                    name="AnimateOnView"
                    importPath="@/components/Global/AnimateOnView"
                    usageCount={15}
                    description="IntersectionObserver fade-in animation. Triggers once when element enters the viewport."
                    kind="component"
                >
                    <Row>
                        <VBox label="fade up (default)">
                            <AnimateOnView>
                                <div style={{ background: '#FF90E8', border: '2px solid #000', padding: '8px 16px', fontWeight: 700 }}>Animated element</div>
                            </AnimateOnView>
                        </VBox>
                        <VBox label="fade left">
                            <AnimateOnView x="-20px">
                                <div style={{ background: '#FFC900', border: '2px solid #000', padding: '8px 16px', fontWeight: 700 }}>Slide from left</div>
                            </AnimateOnView>
                        </VBox>
                        <VBox label="with delay">
                            <AnimateOnView delay="0.3s">
                                <div style={{ background: '#98E9AB', border: '2px solid #000', padding: '8px 16px', fontWeight: 700 }}>Delayed 0.3s</div>
                            </AnimateOnView>
                        </VBox>
                    </Row>
                </ComponentShell>
            ) : null}

            {show('faqspanel') || show('faq') ? (
                <ComponentShell
                    name="FAQsPanel"
                    importPath="@/components/Global/FAQs"
                    usageCount={5}
                    description="Accordion FAQ panel with animated expand/collapse and markdown link parsing."
                    kind="component"
                >
                    <div style={{ maxWidth: 480 }}>
                        <FAQsPanel
                            heading="Frequently Asked Questions"
                            questions={[
                                { id: '1', question: 'What is Peanut?', answer: 'Peanut is a payment link protocol — send money to anyone via a link, no wallet needed to receive.' },
                                { id: '2', question: 'Are there fees?', answer: 'Peanut charges zero protocol fees. You may pay gas fees depending on the chain you use.' },
                                { id: '3', question: 'Which chains are supported?', answer: 'We support 20+ EVM chains. Check [peanut.to](https://peanut.to) for the full list.' },
                            ]}
                        />
                    </div>
                </ComponentShell>
            ) : null}

            {show('carousel') ? (
                <ComponentShell
                    name="Carousel"
                    importPath="@/components/Global/Carousel"
                    usageCount={3}
                    description="Embla-carousel wrapper with dot navigation. Each child is a slide."
                    kind="component"
                >
                    <div style={{ maxWidth: 380 }}>
                        <Carousel>
                            {['Send money instantly', 'No wallet needed', 'Split with friends'].map((text, i) => (
                                <div
                                    key={i}
                                    style={{
                                        minWidth: '100%',
                                        background: ['#FF90E8', '#FFC900', '#98E9AB'][i],
                                        border: '2px solid #000',
                                        padding: '32px 24px',
                                        fontWeight: 800,
                                        fontSize: 16,
                                        textAlign: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                    {text}
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </ComponentShell>
            ) : null}

            <KindDivider label="Inline Patterns" />

            {show('iconbubble') || show('icon bubble') ? (
                <ComponentShell
                    name="IconBubble"
                    importPath="Various — no shared component"
                    usageCount={63}
                    description="Circular icon container built inline every time. Pattern: flex h-N w-N items-center justify-center rounded-full bg-COLOR. Highest-frequency inline pattern in the codebase."
                    kind="inline"
                    instanceCount={63}
                    locations={[
                        'src/components/Global/TransactionHistory/index.tsx (×12)',
                        'src/components/Peanut/Send/index.tsx (×8)',
                        'src/components/Peanut/Claim/index.tsx (×6)',
                        'src/components/Home/index.tsx (×5)',
                    ]}
                >
                    <div>
                        <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 8 }}>Current inline pattern</span>
                        <Row>
                            <VBox label="h-10 w-10 rounded-full bg-primary-1">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-1">
                                    <Icon name="arrow-up-right" size={20} />
                                </div>
                            </VBox>
                            <VBox label="h-12 w-12 rounded-full bg-n-1">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-n-1">
                                    <Icon name="wallet" size={22} fill="white" />
                                </div>
                            </VBox>
                            <VBox label="h-8 w-8 rounded-full bg-success-1">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-1">
                                    <Icon name="check" size={16} />
                                </div>
                            </VBox>
                            <VBox label="h-8 w-8 rounded-full bg-error-1">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-error-1">
                                    <Icon name="error" size={16} />
                                </div>
                            </VBox>
                        </Row>
                    </div>
                </ComponentShell>
            ) : null}

            {show('inline svg') || show('svg') ? (
                <ComponentShell
                    name="Inline SVG markup"
                    importPath="Various — raw <svg> elements"
                    usageCount={4}
                    description="Hand-coded SVG markup embedded directly in JSX. 1 is a QR reticule overlay; 3 are X/Twitter brand logos in the TweetCarousel."
                    kind="inline"
                    instanceCount={4}
                    locations={[
                        'src/components/Global/QRCodeWrapper/index.tsx — QR scanner reticule overlay',
                        'src/components/Global/TweetCarousel/index.tsx (×3) — X/Twitter brand SVG',
                    ]}
                >
                    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <VBox label="QR reticule (structural)">
                            <div style={{ fontSize: 11, color: '#5F646D', fontFamily: 'monospace', background: '#FAF4F0', padding: '6px 10px' }}>
                                {'<svg> corner reticule overlay'}
                            </div>
                        </VBox>
                        <VBox label="X/Twitter brand logo">
                            <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </VBox>
                    </div>
                </ComponentShell>
            ) : null}
        </div>
    )
}
