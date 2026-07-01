'use client'

import React, { useState } from 'react'

// Navigation
import FlowHeader from '@/components/Global/FlowHeader'
import NavHeader from '@/components/Global/NavHeader'
import NavigationArrow from '@/components/Global/NavigationArrow'

// Inputs
import ValidatedInput from '@/components/Global/ValidatedInput'
import CopyField from '@/components/Global/CopyField'
import { SearchInput } from '@/components/SearchInput'
import Select from '@/components/Global/Select'

// Cards
import GlobalCard from '@/components/Global/Card'
import InfoCard from '@/components/Global/InfoCard'
import { ActionListCard } from '@/components/ActionListCard'
import PeanutActionCard from '@/components/Global/PeanutActionCard'
import { SuccessViewDetailsCard } from '@/components/Global/SuccessViewComponents/SuccessViewDetailsCard'

// Feedback
import Loading from '@/components/Global/Loading'
import PeanutLoading from '@/components/Global/PeanutLoading'
import ErrorAlert from '@/components/Global/ErrorAlert'
import EmptyState from '@/components/Global/EmptyStates/EmptyState'
import ProgressBar from '@/components/Global/ProgressBar'
import RouteExpiryTimer from '@/components/Global/RouteExpiryTimer'

// Badges
import StatusBadge from '@/components/Global/Badges/StatusBadge'
import StatusPill from '@/components/Global/StatusPill'

// Overlays
import ActionModal from '@/components/Global/ActionModal'
import Modal from '@/components/Global/Modal'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/Global/Drawer'

// Display
import QRCodeWrapper from '@/components/Global/QRCodeWrapper'
import CopyToClipboard from '@/components/Global/CopyToClipboard'
import MoreInfo from '@/components/Global/MoreInfo'
import { MarqueeWrapper } from '@/components/Global/MarqueeWrapper'
import { AnimateOnView } from '@/components/Global/AnimateOnView'
import { Button } from '@/components/0_Bruddle/Button'
import { Icon } from '@/components/Global/Icons/Icon'
import { Slider } from '@/components/Global/Slider'
import { Tooltip } from '@/components/Tooltip'
import { FAQsPanel } from '@/components/Global/FAQs'
import Carousel from '@/components/Global/Carousel'

type GlobalCategory =
    | 'inputs'
    | 'navigation'
    | 'cards'
    | 'feedback'
    | 'badges'
    | 'overlays'
    | 'display'

export const GLOBAL_CATEGORY_LABELS: Record<GlobalCategory, string> = {
    inputs: 'Inputs',
    navigation: 'Navigation',
    cards: 'Cards',
    feedback: 'Feedback',
    badges: 'Badges',
    overlays: 'Overlays',
    display: 'Display & Actions',
}

// ── Shared layout helpers ──────────────────────────────────────────────────────

function UsageBadge({ count }: { count: number }) {
    const bg = count > 50 ? '#98E9AB' : count > 20 ? '#FFF4CC' : '#E7E8E9'
    return (
        <span style={{ background: bg, border: '1px solid #000', padding: '2px 8px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
            {count} uses
        </span>
    )
}

function VariantLabel({ label }: { label: string }) {
    return (
        <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 6 }}>
            {label}
        </span>
    )
}

