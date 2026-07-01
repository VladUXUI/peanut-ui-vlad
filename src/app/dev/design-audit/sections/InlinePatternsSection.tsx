'use client'

import React, { useState } from 'react'
import { Icon, type IconName } from '@/components/Global/Icons/Icon'
import { Button } from '@/components/0_Bruddle/Button'

// ── Types ─────────────────────────────────────────────────────────────────────

type PatternSeverity = 'critical' | 'warn' | 'info'

interface InlineInstance {
    file: string
    line: number
    snippet: string
}

interface InlinePattern {
    id: string
    title: string
    category: 'component' | 'element' | 'layout'
    severity: PatternSeverity
    instanceCount: number
    description: string
    whatItIs: string
    whatItShouldBe: string
    instances: InlineInstance[]
}

// ── Preview helpers ───────────────────────────────────────────────────────────

// Mirror of tailwind.config.js → theme.extend.colors. Kept in sync by hand;
// only the colors actually seen in inline-bubble snippets need to be present.
const TAILWIND_COLORS: Record<string, Record<string, string>> = {
    primary: { '1': '#FF90E8', '2': '#CC73BA', '3': '#EFE4FF', '4': '#BA8BFF' },
    secondary: { '1': '#FFC900', '2': '#E99898', '3': '#90A8ED', '4': '#FFF4CC', '5': '#FBEAEA', '6': '#E9EEFB', '7': '#5883FF', '8': '#D4B6FF', '9': '#D6E1FF' },
    grey: { '1': '#5F646D', '2': '#E7E8E9', '3': '#FAF4F0', '4': '#EFEFF0' },
    success: { '1': '#16B413', '2': '#C7F9C6', '3': '#29CC6A', '4': '#1C6A50', '5': '#88D987', '6': '#ECFFE9', '7': '#4B8A17' },
    error: { '1': '#FFD8D8', '2': '#EA8282', '3': '#FF4A4A', '4': '#FC5555', '5': '#FF3B30', '6': '#FFE9E9' },
    yellow: { '1': '#FFC900', '2': '#f5ff7c', '3': '#fbfdd8', '4': '#FAE8A4', '5': '#FFD25C', '6': '#885B00', '7': '#FFE6B3', '8': '#FAE184', '9': '#FDE047', '10': '#FEFCE8', '11': '#CA8A04', '400': '#FACC15' },
    red: { '100': '#FEE2E2', '500': '#FF0000' },
    n: { '1': '#000000', '2': '#161616', '3': '#5F646D', '4': '#E7E8E9' },
}

/**
 * Icon contents for each IconBubble instance — keyed by `file:line`.
 * Extracted by reading each instance's source file (the snippet only contains
 * the wrapper div, not the Icon inside). `null` icon means the wrapper holds
 * an <Image> or a dynamic-prop icon, so we render an empty circle for it.
 *
 * To regenerate: run scripts/extract-icon-bubble-meta.ts (or the Python
 * one-liner that walks INLINE_PATTERNS[0].instances and greps the source).
 */
