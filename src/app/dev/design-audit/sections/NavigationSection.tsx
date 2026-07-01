'use client'

import React from 'react'
import FlowHeader from '@/components/Global/FlowHeader'
import NavHeader from '@/components/Global/NavHeader'
import NavigationArrow from '@/components/Global/NavigationArrow'
import ProfileMenuItem from '@/components/Profile/components/ProfileMenuItem'
import { Button } from '@/components/0_Bruddle/Button'
import { ComponentShell, SectionHeader, KindDivider, Row, VBox, CannotRenderNote } from './_shell'

export function NavigationSection({ search }: { search: string }) {
    const q = search.toLowerCase()
    const show = (name: string) => name.toLowerCase().includes(q)

    return (
        <div>
            <SectionHeader
                title="Navigation"
                description="Headers, nav bars, and directional navigation components."
            />

            <KindDivider label="Components" />

            {show('flowheader') || show('flow header') ? (
                <ComponentShell
                    name="FlowHeader"
                    importPath="@/components/Global/FlowHeader"
                    usageCount={12}
                    description="Minimal top bar for multi-step flows. Back button + optional right element."
                    kind="component"
                >
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
            ) : null}

            {show('navheader') || show('nav header') ? (
                <ComponentShell
                    name="NavHeader"
                    importPath="@/components/Global/NavHeader"
                    usageCount={27}
                    description="App-level navigation header with back button, title, optional icon and logout button."
                    renderNote="Uses useAuth() — renders in logged-out state here"
                    kind="component"
                >
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
            ) : null}

            {show('navigationarrow') || show('navigation arrow') ? (
                <ComponentShell
                    name="NavigationArrow"
                    importPath="@/components/Global/NavigationArrow"
                    usageCount={6}
                    description="Rotated chevron icon used as a back/forward indicator. Pure presentational."
                    kind="component"
                >
                    <Row>
                        <VBox label="default (24px)"><NavigationArrow /></VBox>
                        <VBox label="large (40px)"><NavigationArrow size={40} /></VBox>
                        <VBox label="small (16px)"><NavigationArrow size={16} /></VBox>
                    </Row>
                </ComponentShell>
            ) : null}

            {show('topnavbar') || show('top nav') ? (
                <ComponentShell
                    name="TopNavbar"
                    importPath="@/components/Global/TopNavbar"
                    usageCount={3}
                    description="Desktop-only top navigation bar. Reads the current route to show the page title."
                    kind="component"
                >
                    <CannotRenderNote reason="Reads usePathname() to determine title — depends on routing context and Redux auth state." />
                </ComponentShell>
            ) : null}

            {show('walletnavigation') || show('wallet nav') ? (
                <ComponentShell
                    name="WalletNavigation"
                    importPath="@/components/Global/WalletNavigation"
                    usageCount={4}
                    description="Dual-mode nav: desktop sidebar + mobile bottom tab bar. Reads Redux user state and active route."
                    kind="component"
                >
                    <CannotRenderNote reason="Depends on useUserStore() (Redux), useModalsContext(), and usePathname() — full app nav shell." />
                </ComponentShell>
            ) : null}

            {show('profilemenuitem') || show('profile menu') || show('menu item') ? (
                <ComponentShell
                    name="ProfileMenuItem"
                    importPath="@/components/Profile/components/ProfileMenuItem"
                    usageCount={17}
                    description="Settings/profile navigation row with icon, label, and bare NavigationArrow. Used in Profile and Card settings menus. Compare to ActionListCard (in Cards) which uses a pink circle chevron for the same 'go forward' intent — inconsistency worth resolving."
                    kind="component"
                >
                    <div style={{ maxWidth: 360, display: 'flex', flexDirection: 'column' }}>
                        <ProfileMenuItem icon="user" label="Personal details" href="#" position="first" />
                        <ProfileMenuItem
                            icon="globe-lock"
                            label="Regions & Verification"
                            href="#"
                            position="middle"
                            highlight
                        />
                        <ProfileMenuItem icon="meter" label="Payment limits" href="#" position="middle" />
                        <ProfileMenuItem icon="upload-cloud" label="Backup" href="#" position="middle" />
                        <ProfileMenuItem icon="logout" label="Log out" href="#" position="last" />
                    </div>
                    <div style={{ marginTop: 16, maxWidth: 360 }}>
                        <span style={{ fontSize: 10, color: '#5F646D', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: 6 }}>coming soon + tooltip variants</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <ProfileMenuItem icon="bank" label="Bank accounts" href="#" position="first" comingSoon />
                            <ProfileMenuItem
                                icon="info"
                                label="With tooltip"
                                href="#"
                                position="last"
                                showTooltip
                                toolTipText="More info about this setting"
                            />
                        </div>
                    </div>
                </ComponentShell>
            ) : null}
        </div>
    )
}
