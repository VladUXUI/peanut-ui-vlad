'use client'

import React, { useState } from 'react'
import BaseInput from '@/components/0_Bruddle/BaseInput'
import BaseSelect from '@/components/0_Bruddle/BaseSelect'
import Checkbox from '@/components/0_Bruddle/Checkbox'
import ValidatedInput from '@/components/Global/ValidatedInput'
import CopyField from '@/components/Global/CopyField'
import { SearchInput } from '@/components/SearchInput'
import TokenSearchInput from '@/components/Global/TokenSelector/Components/SearchInput'
import Select from '@/components/Global/Select'
import { Slider } from '@/components/Global/Slider'
import AmountInput from '@/components/Global/AmountInput'
import PinInput from '@/components/Card/PinInput'
import { ComponentShell, SectionHeader, KindDivider, Row, VBox, CannotRenderNote } from './_shell'

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
    return <Select items={items} value={selected} onChange={setSelected} placeholder="Select country" className="w-60" />
}

function CheckboxDemo({ label, initialValue }: { label: string; initialValue: boolean }) {
    const [val, setVal] = useState(initialValue)
    return <Checkbox value={val} label={label} onChange={(e) => setVal(e.target.checked)} />
}

function AmountInputDemo() {
    const [amount, setAmount] = useState('')
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <VBox label="basic (USD only)">
                <AmountInput setPrimaryAmount={setAmount} className="w-72" />
                <span style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4 }}>value: {amount || '—'}</span>
            </VBox>
            <VBox label="with balance">
                <AmountInput setPrimaryAmount={setAmount} walletBalance="1,234.56" className="w-72" />
            </VBox>
            <VBox label="with currency toggle (USD ↔ ETH)">
                <AmountInput
                    setPrimaryAmount={setAmount}
                    primaryDenomination={{ symbol: '$', price: 1, decimals: 2 }}
                    secondaryDenomination={{ symbol: 'ETH', price: 0.00033, decimals: 6 }}
                    walletBalance="1,234.56"
                    className="w-80"
                />
            </VBox>
            <VBox label="with slider (max $500, $150 already collected)">
                <AmountInput
                    setPrimaryAmount={setAmount}
                    showSlider
                    maxAmount={500}
                    amountCollected={150}
                    walletBalance="1,234.56"
                    className="w-80"
                />
            </VBox>
            <VBox label="disabled">
                <AmountInput setPrimaryAmount={setAmount} disabled initialAmount="42.00" className="w-72" />
            </VBox>
        </div>
    )
}

function TokenSearchInputDemo() {
    const [value, setValue] = useState('')
    return (
        <Row>
            <VBox label="generic SearchInput (onChange: e → void)">
                <SearchInput value={value} onChange={(e) => setValue(e.target.value)} onClear={() => setValue('')} className="w-72" />
            </VBox>
            <VBox label="TokenSelector SearchInput (onChange: string → void)">
                <TokenSearchInput value={value} onChange={setValue} onClear={() => setValue('')} className="w-72" />
            </VBox>
        </Row>
    )
}

function PinInputDemo() {
    const [value, setValue] = useState('')
    return (
        <Row>
            <VBox label="empty">
                <PinInput value="" onChange={() => {}} autoFocus={false} />
            </VBox>
            <VBox label="partially filled">
                <PinInput value="12" onChange={() => {}} autoFocus={false} />
            </VBox>
            <VBox label="complete">
                <PinInput value="1234" onChange={() => {}} autoFocus={false} />
            </VBox>
            <VBox label="interactive (type here)">
                <PinInput value={value} onChange={setValue} autoFocus={false} />
                <span style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4 }}>value: {value || '—'}</span>
            </VBox>
            <VBox label="6-digit">
                <PinInput value="123" onChange={() => {}} length={6} autoFocus={false} />
            </VBox>
            <VBox label="disabled">
                <PinInput value="12" onChange={() => {}} autoFocus={false} disabled />
            </VBox>
        </Row>
    )
}

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