const ICON_BUBBLE_META: Record<string, { icon: IconName | null; iconSize: number | null }> = {
    'src/app/(mobile-ui)/qr-pay/page.tsx:964': { icon: 'alert', iconSize: 24 },
    'src/app/(mobile-ui)/qr-pay/page.tsx:991': { icon: 'alert', iconSize: 24 },
    'src/app/(mobile-ui)/qr-pay/page.tsx:1018': { icon: 'qr-code', iconSize: 24 },
    'src/app/(mobile-ui)/qr-pay/page.tsx:1110': { icon: null, iconSize: null },
    'src/app/(mobile-ui)/qr-pay/page.tsx:1306': { icon: 'arrow-up-right', iconSize: 10 },
    'src/app/(mobile-ui)/qr-pay/page.tsx:1424': { icon: 'clock', iconSize: 24 },
    'src/app/(mobile-ui)/qr/[code]/page.tsx:160': { icon: 'cancel', iconSize: 32 },
    'src/app/(mobile-ui)/withdraw/manteca/page.tsx:505': { icon: 'check', iconSize: 24 },
    'src/app/(mobile-ui)/withdraw/manteca/page.tsx:712': { icon: 'bank', iconSize: 12 },
    'src/app/(mobile-ui)/withdraw/manteca/page.tsx:828': { icon: 'bank', iconSize: 12 },
    'src/components/AddMoney/components/MantecaDepositShareDetails.tsx:102': { icon: 'bank', iconSize: 12 },
    'src/components/AddMoney/views/CryptoDeposit.view.tsx:65': { icon: 'alert', iconSize: 20 },
    'src/components/AddMoney/views/RhinoDeposit.view.tsx:64': { icon: 'alert', iconSize: 20 },
    'src/components/Badges/BadgeStatusDrawer.tsx:39': { icon: null, iconSize: null },
    'src/components/Badges/BadgeStatusItem.tsx:38': { icon: null, iconSize: null },
    'src/components/Card/CancelCardModal.tsx:140': { icon: 'alert-filled', iconSize: 20 },
    'src/components/Card/CancelCardModal.tsx:165': { icon: 'alert-filled', iconSize: 20 },
    'src/components/Card/CardGeoScreen.tsx:56': { icon: 'check', iconSize: 16 },
    'src/components/Card/CardGeoScreen.tsx:72': { icon: 'check', iconSize: 16 },
    'src/components/Card/CardGeoScreen.tsx:94': { icon: 'shield', iconSize: 16 },
    'src/components/Card/CardGeoScreen.tsx:112': { icon: 'globe-lock', iconSize: 16 },
    'src/components/Card/CardLimitEditModal.tsx:80': { icon: 'credit-card', iconSize: 20 },
    'src/components/Card/CardPurchaseScreen.tsx:118': { icon: 'wallet', iconSize: 24 },
    'src/components/Card/CardPurchaseScreen.tsx:153': { icon: 'clock', iconSize: 24 },
    'src/components/Card/CardPurchaseScreen.tsx:183': { icon: 'cancel', iconSize: 24 },
    'src/components/Card/CardSuccessScreen.tsx:81': { icon: 'check', iconSize: 24 },
    'src/components/Card/CardSuccessScreen.tsx:93': { icon: 'badge', iconSize: 16 },
    'src/components/Card/CardSuccessScreen.tsx:99': { icon: 'bell', iconSize: 16 },
    'src/components/Card/CardSuccessScreen.tsx:105': { icon: 'gift', iconSize: 16 },
    'src/components/Card/CardSuccessScreen.tsx:111': { icon: 'dollar', iconSize: 16 },
    'src/components/Card/LockCardModal.tsx:119': { icon: 'lock', iconSize: 20 },
    'src/components/Card/LockCardModal.tsx:130': { icon: 'lock', iconSize: 20 },
    'src/components/Card/YourCardScreen.tsx:62': { icon: 'credit-card', iconSize: 20 },
    'src/components/Common/SavedAccountsView.tsx:122': { icon: 'bank', iconSize: 16 },
    'src/components/Common/SavedAccountsView.tsx:126': { icon: 'bank', iconSize: 12 },
    'src/components/Global/BalanceWarningModal/index.tsx:97': { icon: 'alert', iconSize: 24 },
    // EmptyState and ActivationCTAs render dynamic icons (passed as a prop) —
    // show a placeholder so the preview still demonstrates size + color.
    'src/components/Global/EmptyStates/EmptyState.tsx:19': { icon: null, iconSize: 16 },
    'src/components/Global/PeanutActionCard/index.tsx:13': { icon: 'link', iconSize: 16 },
    'src/components/Global/PeanutActionDetailsCard/index.tsx:187': { icon: 'bank', iconSize: 14 },
    'src/components/Global/SuccessViewComponents/SuccessViewDetailsCard.tsx:25': { icon: 'link', iconSize: 24 },
    'src/components/Send/views/SendRouter.view.tsx:146': { icon: 'bank', iconSize: 14 },
    'src/components/Send/views/SendRouter.view.tsx:155': { icon: 'wallet-outline', iconSize: 14 },
    'src/components/Send/views/SendRouter.view.tsx:186': { icon: 'user', iconSize: 14 },
    'src/components/TransactionDetails/TransactionDetailsHeaderCard.tsx:237': { icon: null, iconSize: null },
    'src/features/limits/components/FiatLimitsLockedCard.tsx:20': { icon: 'globe-lock', iconSize: 20 },
    'src/components/Home/ActivationCTAs.tsx:126': { icon: null, iconSize: 24 },
    'src/components/Setup/Views/InstallPWA.tsx:233': { icon: 'mobile-install', iconSize: 24 },
}

/**
 * Parses an IconBubble snippet to recover the rendered size + bg color.
 * Handles `size-N`, `h-N w-N`, and color classes like `bg-primary-1`.
 * Returns null for snippets we can't recover a size from.
 */
function parseIconBubble(snippet: string): { size: number; bg: string } | null {
    let size = 0
    const sizeMatch = snippet.match(/size-(\d+)/)
    if (sizeMatch) {
        size = parseInt(sizeMatch[1], 10) * 4
    } else {
        const hMatch = snippet.match(/h-(\d+)/)
        if (hMatch) size = parseInt(hMatch[1], 10) * 4
    }
    if (!size) return null

    let bg = '#E7E8E9' // grey-2 fallback for snippets without a bg- class
    const bgMatch = snippet.match(/bg-([a-z]+)-(\d+)/)
    if (bgMatch) {
        const family = bgMatch[1]
        const shade = bgMatch[2]
        if (TAILWIND_COLORS[family]?.[shade]) bg = TAILWIND_COLORS[family][shade]
    }
    return { size, bg }
}

// ── Data ──────────────────────────────────────────────────────────────────────