function ComponentShell({ name, importPath, usageCount, description, renderNote, children }: {
    name: string; importPath: string; usageCount: number; description?: string; renderNote?: string; children: React.ReactNode
}) {
    return (
        <div style={{ border: '2px solid #000', background: '#fff', marginBottom: 24 }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #E7E8E9', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ minWidth: 0 }}>
                    <span style={{ fontWeight: 800, fontSize: 14 }}>{name}</span>
                    <code style={{ marginLeft: 10, fontSize: 11, color: '#5F646D' }}>{importPath}</code>
                    {description && <p style={{ margin: '4px 0 0', fontSize: 12, color: '#5F646D' }}>{description}</p>}
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

function Row({ children }: { children: React.ReactNode }) {
    return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>{children}</div>
}

function VBox({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <VariantLabel label={label} />
            {children}
        </div>
    )
}

function CannotRenderNote({ reason }: { reason: string }) {
    return (
        <div style={{ padding: '12px 16px', background: '#FAF4F0', border: '1px dashed #E7E8E9', fontSize: 12, color: '#5F646D' }}>
            Cannot render standalone: {reason}
        </div>
    )
}

// ── Inputs ────────────────────────────────────────────────────────────────────

function ValidatedInputDemo() {
    const [value, setValue] = useState('')
    return (
        <ValidatedInput
            value={value}
            placeholder="Enter a username…"
            validate={async (v) => v.length >= 3}
            onUpdate={({ value: v }) => setValue(v)}
            infoText="Min 3 characters"
            className="w-72"
        />
    )
}

function SelectDemo() {
    const items = [
        { id: 'ar', title: 'Argentina' },
        { id: 'br', title: 'Brazil' },
        { id: 'mx', title: 'Mexico' },
        { id: 'co', title: 'Colombia' },
    ]
    const [selected, setSelected] = useState<{ id: string; title: string } | null>(null)
    return (
        <Select
            items={items}
            value={selected}
            onChange={setSelected}
            placeholder="Select country"
            className="w-60"
        />
    )
}

function SearchInputDemo() {
    const [value, setValue] = useState('')
    return (
        <SearchInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClear={() => setValue('')}
            className="w-72"
        />
    )
}

function InputsSection() {
    return (
        <>
            <ComponentShell name="CopyField" importPath="@/components/Global/CopyField" usageCount={14}
                description="Read-only input with a copy-to-clipboard button. Shows check state for 3 seconds after copy.">
                <Row>
                    <VBox label="default (stroke)"><CopyField text="https://peanut.me/pay/abc123xyz" /></VBox>
                    <VBox label="purple variant"><CopyField text="peanut://user/alice" variant="purple" shadowSize="4" /></VBox>
                    <VBox label="disabled"><CopyField text="Feature disabled" disabled /></VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="SearchInput" importPath="@/components/SearchInput" usageCount={9}
                description="Search input with magnifier icon and clear button.">
                <Row>
                    <VBox label="interactive"><SearchInputDemo /></VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="ValidatedInput" importPath="@/components/Global/ValidatedInput" usageCount={12}
                description="Debounced input with async validation. Shows loading, success (green), and error (red) states.">
                <Row>
                    <VBox label="validates after 750ms (min 3 chars)"><ValidatedInputDemo /></VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="Select" importPath="@/components/Global/Select" usageCount={7}
                description="Headless UI Listbox-based dropdown. Portals to document.body.">
                <Row>
                    <VBox label="interactive"><SelectDemo /></VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="AmountInput" importPath="@/components/Global/AmountInput" usageCount={18}
                description="Complex amount input with currency toggle, slider, balance display, and validation."
                renderNote="Requires external state: setPrimaryAmount callback + optional exchange rate context">
                <CannotRenderNote reason="Needs currency conversion context and wallet balance state to render meaningfully." />
            </ComponentShell>

            <ComponentShell name="FileUploadInput" importPath="@/components/Global/FileUploadInput" usageCount={4}
                description="File/attachment input. Currently renders as text input only (file upload code commented out)."
                renderNote="Upload functionality is disabled — renders a basic text input">
                <CannotRenderNote reason="Upload code commented out in current implementation." />
            </ComponentShell>

            <ComponentShell name="GeneralRecipientInput" importPath="@/components/Global/GeneralRecipientInput" usageCount={8}
                description="Recipient lookup input with async ENS/address resolution via API calls."
                renderNote="Wraps ValidatedInput but fires API calls on input change">
                <CannotRenderNote reason="Makes live API calls to resolve addresses/ENS names — needs network and API context." />
            </ComponentShell>
        </>
    )
}

// ── Navigation ────────────────────────────────────────────────────────────────

function NavigationSection() {
    return (
        <>
            <ComponentShell name="FlowHeader" importPath="@/components/Global/FlowHeader" usageCount={12}
                description="Minimal top bar for multi-step flows. Back button + optional right element.">
                <Row>
                    <VBox label="with back">
                        <div style={{ width: 300, border: '1px solid #E7E8E9', padding: 8 }}>
                            <FlowHeader onPrev={() => {}} />
                        </div>
                    </VBox>
                    <VBox label="with right element">
                        <div style={{ width: 300, border: '1px solid #E7E8E9', padding: 8 }}>
                            <FlowHeader onPrev={() => {}} rightElement={<Button variant="stroke" size="small">Skip</Button>} />
                        </div>
                    </VBox>
                    <VBox label="no back">
                        <div style={{ width: 300, border: '1px solid #E7E8E9', padding: 8 }}>
                            <FlowHeader />
                        </div>
                    </VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="NavHeader" importPath="@/components/Global/NavHeader" usageCount={27}
                description="App-level navigation header with back button, title, optional icon and logout button."
                renderNote="Uses useAuth() — renders in logged-out state here">
                <Row>
                    <VBox label="with title + back">
                        <div style={{ width: 340, border: '1px solid #E7E8E9', padding: 8 }}>
                            <NavHeader title="Send money" onPrev={() => {}} />
                        </div>
                    </VBox>
                    <VBox label="with href">
                        <div style={{ width: 340, border: '1px solid #E7E8E9', padding: 8 }}>
                            <NavHeader title="Profile" href="/home" />
                        </div>
                    </VBox>
                    <VBox label="custom icon">
                        <div style={{ width: 340, border: '1px solid #E7E8E9', padding: 8 }}>
                            <NavHeader title="Settings" icon="home" onPrev={() => {}} />
                        </div>
                    </VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="NavigationArrow" importPath="@/components/Global/NavigationArrow" usageCount={6}
                description="Rotated chevron icon used as a back/forward indicator. Pure presentational.">
                <Row>
                    <VBox label="default (24px)"><NavigationArrow /></VBox>
                    <VBox label="large (40px)"><NavigationArrow size={40} /></VBox>
                    <VBox label="small (16px)"><NavigationArrow size={16} /></VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="TopNavbar" importPath="@/components/Global/TopNavbar" usageCount={3}
                description="Desktop-only top navigation bar. Reads the current route to show the page title.">
                <CannotRenderNote reason="Reads usePathname() to determine title — depends on routing context and Redux auth state." />
            </ComponentShell>

            <ComponentShell name="WalletNavigation" importPath="@/components/Global/WalletNavigation" usageCount={4}
                description="Dual-mode nav: desktop sidebar + mobile bottom tab bar. Reads Redux user state and active route.">
                <CannotRenderNote reason="Depends on useUserStore() (Redux), useModalsContext(), and usePathname() — full app nav shell." />
            </ComponentShell>
        </>
    )
}

// ── Cards ─────────────────────────────────────────────────────────────────────

function CardsSection() {
    return (
        <>
            <ComponentShell name="Card (Global)" importPath="@/components/Global/Card" usageCount={66}
                description="List card with position-aware border radius for stacked groups (single/first/middle/last).">
                <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    <div>
                        <VariantLabel label="stacked group" />
                        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 280 }}>
                            <GlobalCard position="first" className="p-4 text-sm font-medium">First in group</GlobalCard>
                            <GlobalCard position="middle" className="p-4 text-sm font-medium">Middle in group</GlobalCard>
                            <GlobalCard position="middle" className="p-4 text-sm font-medium">Middle in group</GlobalCard>
                            <GlobalCard position="last" className="p-4 text-sm font-medium">Last in group</GlobalCard>
                        </div>
                    </div>
                    <div>
                        <VariantLabel label="single" />
                        <GlobalCard position="single" className="p-4 text-sm font-medium max-w-[280px]">
                            Single card
                        </GlobalCard>
                    </div>
                    <div>
                        <VariantLabel label="no border" />
                        <GlobalCard position="single" border={false} className="p-4 text-sm font-medium bg-grey-3 max-w-[240px]">
                            No border card
                        </GlobalCard>
                    </div>
                </div>
            </ComponentShell>

            <ComponentShell name="InfoCard" importPath="@/components/Global/InfoCard" usageCount={20}
                description="Contextual information card with variant-based color theming.">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 420 }}>
                    {(['info', 'warning', 'error', 'success', 'default'] as const).map((variant) => (
                        <div key={variant}>
                            <VariantLabel label={variant} />
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

            <ComponentShell name="ActionListCard" importPath="@/components/ActionListCard" usageCount={28}
                description="List item card with optional left icon, title, description, right content, and click handler.">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 380 }}>
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
            </ComponentShell>

            <ComponentShell name="PeanutActionCard" importPath="@/components/Global/PeanutActionCard" usageCount={4}
                description="Promotional action card for send/request flows with social share hint.">
                <Row>
                    <VBox label="send variant"><PeanutActionCard type="send" /></VBox>
                    <VBox label="request variant"><PeanutActionCard type="request" /></VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="SuccessViewDetailsCard" importPath="@/components/Global/SuccessViewComponents/SuccessViewDetailsCard" usageCount={6}
                description="Post-transaction summary card with amount, description, and status badge.">
                <div style={{ maxWidth: 360 }}>
                    <SuccessViewDetailsCard
                        title="Payment sent"
                        amountDisplay="$25.00"
                        description="Payment link created and shared"
                        status="completed"
                    />
                </div>
            </ComponentShell>
        </>
    )
}