export function InputsSection({ search }: { search: string }) {
    const q = search.toLowerCase()
    const show = (name: string) => name.toLowerCase().includes(q)

    return (
        <div>
            <SectionHeader
                title="Inputs & Controls"
                description="All input primitives, form controls, and selection components."
            />

            <KindDivider label="Components" />

            {show('baseinput') && (
                <ComponentShell
                    name="BaseInput"
                    importPath="@/components/0_Bruddle/BaseInput"
                    usageCount={14}
                    description="Base text input with size variants (sm/md/lg) and optional right-slot content."
                    kind="component"
                >
                    <Row>
                        <VBox label="sm"><BaseInput variant="sm" placeholder="Small input" className="w-48" /></VBox>
                        <VBox label="md (default)"><BaseInput placeholder="Enter amount…" className="w-48" /></VBox>
                        <VBox label="lg"><BaseInput variant="lg" placeholder="Large input" className="w-48" /></VBox>
                        <VBox label="with right content">
                            <BaseInput
                                placeholder="0.00"
                                className="w-48"
                                rightContent={<span className="text-sm font-bold text-grey-1 pr-2">USD</span>}
                            />
                        </VBox>
                    </Row>
                </ComponentShell>
            )}

            {show('baseselect') && (
                <ComponentShell
                    name="BaseSelect"
                    importPath="@/components/0_Bruddle/BaseSelect"
                    usageCount={5}
                    description="Radix UI select dropdown with custom styling."
                    kind="component"
                >
                    <Row>
                        <VBox label="default">
                            <BaseSelect
                                options={[
                                    { label: 'Argentina', value: 'AR' },
                                    { label: 'Brazil', value: 'BR' },
                                    { label: 'Mexico', value: 'MX' },
                                    { label: 'Colombia', value: 'CO' },
                                ]}
                                placeholder="Select country"
                            />
                        </VBox>
                        <VBox label="disabled">
                            <BaseSelect options={[{ label: 'Argentina', value: 'AR' }]} placeholder="Disabled" disabled />
                        </VBox>
                    </Row>
                </ComponentShell>
            )}

            {show('checkbox') && (
                <ComponentShell
                    name="Checkbox"
                    importPath="@/components/0_Bruddle/Checkbox"
                    usageCount={7}
                    description="Custom styled checkbox with optional label. Interactive below."
                    kind="component"
                >
                    <Row>
                        <VBox label="unchecked"><CheckboxDemo label="I agree to terms" initialValue={false} /></VBox>
                        <VBox label="checked"><CheckboxDemo label="Already checked" initialValue={true} /></VBox>
                        <VBox label="no label"><CheckboxDemo label="" initialValue={false} /></VBox>
                    </Row>
                </ComponentShell>
            )}

            {show('slider') && (
                <ComponentShell
                    name="Slider"
                    importPath="@/components/Global/Slider"
                    usageCount={8}
                    description="Radix UI slider with magnetic snap points at 25%, 33%, 50%, and 100%."
                    kind="component"
                >
                    <SliderDemo />
                </ComponentShell>
            )}

            {show('copyfield') && (
                <ComponentShell
                    name="CopyField"
                    importPath="@/components/Global/CopyField"
                    usageCount={14}
                    description="Read-only input with a copy-to-clipboard button. Shows check state for 3 seconds after copy."
                    kind="component"
                >
                    <Row>
                        <VBox label="default (stroke)"><CopyField text="https://peanut.me/pay/abc123xyz" /></VBox>
                        <VBox label="purple variant"><CopyField text="peanut://user/alice" variant="purple" shadowSize="4" /></VBox>
                        <VBox label="disabled"><CopyField text="Feature disabled" disabled /></VBox>
                    </Row>
                </ComponentShell>
            )}

            {(show('searchinput') || show('tokensearch')) && (
                <ComponentShell
                    name="SearchInput (2 variants)"
                    importPath="@/components/SearchInput  |  @/components/Global/TokenSelector/Components/SearchInput"
                    usageCount={11}
                    description="Two separate search input implementations. Generic: onChange receives a ChangeEvent. TokenSelector: onChange receives a string directly."
                    kind="component"
                >
                    <TokenSearchInputDemo />
                </ComponentShell>
            )}

            {show('validatedinput') && (
                <ComponentShell
                    name="ValidatedInput"
                    importPath="@/components/Global/ValidatedInput"
                    usageCount={12}
                    description="Debounced input with async validation. Shows loading, success (green), and error (red) states."
                    kind="component"
                >
                    <Row>
                        <VBox label="validates after 750ms (min 3 chars)"><ValidatedInputDemo /></VBox>
                    </Row>
                </ComponentShell>
            )}

            {show('select') && (
                <ComponentShell
                    name="Select"
                    importPath="@/components/Global/Select"
                    usageCount={7}
                    description="Headless UI Listbox-based dropdown. Portals to document.body."
                    kind="component"
                >
                    <Row>
                        <VBox label="interactive"><SelectDemo /></VBox>
                    </Row>
                </ComponentShell>
            )}

            {show('amountinput') && (
                <ComponentShell
                    name="AmountInput"
                    importPath="@/components/Global/AmountInput"
                    usageCount={18}
                    description="Hero number input for payment flows. 6xl font with currency symbol, optional USD↔token toggle, balance display, and percentage slider. Only setPrimaryAmount is required — all else has defaults."
                    kind="component"
                >
                    <AmountInputDemo />
                </ComponentShell>
            )}

            {show('pininput') && (
                <ComponentShell
                    name="PinInput"
                    importPath="@/components/Card/PinInput"
                    usageCount={1}
                    description="4-dot (or custom-length) PIN entry. A hidden numeric input backs a row of filled/empty dots. Tapping the dots focuses the hidden input to open mobile keyboards."
                    kind="component"
                >
                    <PinInputDemo />
                </ComponentShell>
            )}

            {show('fileuploadinput') && (
                <ComponentShell
                    name="FileUploadInput"
                    importPath="@/components/Global/FileUploadInput"
                    usageCount={4}
                    description="File/attachment input. Currently renders as text input only (file upload code commented out)."
                    renderNote="Upload functionality is disabled — renders a basic text input"
                    kind="component"
                >
                    <CannotRenderNote reason="Upload code commented out in current implementation." />
                </ComponentShell>
            )}

            {show('generalrecipientinput') && (
                <ComponentShell
                    name="GeneralRecipientInput"
                    importPath="@/components/Global/GeneralRecipientInput"
                    usageCount={8}
                    description="Recipient lookup input with async ENS/address resolution via API calls."
                    renderNote="Wraps ValidatedInput but fires API calls on input change"
                    kind="component"
                >
                    <CannotRenderNote reason="Makes live API calls to resolve addresses/ENS names — needs network and API context." />
                </ComponentShell>
            )}

            <KindDivider label="Inline Patterns" />

            {show('toggle') || show('switch') || show('shownametoggle') ? (
                <InlineToggleShell />
            ) : null}
        </div>
    )
}