const INLINE_PATTERNS: InlinePattern[] = [
    {
        id: 'icon-bubble',
        title: 'Inline Icon Bubble',
        category: 'component',
        severity: 'critical',
        instanceCount: 63,
        description: 'Circular container wrapping an Icon. Repeated with slight size/color variations in 63 locations.',
        whatItIs: '<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-1">',
        whatItShouldBe: 'Extract to a shared <IconBubble size="md" color="primary" /> component',
        instances: [
            { file: 'src/app/(mobile-ui)/qr-pay/page.tsx', line: 964, snippet: '<div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-3">' },
            { file: 'src/app/(mobile-ui)/qr-pay/page.tsx', line: 991, snippet: '<div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-3">' },
            { file: 'src/app/(mobile-ui)/qr-pay/page.tsx', line: 1018, snippet: '<div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-3">' },
            { file: 'src/app/(mobile-ui)/qr-pay/page.tsx', line: 1110, snippet: '<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-grey-2">' },
            { file: 'src/app/(mobile-ui)/qr-pay/page.tsx', line: 1306, snippet: '<div className="flex flex-shrink-0 items-center justify-center rounded-full bg-grey-2">' },
            { file: 'src/app/(mobile-ui)/qr-pay/page.tsx', line: 1424, snippet: '<div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary-3">' },
            { file: 'src/app/(mobile-ui)/qr/[code]/page.tsx', line: 160, snippet: '<div className="bg-red-100 flex h-16 w-16 items-center justify-center rounded-full">' },
            { file: 'src/app/(mobile-ui)/withdraw/manteca/page.tsx', line: 505, snippet: '<div className="flex h-12 w-12 min-w-12 items-center justify-center rounded-full bg-primary-3">' },
            { file: 'src/app/(mobile-ui)/withdraw/manteca/page.tsx', line: 712, snippet: '<div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-grey-2">' },
            { file: 'src/app/(mobile-ui)/withdraw/manteca/page.tsx', line: 828, snippet: '<div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-grey-2">' },
            { file: 'src/components/AddMoney/components/MantecaDepositShareDetails.tsx', line: 102, snippet: '<div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full">' },
            { file: 'src/components/AddMoney/views/CryptoDeposit.view.tsx', line: 65, snippet: '<div className="flex size-9 items-center justify-center rounded-full bg-primary-3">' },
            { file: 'src/components/AddMoney/views/RhinoDeposit.view.tsx', line: 64, snippet: '<div className="flex size-9 items-center justify-center rounded-full bg-primary-3">' },
            { file: 'src/components/Badges/BadgeStatusDrawer.tsx', line: 39, snippet: '<div className="flex h-12 w-12 items-center justify-center rounded-full">' },
            { file: 'src/components/Badges/BadgeStatusItem.tsx', line: 38, snippet: '<div className={"relative flex h-8 w-8 items-center justify-center rounded-full"}>' },
            { file: 'src/components/Card/CancelCardModal.tsx', line: 140, snippet: '<div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-1">' },
            { file: 'src/components/Card/CancelCardModal.tsx', line: 165, snippet: '<div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-1">' },
            { file: 'src/components/Card/CardGeoScreen.tsx', line: 56, snippet: '<div className="flex size-8 items-center justify-center rounded-full bg-primary-3">' },
            { file: 'src/components/Card/CardGeoScreen.tsx', line: 72, snippet: '<div className="flex size-8 items-center justify-center rounded-full bg-error-6">' },
            { file: 'src/components/Card/CardGeoScreen.tsx', line: 94, snippet: '<div className="flex size-8 items-center justify-center rounded-full bg-grey-2">' },
            { file: 'src/components/Card/CardGeoScreen.tsx', line: 112, snippet: '<div className="flex size-8 items-center justify-center rounded-full bg-grey-2">' },
            { file: 'src/components/Card/CardLimitEditModal.tsx', line: 80, snippet: '<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-1">' },
            { file: 'src/components/Card/CardPurchaseScreen.tsx', line: 118, snippet: '<div className="flex size-16 items-center justify-center rounded-full bg-primary-1">' },
            { file: 'src/components/Card/CardPurchaseScreen.tsx', line: 153, snippet: '<div className="flex size-16 items-center justify-center rounded-full bg-secondary-1">' },
            { file: 'src/components/Card/CardPurchaseScreen.tsx', line: 183, snippet: '<div className="flex size-16 items-center justify-center rounded-full bg-error-1">' },
            { file: 'src/components/Card/CardSuccessScreen.tsx', line: 81, snippet: '<div className="flex h-12 w-12 min-w-12 items-center justify-center rounded-full bg-success-6">' },
            { file: 'src/components/Card/CardSuccessScreen.tsx', line: 93, snippet: '<div className="flex size-8 items-center justify-center rounded-full bg-primary-3">' },
            { file: 'src/components/Card/CardSuccessScreen.tsx', line: 99, snippet: '<div className="flex size-8 items-center justify-center rounded-full bg-grey-2">' },
            { file: 'src/components/Card/CardSuccessScreen.tsx', line: 105, snippet: '<div className="flex size-8 items-center justify-center rounded-full bg-yellow-8">' },
            { file: 'src/components/Card/CardSuccessScreen.tsx', line: 111, snippet: '<div className="flex size-8 items-center justify-center rounded-full bg-error-1">' },
            { file: 'src/components/Card/LockCardModal.tsx', line: 119, snippet: '<div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-1">' },
            { file: 'src/components/Card/LockCardModal.tsx', line: 130, snippet: '<div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-1">' },
            { file: 'src/components/Card/YourCardScreen.tsx', line: 62, snippet: '<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-1">' },
            { file: 'src/components/Common/SavedAccountsView.tsx', line: 122, snippet: '<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-3">' },
            { file: 'src/components/Common/SavedAccountsView.tsx', line: 126, snippet: '<div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full">' },
            { file: 'src/components/Global/BalanceWarningModal/index.tsx', line: 97, snippet: '<div className="flex size-16 items-center justify-center rounded-full bg-yellow-400">' },
            { file: 'src/components/Global/EmptyStates/EmptyState.tsx', line: 19, snippet: '<div className="flex size-8 items-center justify-center rounded-full bg-primary-1">' },
            { file: 'src/components/Global/PeanutActionCard/index.tsx', line: 13, snippet: '<div className="flex size-8 items-center justify-center rounded-full bg-primary-1 font-bold">' },
            { file: 'src/components/Global/PeanutActionDetailsCard/index.tsx', line: 187, snippet: '<div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full">' },
            { file: 'src/components/Global/SuccessViewComponents/SuccessViewDetailsCard.tsx', line: 25, snippet: '<div className="flex h-14 w-14 min-w-14 items-center justify-center rounded-full bg-secondary-7">' },
            { file: 'src/components/Send/views/SendRouter.view.tsx', line: 146, snippet: '<div className="flex size-8 min-w-8 items-center justify-center rounded-full bg-secondary-3">' },
            { file: 'src/components/Send/views/SendRouter.view.tsx', line: 155, snippet: '<div className="flex size-8 min-w-8 items-center justify-center rounded-full bg-error-6">' },
            { file: 'src/components/Send/views/SendRouter.view.tsx', line: 186, snippet: '<div className="flex size-8 min-w-8 items-center justify-center rounded-full bg-secondary-1">' },
            { file: 'src/components/TransactionDetails/TransactionDetailsHeaderCard.tsx', line: 237, snippet: '<div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-3">' },
            { file: 'src/features/limits/components/FiatLimitsLockedCard.tsx', line: 20, snippet: '<div className="flex size-10 items-center justify-center rounded-full bg-primary-1">' },
            { file: 'src/components/Home/ActivationCTAs.tsx', line: 126, snippet: '<div className="flex size-12 items-center justify-center rounded-full {step.iconBg}">' },
            { file: 'src/components/Setup/Views/InstallPWA.tsx', line: 233, snippet: '<div className="flex size-12 items-center justify-center rounded-full bg-primary-1">' },
        ],
    },
    {
        id: 'text-link-button',
        title: 'Raw <button> Text Link',
        category: 'element',
        severity: 'warn',
        instanceCount: 10,
        description: 'Plain <button> elements styled as underlined text links instead of using Button variant="transparent-dark".',
        whatItIs: '<button className="text-sm text-grey-1 underline" onClick={...}>',
        whatItShouldBe: '<Button variant="transparent-dark" size="small" onClick={...}>',
        instances: [
            { file: 'src/components/Home/PerkClaimModal.tsx', line: 273, snippet: '<button className="text-sm text-grey-1 underline" onClick={onDismiss}>' },
            { file: 'src/components/Home/ActivationCTAs.tsx', line: 150, snippet: '<button type="button" onClick={onDismissCard} className="text-sm font-medium text-black underline">' },
            { file: 'src/components/Card/ApplicationStatusScreen.tsx', line: 53, snippet: '<button type="button" onClick={onContactSupport} className="text-black underline">' },
            { file: 'src/components/Card/CardLimitsScreen.tsx', line: 63, snippet: '<button type="button" onClick={() => setIsEditing(true)} className="text-black underline">' },
            { file: 'src/components/Invites/JoinWaitlistPage.tsx', line: 257, snippet: '<button onClick={handleSkipEmail} className="text-sm underline">' },
            { file: 'src/components/Invites/JoinWaitlistPage.tsx', line: 274, snippet: '<button onClick={() => setStep("jail")} className="text-sm underline">' },
            { file: 'src/components/Invites/JoinWaitlistPage.tsx', line: 332, snippet: '<button onClick={handleLogout} className="text-sm underline">' },
            { file: 'src/components/Global/QRScanner/CameraPermissionModal.tsx', line: 85, snippet: '<button onClick={onClose} className="text-sm text-grey-1 underline">' },
            { file: 'src/components/Global/InvitesGraph/index.tsx', line: 2317, snippet: '<button onClick={handleResetView} className="ml-2 font-semibold text-purple-900 underline">' },
            { file: 'src/app/(mobile-ui)/notifications/page.tsx', line: 228, snippet: '<button onClick={() => void loadNextPage()} className="underline">' },
        ],
    },
    {
        id: 'action-button',
        title: 'ActionButton / ActionButtonGroup (home page)',
        category: 'component',
        severity: 'warn',
        instanceCount: 4,
        description: 'Rounded pill action buttons (Send / Request / Add / Withdraw) defined inline in home/page.tsx. Used 4 times within that file but not shareable.',
        whatItIs: 'function ActionButton({ label, action, variant, size }) { ... }  — defined locally in home/page.tsx:382',
        whatItShouldBe: 'Extract to @/components/Home/ActionButton or @/components/Global/ActionButton',
        instances: [
            { file: 'src/app/(mobile-ui)/home/page.tsx', line: 185, snippet: '<ActionButtonWithHref label="Add" action="add" href="/add-money" size="small" />' },
            { file: 'src/app/(mobile-ui)/home/page.tsx', line: 186, snippet: '<ActionButtonWithHref label="Withdraw" action="withdraw" href="/withdraw" size="small" />' },
            { file: 'src/app/(mobile-ui)/home/page.tsx', line: 197, snippet: '<ActionButtonWithHref label="Send" action="send" href="/send" variant="purple" size="large" />' },
            { file: 'src/app/(mobile-ui)/home/page.tsx', line: 198, snippet: '<ActionButtonWithHref label="Request" action="request" href="/request" variant="purple" size="large" />' },
        ],
    },
    {
        id: 'inline-progress-bar',
        title: 'Inline Progress Bar',
        category: 'component',
        severity: 'warn',
        instanceCount: 3,
        description: 'Custom progress bar built with raw divs instead of the <ProgressBar> component.',
        whatItIs: '<div className="relative h-1.5 w-full overflow-hidden rounded-full bg-grey-2"><div className="h-full rounded-full bg-primary-1" style={{ width: `${pct}%` }} /></div>',
        whatItShouldBe: '<ProgressBar goal={total} progress={current} isClosed={false} />',
        instances: [
            { file: 'src/app/(mobile-ui)/rewards/page.tsx', line: 185, snippet: '<div className="relative h-1 flex-1 overflow-hidden rounded-full bg-grey-2">' },
            { file: 'src/features/limits/components/LimitsProgressBar.tsx', line: 24, snippet: '<div className="relative h-1.5 w-full overflow-hidden rounded-full bg-grey-2">' },
            { file: 'src/components/Home/HomeCarouselCTA/CarouselCTA.tsx', line: 81, snippet: '<div className="h-2.5 w-2.5 rounded-full bg-primary-1" /> (dot indicator instead of bar)' },
        ],
    },
    {
        id: 'inline-loading-spinner',
        title: 'Inline Loading Spinner',
        category: 'element',
        severity: 'info',
        instanceCount: 3,
        description: 'animate-spin applied directly to an Icon instead of using the <Loading> component.',
        whatItIs: '<Icon name="pending" size={24} className="animate-spin text-primary-1" />',
        whatItShouldBe: '<Loading className="h-6 w-6 text-primary-1" /> or <PeanutLoading />',
        instances: [
            { file: 'src/app/(mobile-ui)/dev/leaderboard/page.tsx', line: 340, snippet: '<Icon name="pending" size={32} className="animate-spin text-primary-1" />' },
            { file: 'src/components/Global/InvitesGraph/index.tsx', line: 2018, snippet: '<Icon name="pending" size={24} className="animate-spin text-purple-600" />' },
            { file: 'src/components/Global/PeanutLoading/index.tsx', line: 20, snippet: '<div className="animate-spin"> (inside PeanutLoading — this is the source of truth)' },
        ],
    },
    {
        id: 'qr-scanner-raw-button',
        title: 'QRScanner Raw Button',
        category: 'element',
        severity: 'warn',
        instanceCount: 2,
        description: 'QRScanner uses a plain <button> with custom inline styles instead of Button component.',
        whatItIs: '<button onClick={onClose} className="mt-4 rounded bg-white px-4 py-2 text-black">',
        whatItShouldBe: '<Button variant="stroke" onClick={onClose}>',
        instances: [
            { file: 'src/components/Global/QRScanner/index.tsx', line: 125, snippet: '<button onClick={onClose} className="mt-4 rounded bg-white px-4 py-2 text-black">' },
            { file: 'src/components/Global/QRScanner/CameraPermissionModal.tsx', line: 85, snippet: '<button onClick={onClose} className="text-sm text-grey-1 underline">' },
        ],
    },
    {
        id: 'balance-toggle-raw-button',
        title: 'Balance Visibility Toggle',
        category: 'element',
        severity: 'info',
        instanceCount: 1,
        description: 'Plain <button> wrapping an Icon for the balance show/hide toggle on the home page.',
        whatItIs: '<button onClick={onToggleBalanceVisibility}><Icon name="eye" size={24} /></button>',
        whatItShouldBe: '<Button variant="transparent-dark" onClick={onToggleBalanceVisibility}><Icon name="eye" size={24} /></Button>',
        instances: [
            { file: 'src/app/(mobile-ui)/home/page.tsx', line: 358, snippet: '<button onClick={onToggleBalanceVisibility}><Icon name={isBalanceHidden ? "eye-slash" : "eye"} /></button>' },
        ],
    },
    {
        id: 'direct-lucide-import',
        title: 'Direct Lucide Import (bypasses Icon wrapper)',
        category: 'element',
        severity: 'warn',
        instanceCount: 1,
        description: 'Lucide icon imported directly from "lucide-react" instead of using the <Icon> wrapper. Bypasses the VIEWBOX_BOOST, FILL_NONE, and custom-size class that the wrapper applies — may render at incorrect sizes inside buttons.',
        whatItIs: "import { Users } from 'lucide-react'  →  icon={<Users />}",
        whatItShouldBe: '<Icon name="split" size={N} />  (Users maps to the "split" IconName)',
        instances: [
            { file: 'src/features/payments/flows/contribute-pot/components/ContributorsDrawer.tsx', line: 19, snippet: "import { Users } from 'lucide-react'  →  used at line 47: icon={<Users />}" },
        ],
    },
    {
        id: 'asset-image-icon',
        title: 'Asset SVG used as <Image> (Icon equivalent exists)',
        category: 'element',
        severity: 'warn',
        instanceCount: 1,
        description: 'LOGOUT_ICON is a raw SVG asset rendered via next/image. A named equivalent (<Icon name="logout">) already exists in the Icon component — using the asset bypasses sizing conventions and creates two sources of truth.',
        whatItIs: 'import { LOGOUT_ICON } from "@/assets"  →  <Image src={LOGOUT_ICON} width={24} height={24} />',
        whatItShouldBe: '<Icon name="logout" size={24} />',
        instances: [
            { file: 'src/components/Global/LogoutButton/index.tsx', line: 25, snippet: '{isLoggingOut ? <Loading /> : <Image src={LOGOUT_ICON} alt="Logout" width={24} height={24} />}' },
        ],
    },
    {
        id: 'inline-svg',
        title: 'Inline <svg> markup',
        category: 'element',
        severity: 'info',
        instanceCount: 4,
        description: 'Raw <svg> elements written inline in JSX rather than extracted to an Icon or component. Some are legitimate (brand logos with no Lucide equivalent); the QRScanner reticule could be a component.',
        whatItIs: '<svg width="45" height="45" viewBox="0 0 45 45" fill="none">…</svg>',
        whatItShouldBe: 'Brand logos (Twitter/X, Discord): acceptable as-is — no Lucide equivalent. QR reticule: extract to a named component <QRReticule />.',
        instances: [
            { file: 'src/components/Global/QRScanner/index.tsx', line: 46, snippet: '<svg width="45" height="45" viewBox="0 0 45 45" fill="none"> — QR scanner reticule graphic' },
            { file: 'src/components/LandingPage/TweetCarousel.tsx', line: 68, snippet: '<svg viewBox="0 0 24 24" fill="currentColor"> — X/Twitter verified badge (brand icon)' },
            { file: 'src/components/LandingPage/TweetCarousel.tsx', line: 75, snippet: '<svg viewBox="0 0 24 24" fill="currentColor"> — X/Twitter logo (brand icon)' },
            { file: 'src/components/LandingPage/TweetCarousel.tsx', line: 103, snippet: '<svg viewBox="0 0 24 24" fill="currentColor"> — X/Twitter logo large (brand icon)' },
        ],
    },
]

