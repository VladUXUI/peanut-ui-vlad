'use client'

import React from 'react'
import StatusBadge from '@/components/Global/Badges/StatusBadge'
import StatusPill from '@/components/Global/StatusPill'
import { ComponentShell, SectionHeader, KindDivider, Row, VBox } from './_shell'

export function BadgesSection({ search }: { search: string }) {
    const q = search.toLowerCase()
    const show = (name: string) => name.toLowerCase().includes(q)

    return (
        <div>
            <SectionHeader
                title="Badges"
                description="Status indicators, pills, and badge components."
            />

            <KindDivider label="Components" />

            {show('statusbadge') || show('status badge') ? (
                <ComponentShell
                    name="StatusBadge"
                    importPath="@/components/Global/Badges/StatusBadge"
                    usageCount={13}
                    description="Pill badge showing transaction/task status with semantic color coding."
                    kind="component"
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        <Row>
                            {(['completed', 'pending', 'processing', 'failed', 'cancelled', 'refunded', 'soon'] as const).map((s) => (
                                <VBox key={s} label={s}><StatusBadge status={s} /></VBox>
                            ))}
                        </Row>
                        <Row>
                            <VBox label="large"><StatusBadge status="completed" size="large" /></VBox>
                            <VBox label="custom text"><StatusBadge status="custom" customText="KYC pending" /></VBox>
                        </Row>
                    </div>
                </ComponentShell>
            ) : null}

            {show('statuspill') || show('status pill') ? (
                <ComponentShell
                    name="StatusPill"
                    importPath="@/components/Global/StatusPill"
                    usageCount={8}
                    description="Compact status pill with icon. Used in transaction history rows."
                    kind="component"
                >
                    <Row>
                        {(['completed', 'pending', 'processing', 'failed', 'cancelled'] as const).map((s) => (
                            <VBox key={s} label={s}><StatusPill status={s} /></VBox>
                        ))}
                    </Row>
                </ComponentShell>
            ) : null}
        </div>
    )
}