function InlineToggleShell() {
    const [on, setOn] = useState(false)
    return (
        <ComponentShell
            name="Inline toggle / switch"
            importPath="src/components/Profile/components/ShowNameToggle.tsx — feature-scoped, not exported"
            usageCount={1}
            description="Raw <button> element styled as a toggle switch. No shared Toggle/Switch component exists — this pattern is reinvented each time it's needed."
            kind="inline"
            instanceCount={1}
            locations={[
                'src/components/Profile/components/ShowNameToggle.tsx — "Show my full name" in Profile settings',
            ]}
        >
            <Row>
                <VBox label="current (inline button)">
                    <button
                        onClick={() => setOn(!on)}
                        className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full border border-black transition-colors duration-200 ease-in-out focus:outline-none"
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full transition-all duration-200 ease-in-out ${
                                on ? 'translate-x-6 bg-primary-1' : 'translate-x-1 bg-gray-1'
                            }`}
                        />
                    </button>
                    <span style={{ fontSize: 11, color: '#5F646D', marginTop: 4 }}>Click to toggle</span>
                </VBox>
                <VBox label="in context (Profile setting row)">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', border: '1px solid #E7E8E9', background: '#fff', width: 280 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div className="flex h-5 w-5 items-center justify-center">
                                <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2}>
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <span style={{ fontSize: 14, fontWeight: 500 }}>Show my full name</span>
                        </div>
                        <button
                            onClick={() => setOn(!on)}
                            className="relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full border border-black transition-colors duration-200 ease-in-out focus:outline-none"
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full transition-all duration-200 ease-in-out ${
                                    on ? 'translate-x-6 bg-primary-1' : 'translate-x-1 bg-gray-1'
                                }`}
                            />
                        </button>
                    </div>
                </VBox>
            </Row>
        </ComponentShell>
    )
}