// ── Feedback ──────────────────────────────────────────────────────────────────

function FeedbackSection() {
    const futureExpiry = new Date(Date.now() + 5 * 60 * 1000).toISOString()
    const nearExpiry = new Date(Date.now() + 25 * 1000).toISOString()

    return (
        <>
            <ComponentShell name="Loading" importPath="@/components/Global/Loading" usageCount={18}
                description="Minimal CSS spinner. Size controlled via className.">
                <Row>
                    <VBox label="small (default)"><Loading /></VBox>
                    <VBox label="medium"><Loading className="h-6 w-6" /></VBox>
                    <VBox label="large"><Loading className="h-10 w-10" /></VBox>
                    <VBox label="colored"><Loading className="h-6 w-6 text-primary-1" /></VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="PeanutLoading" importPath="@/components/Global/PeanutLoading" usageCount={39}
                description="Branded loading state with spinning peanut logo and optional message.">
                <Row>
                    <VBox label="default"><div style={{ width: 180 }}><PeanutLoading /></div></VBox>
                    <VBox label="with message"><div style={{ width: 220 }}><PeanutLoading message="Processing payment…" /></div></VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="ErrorAlert" importPath="@/components/Global/ErrorAlert" usageCount={35}
                description="Inline error text with icon. Uses error token color.">
                <Row>
                    <VBox label="default">
                        <div style={{ maxWidth: 300 }}><ErrorAlert description="Could not load your balance. Please try again." /></div>
                    </VBox>
                    <VBox label="short">
                        <ErrorAlert description="Invalid amount" iconSize={12} />
                    </VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="EmptyState" importPath="@/components/Global/EmptyStates/EmptyState" usageCount={21}
                description="Empty state card with icon, title, description, and optional CTA.">
                <div style={{ maxWidth: 360 }}>
                    <EmptyState icon="info" title="Nothing here yet" description="Send your first payment to get started." />
                </div>
            </ComponentShell>

            <ComponentShell name="ProgressBar" importPath="@/components/Global/ProgressBar" usageCount={7}
                description="Goal-tracking progress bar with visual markers for goal and progress positions.">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 420 }}>
                    <div>
                        <VariantLabel label="under goal (40%)" />
                        <ProgressBar goal={100} progress={40} isClosed={false} />
                    </div>
                    <div>
                        <VariantLabel label="near goal (90%)" />
                        <ProgressBar goal={100} progress={90} isClosed={false} />
                    </div>
                    <div>
                        <VariantLabel label="over goal" />
                        <ProgressBar goal={50} progress={75} isClosed={false} />
                    </div>
                    <div>
                        <VariantLabel label="closed" />
                        <ProgressBar goal={100} progress={120} isClosed={true} />
                    </div>
                </div>
            </ComponentShell>

            <ComponentShell name="RouteExpiryTimer" importPath="@/components/Global/RouteExpiryTimer" usageCount={5}
                description="Countdown timer with progress bar and near-expiry/expired callbacks.">
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
        </>
    )
}