// ── Components ────────────────────────────────────────────────────────────────

const SEVERITY_COLORS: Record<PatternSeverity, string> = {
    critical: '#FF4A4A',
    warn: '#FFC900',
    info: '#90A8ED',
}

const SEVERITY_LABELS: Record<PatternSeverity, string> = {
    critical: 'CRITICAL',
    warn: 'WARN',
    info: 'INFO',
}

const CATEGORY_LABELS = {
    component: 'Component',
    element: 'Element',
    layout: 'Layout',
}

function SummaryStats() {
    const total = INLINE_PATTERNS.reduce((sum, p) => sum + p.instanceCount, 0)
    const critical = INLINE_PATTERNS.filter((p) => p.severity === 'critical').reduce((s, p) => s + p.instanceCount, 0)
    const warn = INLINE_PATTERNS.filter((p) => p.severity === 'warn').reduce((s, p) => s + p.instanceCount, 0)
    const patterns = INLINE_PATTERNS.length

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
            {[
                { label: 'Total inline instances', value: total, bg: '#FF4A4A', text: '#fff' },
                { label: 'Distinct patterns', value: patterns, bg: '#FFC900', text: '#000' },
                { label: 'Critical severity', value: critical, bg: '#FFD8D8', text: '#000' },
                { label: 'Warn severity', value: warn, bg: '#FFF4CC', text: '#000' },
            ].map(({ label, value, bg, text }) => (
                <div key={label} style={{ border: '2px solid #000', background: bg, padding: 16 }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: text }}>{value}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: text, opacity: 0.8, marginTop: 2 }}>{label}</div>
                </div>
            ))}
        </div>
    )
}

