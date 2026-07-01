'use client'

import React, { useState } from 'react'
import ActionModal from '@/components/Global/ActionModal'
import Modal from '@/components/Global/Modal'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/Global/Drawer'
import { Button } from '@/components/0_Bruddle/Button'
import { ComponentShell, SectionHeader, KindDivider, Row, VBox } from './_shell'

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

export function OverlaysSection({ search }: { search: string }) {
    const q = search.toLowerCase()
    const show = (name: string) => name.toLowerCase().includes(q)

    return (
        <div>
            <SectionHeader
                title="Overlays"
                description="Modals, dialogs, and bottom sheet drawers."
            />

            <KindDivider label="Components" />

            {show('actionmodal') || show('action modal') ? (
                <ComponentShell
                    name="ActionModal"
                    importPath="@/components/Global/ActionModal"
                    usageCount={32}
                    description="Pre-styled modal with icon, title, description, optional checkbox and CTA buttons."
                    renderNote="Click a preview button to open the real component"
                    kind="component"
                >
                    <ActionModalDemo />
                </ComponentShell>
            ) : null}

            {show('modal') ? (
                <ComponentShell
                    name="Modal"
                    importPath="@/components/Global/Modal"
                    usageCount={17}
                    description="Base modal using Headless UI Dialog. Accepts arbitrary children."
                    renderNote="Click to open the real component"
                    kind="component"
                >
                    <BaseModalDemo />
                </ComponentShell>
            ) : null}

            {show('drawer') ? (
                <ComponentShell
                    name="Drawer"
                    importPath="@/components/Global/Drawer"
                    usageCount={9}
                    description="Vaul-based bottom sheet drawer. Compound component (Drawer, DrawerTrigger, DrawerContent, etc.)"
                    renderNote="Click to open the real component"
                    kind="component"
                >
                    <DrawerDemo />
                </ComponentShell>
            ) : null}
        </div>
    )
}