// ── Badges ────────────────────────────────────────────────────────────────────

function BadgesSection() {
    return (
        <>
            <ComponentShell name="StatusBadge" importPath="@/components/Global/Badges/StatusBadge" usageCount={13}
                description="Pill badge showing transaction/task status with semantic color coding.">
                <Row>
                    {(['completed', 'pending', 'processing', 'failed', 'cancelled', 'refunded', 'soon'] as const).map((s) => (
                        <VBox key={s} label={s}><StatusBadge status={s} /></VBox>
                    ))}
                    <VBox label="large"><StatusBadge status="completed" size="large" /></VBox>
                    <VBox label="custom text"><StatusBadge status="custom" customText="KYC pending" /></VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="StatusPill" importPath="@/components/Global/StatusPill" usageCount={8}
                description="Compact status pill with icon. Used in transaction history rows.">
                <Row>
                    {(['completed', 'pending', 'processing', 'failed', 'cancelled'] as const).map((s) => (
                        <VBox key={s} label={s}><StatusPill status={s} /></VBox>
                    ))}
                </Row>
            </ComponentShell>
        </>
    )
}

// ── Overlays ──────────────────────────────────────────────────────────────────

function ActionModalDemo() {
    const [visible, setVisible] = useState(false)
    const [variant, setVariant] = useState<'confirm' | 'success' | 'error'>('confirm')
    return (
        <Row>
            {(['confirm', 'success', 'error'] as const).map((v) => (
                <VBox key={v} label={`${v} variant`}>
                    <Button variant="stroke" size="small" onClick={() => { setVariant(v); setVisible(true) }}>
                        Preview {v}
                    </Button>
                </VBox>
            ))}
            <ActionModal
                visible={visible}
                onClose={() => setVisible(false)}
                title={
                    variant === 'confirm' ? 'Cancel this payment?' :
                    variant === 'success' ? 'Payment sent!' :
                    'Transaction failed'
                }
                description={
                    variant === 'confirm' ? 'This action cannot be undone. The link will expire immediately.' :
                    variant === 'success' ? '$25.00 has been sent to @alice' :
                    'We could not process your payment. Please try again.'
                }
                icon={variant === 'confirm' ? 'warning' : variant === 'success' ? 'success' : 'error'}
                ctas={
                    variant === 'confirm'
                        ? [
                            { text: 'Yes, cancel', variant: 'purple', onClick: () => setVisible(false) },
                            { text: 'Keep it', variant: 'stroke', onClick: () => setVisible(false) },
                        ]
                        : [{ text: 'Done', variant: 'purple', onClick: () => setVisible(false) }]
                }
            />
        </Row>
    )
}