function PatternCard({ pattern }: { pattern: InlinePattern }) {
    const [expanded, setExpanded] = useState(false)
    const borderColor = SEVERITY_COLORS[pattern.severity]

    return (
        <div
            style={{
                border: '2px solid #000',
                borderLeft: `5px solid ${borderColor}`,
                background: '#fff',
                marginBottom: 16,
            }}
        >
            {/* Header */}
            <div
                style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 12,
                    cursor: 'pointer',
                }}
                onClick={() => setExpanded((v) => !v)}
            >
                <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 800, fontSize: 14 }}>{pattern.title}</span>
                        <span
                            style={{
                                background: borderColor,
                                color: pattern.severity === 'warn' ? '#000' : '#fff',
                                padding: '1px 6px',
                                fontSize: 9,
                                fontWeight: 800,
                                letterSpacing: '0.05em',
                            }}
                        >
                            {SEVERITY_LABELS[pattern.severity]}
                        </span>
                        <span
                            style={{
                                background: '#E7E8E9',
                                color: '#5F646D',
                                padding: '1px 6px',
                                fontSize: 9,
                                fontWeight: 700,
                                letterSpacing: '0.05em',
                            }}
                        >
                            {CATEGORY_LABELS[pattern.category].toUpperCase()}
                        </span>
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: 12, color: '#5F646D' }}>{pattern.description}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span
                        style={{
                            background: pattern.severity === 'critical' ? '#FF4A4A' : pattern.severity === 'warn' ? '#FFF4CC' : '#E7E8E9',
                            border: '1px solid #000',
                            padding: '2px 8px',
                            fontSize: 11,
                            fontWeight: 700,
                            color: pattern.severity === 'critical' ? '#fff' : '#000',
                        }}
                    >
                        {pattern.instanceCount} instances
                    </span>
                    <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={16} />
                </div>
            </div>

            {/* Collapsed: just the visual preview */}
            {!expanded && (
                <div style={{ padding: '0 16px 12px', display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                    <div style={{ minWidth: 0 }}>
                        <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', display: 'block', marginBottom: 4 }}>Currently written as</span>
                        <code style={{ fontSize: 10, color: '#FF4A4A', background: '#FFF5F5', padding: '3px 8px', border: '1px solid #FFD8D8', display: 'block', wordBreak: 'break-all' }}>
                            {pattern.whatItIs}
                        </code>
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', display: 'block', marginBottom: 4 }}>Should be</span>
                        <code style={{ fontSize: 10, color: '#1C6A50', background: '#ECFFE9', padding: '3px 8px', border: '1px solid #88D987', display: 'block', wordBreak: 'break-all' }}>
                            {pattern.whatItShouldBe}
                        </code>
                    </div>
                </div>
            )}

            {/* Expanded: full instance list */}
            {expanded && (
                <div style={{ borderTop: '1px solid #E7E8E9' }}>
                    {/* Preview render for icon bubble */}
                    {pattern.id === 'icon-bubble' && (
                        <div style={{ padding: '12px 16px', background: '#FAF4F0', borderBottom: '1px solid #E7E8E9' }}>
                            <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', display: 'block', marginBottom: 8 }}>Pattern preview (sizes × colors seen in codebase)</span>
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
                                {[
                                    { size: 32, bg: '#FF90E8', icon: 'link' as const },
                                    { size: 40, bg: '#90A8ED', icon: 'arrow-up' as const },
                                    { size: 48, bg: '#EFE4FF', icon: 'arrow-up-right' as const },
                                    { size: 48, bg: '#FFD8D8', icon: 'alert' as const },
                                    { size: 56, bg: '#FFC900', icon: 'badge' as const },
                                    { size: 64, bg: '#98E9AB', icon: 'check' as const },
                                ].map(({ size, bg, icon }) => (
                                    <div key={`${size}-${bg}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                                        <div style={{ width: size, height: size, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Icon name={icon} size={size * 0.45} />
                                        </div>
                                        <span style={{ fontSize: 8, color: '#9CA3AF' }}>{size}px</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Preview for text-link button */}
                    {pattern.id === 'text-link-button' && (
                        <div style={{ padding: '12px 16px', background: '#FAF4F0', borderBottom: '1px solid #E7E8E9' }}>
                            <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', display: 'block', marginBottom: 8 }}>Pattern preview</span>
                            <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                                <div>
                                    <span style={{ fontSize: 9, color: '#FF4A4A', fontWeight: 700, display: 'block', marginBottom: 4 }}>CURRENT (raw button)</span>
                                    <button style={{ fontSize: 13, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', color: '#5F646D', padding: 0 }}>Skip this step</button>
                                </div>
                                <div>
                                    <span style={{ fontSize: 9, color: '#1C6A50', fontWeight: 700, display: 'block', marginBottom: 4 }}>SHOULD BE (Button component)</span>
                                    <Button variant="transparent-dark" size="small">Skip this step</Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Preview for ActionButton */}
                    {pattern.id === 'action-button' && (
                        <div style={{ padding: '12px 16px', background: '#FAF4F0', borderBottom: '1px solid #E7E8E9' }}>
                            <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', display: 'block', marginBottom: 8 }}>Pattern preview</span>
                            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                <Button variant="purple" shadowSize="4" size="large" className="rounded-full h-12 gap-x-2 px-6">
                                    <Icon name="arrow-up-right" size={18} fill="currentColor" />
                                    <span className="font-semibold">Send</span>
                                </Button>
                                <Button variant="purple" shadowSize="4" size="large" className="rounded-full h-12 gap-x-2 px-6">
                                    <Icon name="arrow-down-left" size={18} fill="currentColor" />
                                    <span className="font-semibold">Request</span>
                                </Button>
                                <Button variant="primary-soft" shadowSize="4" size="small" className="rounded-full h-10 gap-x-1 px-5">
                                    <Icon name="arrow-down" size={16} fill="currentColor" />
                                    <span className="font-semibold text-sm">Add</span>
                                </Button>
                                <Button variant="primary-soft" shadowSize="4" size="small" className="rounded-full h-10 gap-x-1 px-5">
                                    <Icon name="arrow-up" size={16} fill="currentColor" />
                                    <span className="font-semibold text-sm">Withdraw</span>
                                </Button>
                            </div>
                        </div>
                    )}

                    <div style={{ padding: '8px 0' }}>
                        <div style={{ padding: '4px 16px', marginBottom: 4 }}>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', display: 'block', marginBottom: 4 }}>Currently written as</span>
                                    <code style={{ fontSize: 10, color: '#FF4A4A', background: '#FFF5F5', padding: '3px 8px', border: '1px solid #FFD8D8', display: 'block', wordBreak: 'break-all' }}>
                                        {pattern.whatItIs}
                                    </code>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9CA3AF', display: 'block', marginBottom: 4 }}>Should be</span>
                                    <code style={{ fontSize: 10, color: '#1C6A50', background: '#ECFFE9', padding: '3px 8px', border: '1px solid #88D987', display: 'block', wordBreak: 'break-all' }}>
                                        {pattern.whatItShouldBe}
                                    </code>
                                </div>
                            </div>
                        </div>

                        {pattern.instances.map((inst, i) => {
                            const bubble = pattern.id === 'icon-bubble' ? parseIconBubble(inst.snippet) : null
                            const meta = pattern.id === 'icon-bubble' ? ICON_BUBBLE_META[`${inst.file}:${inst.line}`] : null
                            // Fixed-width column so all preview circles align regardless of bubble size
                            const PREVIEW_COL_WIDTH = 84
                            return (
                                <div
                                    key={i}
                                    style={{
                                        padding: '6px 16px',
                                        borderTop: '1px solid #F5F5F5',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                    }}
                                >
                                    {pattern.id === 'icon-bubble' && (
                                        <div
                                            style={{
                                                width: PREVIEW_COL_WIDTH,
                                                flexShrink: 0,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 2,
                                            }}
                                        >
                                            {bubble ? (
                                                <>
                                                    <div
                                                        style={{
                                                            width: bubble.size,
                                                            height: bubble.size,
                                                            borderRadius: '50%',
                                                            background: bubble.bg,
                                                            border: '1px solid rgba(0,0,0,0.08)',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            color: '#000',
                                                        }}
                                                    >
                                                        {meta?.icon ? (
                                                            <Icon name={meta.icon} size={meta.iconSize ?? Math.round(bubble.size * 0.5)} />
                                                        ) : null}
                                                    </div>
                                                    <span style={{ fontSize: 9, color: '#9CA3AF', fontWeight: 600 }}>
                                                        {bubble.size}
                                                        {meta?.iconSize ? ` / ${meta.iconSize}` : ''}
                                                    </span>
                                                </>
                                            ) : (
                                                <span style={{ fontSize: 9, color: '#9CA3AF' }}>—</span>
                                            )}
                                        </div>
                                    )}
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                                        <span style={{ fontSize: 10, fontFamily: 'monospace', color: '#5F646D', fontWeight: 700 }}>
                                            {inst.file}:{inst.line}
                                        </span>
                                        <code style={{ fontSize: 10, color: '#333', background: '#FAF4F0', padding: '2px 6px', wordBreak: 'break-all' }}>
                                            {inst.snippet}
                                        </code>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

// ── Export ────────────────────────────────────────────────────────────────────

export function InlinePatternsSection() {
    const [filter, setFilter] = useState<PatternSeverity | 'all'>('all')

    const filtered = filter === 'all' ? INLINE_PATTERNS : INLINE_PATTERNS.filter((p) => p.severity === filter)

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 4px' }}>Inline Patterns</h2>
                <p style={{ fontSize: 13, color: '#5F646D', margin: 0 }}>
                    UI elements written inline that should be extracted into shared components. Click any pattern to see all file locations.
                </p>
            </div>

            <SummaryStats />

            {/* Filter bar */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {(['all', 'critical', 'warn', 'info'] as const).map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        style={{
                            border: '2px solid #000',
                            padding: '4px 12px',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                            background: filter === s ? '#000' : '#fff',
                            color: filter === s ? '#fff' : '#000',
                        }}
                    >
                        {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                        {s !== 'all' && (
                            <span style={{ marginLeft: 6, opacity: 0.7 }}>
                                ({INLINE_PATTERNS.filter((p) => p.severity === s).length})
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {filtered.map((pattern) => (
                <PatternCard key={pattern.id} pattern={pattern} />
            ))}
        </div>
    )
}