function BaseModalDemo() {
    const [visible, setVisible] = useState(false)
    return (
        <Row>
            <VBox label="with custom content">
                <Button variant="stroke" size="small" onClick={() => setVisible(true)}>Preview modal</Button>
            </VBox>
            <Modal visible={visible} onClose={() => setVisible(false)} title="Confirm your details">
                <div className="flex flex-col gap-4 p-4">
                    <p className="text-sm text-grey-1">Please review the details before confirming.</p>
                    <div className="flex flex-col gap-2 border border-n-1 p-4 rounded-sm">
                        <div className="flex justify-between text-sm">
                            <span className="text-grey-1">To</span>
                            <span className="font-bold">@alice</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-grey-1">Amount</span>
                            <span className="font-bold">$25.00</span>
                        </div>
                    </div>
                    <Button variant="purple" onClick={() => setVisible(false)}>Confirm payment</Button>
                </div>
            </Modal>
        </Row>
    )
}

function DrawerDemo() {
    return (
        <Row>
            <VBox label="bottom sheet">
                <Drawer>
                    <DrawerTrigger asChild>
                        <Button variant="stroke" size="small">Open drawer</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Share payment link</DrawerTitle>
                            <DrawerDescription>Send this link to anyone to receive money instantly.</DrawerDescription>
                        </DrawerHeader>
                        <div className="px-4 pb-2">
                            <div className="flex flex-col gap-3">
                                <p className="text-sm text-grey-1">https://peanut.me/pay/abc123</p>
                                <Button variant="purple">Copy link</Button>
                            </div>
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="stroke">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </VBox>
        </Row>
    )
}

function OverlaysSection() {
    return (
        <>
            <ComponentShell name="ActionModal" importPath="@/components/Global/ActionModal" usageCount={32}
                description="Pre-styled modal with icon, title, description, optional checkbox and CTA buttons."
                renderNote="Click a preview button to open the real component">
                <ActionModalDemo />
            </ComponentShell>

            <ComponentShell name="Modal" importPath="@/components/Global/Modal" usageCount={17}
                description="Base modal using Headless UI Dialog. Accepts arbitrary children."
                renderNote="Click to open the real component">
                <BaseModalDemo />
            </ComponentShell>

            <ComponentShell name="Drawer" importPath="@/components/Global/Drawer" usageCount={9}
                description="Vaul-based bottom sheet drawer. Compound component (Drawer, DrawerTrigger, DrawerContent, etc.)"
                renderNote="Click to open the real component">
                <DrawerDemo />
            </ComponentShell>
        </>
    )
}

// ── Display & Actions ─────────────────────────────────────────────────────────

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

function DisplaySection() {
    return (
        <>
            <ComponentShell
                name="ActionButton (home page)"
                importPath="src/app/(mobile-ui)/home/page.tsx — ActionButton + ActionButtonGroup"
                usageCount={4}
                description="Rounded pill buttons for the four primary home actions. Two sizes: large (Send/Request) and small (Add/Withdraw)."
                renderNote="Defined inline in home/page.tsx — recreated here from same Button primitive"
            >
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
            </ComponentShell>

            <ComponentShell name="QRCodeWrapper" importPath="@/components/Global/QRCodeWrapper" usageCount={8}
                description="QR code with centered logo overlay, loading state and blur effect.">
                <Row>
                    <VBox label="default">
                        <QRCodeWrapper url="https://peanut.me/pay/abc123xyz" />
                    </VBox>
                    <VBox label="loading">
                        <QRCodeWrapper url="https://peanut.me/pay/abc123" isLoading />
                    </VBox>
                    <VBox label="blurred">
                        <QRCodeWrapper url="https://peanut.me/pay/abc123" isBlurred />
                    </VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="CopyToClipboard" importPath="@/components/Global/CopyToClipboard" usageCount={10}
                description="Copy-to-clipboard button. Renders as icon or button. Shows check state after copy.">
                <Row>
                    <VBox label="icon (default)"><CopyToClipboard textToCopy="https://peanut.me/pay/abc" /></VBox>
                    <VBox label="icon (large)"><CopyToClipboard textToCopy="https://peanut.me/pay/abc" iconSize="8" /></VBox>
                    <VBox label="button type"><CopyToClipboard textToCopy="Copy this text" type="button" /></VBox>
                    <VBox label="button + small"><CopyToClipboard textToCopy="Copy" type="button" buttonSize="small" /></VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="MoreInfo" importPath="@/components/Global/MoreInfo" usageCount={11}
                description="Info icon that opens a positioned tooltip with text or rich content.">
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

            <ComponentShell name="MarqueeWrapper" importPath="@/components/Global/MarqueeWrapper" usageCount={5}
                description="Auto-scrolling banner using react-fast-marquee.">
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

            <ComponentShell name="AnimateOnView" importPath="@/components/Global/AnimateOnView" usageCount={15}
                description="IntersectionObserver fade-in animation. Triggers once when element enters the viewport.">
                <Row>
                    <VBox label="fade up (default)">
                        <AnimateOnView>
                            <div style={{ background: '#FF90E8', border: '2px solid #000', padding: '8px 16px', fontWeight: 700 }}>
                                Animated element
                            </div>
                        </AnimateOnView>
                    </VBox>
                    <VBox label="fade left">
                        <AnimateOnView x="-20px">
                            <div style={{ background: '#FFC900', border: '2px solid #000', padding: '8px 16px', fontWeight: 700 }}>
                                Slide from left
                            </div>
                        </AnimateOnView>
                    </VBox>
                    <VBox label="with delay">
                        <AnimateOnView delay="0.3s">
                            <div style={{ background: '#98E9AB', border: '2px solid #000', padding: '8px 16px', fontWeight: 700 }}>
                                Delayed 0.3s
                            </div>
                        </AnimateOnView>
                    </VBox>
                </Row>
            </ComponentShell>

            <ComponentShell name="Icon" importPath="@/components/Global/Icons/Icon" usageCount={300}
                description="Lucide icon wrapper with custom Peanut icons. Use the name prop to select any icon. See Icons page for the full catalogue.">
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

            <ComponentShell name="Slider" importPath="@/components/Global/Slider" usageCount={8}
                description="Radix UI slider with magnetic snap points at 25%, 33%, 50%, and 100%.">
                <SliderDemo />
            </ComponentShell>

            <ComponentShell name="Tooltip" importPath="@/components/Tooltip" usageCount={11}
                description="Portal-based tooltip with position auto-correction. Wraps any trigger element.">
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

            <ComponentShell name="FAQsPanel" importPath="@/components/Global/FAQs" usageCount={5}
                description="Accordion FAQ panel with animated expand/collapse and markdown link parsing.">
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

            <ComponentShell name="Carousel" importPath="@/components/Global/Carousel" usageCount={3}
                description="Embla-carousel wrapper with dot navigation. Each child is a slide.">
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
        </>
    )
}

function SliderDemo() {
    const [value, setValue] = useState([75])
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
            <VariantLabel label={`current value: ${value[0]}%`} />
            <Slider value={value} onValueChange={setValue} min={0} max={100} />
            <VariantLabel label="default (100%)" />
            <Slider defaultValue={[100]} min={0} max={100} />
        </div>
    )
}

// ── Root export ───────────────────────────────────────────────────────────────

export function GlobalSection({ category }: { category: string; search: string }) {
    const cat = category as GlobalCategory
    const label = GLOBAL_CATEGORY_LABELS[cat] ?? category

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>{label}</h2>
                <p style={{ fontSize: 13, color: '#5F646D', margin: 0 }}>
                    Global components — composed from primitives or from third-party libraries.
                </p>
            </div>

            {cat === 'inputs' && <InputsSection />}
            {cat === 'navigation' && <NavigationSection />}
            {cat === 'cards' && <CardsSection />}
            {cat === 'feedback' && <FeedbackSection />}
            {cat === 'badges' && <BadgesSection />}
            {cat === 'overlays' && <OverlaysSection />}
            {cat === 'display' && <DisplaySection />}
        </div>
    )
}
