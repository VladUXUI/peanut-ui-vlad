export type ColorToken = {
    name: string
    value: string
    group: string
    usageCount: number
    semanticRole?: string
}

export type FontScale = {
    name: string
    size: string
    lineHeight: string
    weight: string
    usageCount: number
}

export type SpacingToken = {
    name: string
    value: string
    remValue: number
}

export type HardcodedInstance = {
    value: string
    file: string
    line: number
    context: string
    category: 'color' | 'font' | 'spacing' | 'radius'
    severity: 'warn' | 'info'
    tokenEquivalent?: string
}

export const COLOR_TOKENS: ColorToken[] = [
    // primary
    { name: 'primary-1', value: '#FF90E8', group: 'primary', usageCount: 145, semanticRole: 'action/primary' },
    { name: 'primary-2', value: '#CC73BA', group: 'primary', usageCount: 5,   semanticRole: 'action/primary-hover' },
    { name: 'primary-3', value: '#EFE4FF', group: 'primary', usageCount: 54,  semanticRole: 'surface/brand-subtle' },
    { name: 'primary-4', value: '#BA8BFF', group: 'primary', usageCount: 18,  semanticRole: 'action/accent' },
    // secondary
    { name: 'secondary-1', value: '#FFC900', group: 'secondary', usageCount: 49,  semanticRole: 'action/secondary' },
    { name: 'secondary-2', value: '#E99898', group: 'secondary', usageCount: 2,   semanticRole: 'feedback/error-muted' },
    { name: 'secondary-3', value: '#90A8ED', group: 'secondary', usageCount: 17,  semanticRole: 'feedback/info' },
    { name: 'secondary-4', value: '#FFF4CC', group: 'secondary', usageCount: 9,   semanticRole: 'surface/warning-subtle' },
    { name: 'secondary-5', value: '#FBEAEA', group: 'secondary', usageCount: 1,   semanticRole: 'surface/error-subtle' },
    { name: 'secondary-6', value: '#E9EEFB', group: 'secondary', usageCount: 3,   semanticRole: 'surface/info-subtle' },
    { name: 'secondary-7', value: '#5883FF', group: 'secondary', usageCount: 9,   semanticRole: 'feedback/info-bold' },
    { name: 'secondary-8', value: '#D4B6FF', group: 'secondary', usageCount: 10,  semanticRole: 'surface/accent-subtle' },
    { name: 'secondary-9', value: '#D6E1FF', group: 'secondary', usageCount: 2,   semanticRole: 'surface/info-faint' },
    // grey
    { name: 'grey-1', value: '#5F646D', group: 'grey', usageCount: 429, semanticRole: 'text/secondary' },
    { name: 'grey-2', value: '#E7E8E9', group: 'grey', usageCount: 29,  semanticRole: 'border/subtle' },
    { name: 'grey-3', value: '#FAF4F0', group: 'grey', usageCount: 4,   semanticRole: 'surface/page' },
    { name: 'grey-4', value: '#EFEFF0', group: 'grey', usageCount: 20,  semanticRole: 'surface/subtle' },
    // n (neutral)
    { name: 'n-1', value: '#000000', group: 'neutral', usageCount: 375, semanticRole: 'text/primary · border/default' },
    { name: 'n-2', value: '#161616', group: 'neutral', usageCount: 20,  semanticRole: 'surface/inverse' },
    { name: 'n-3', value: '#5F646D', group: 'neutral', usageCount: 18,  semanticRole: 'text/secondary ⟵ duplicate of grey-1' },
    { name: 'n-4', value: '#E7E8E9', group: 'neutral', usageCount: 7,   semanticRole: 'border/subtle ⟵ duplicate of grey-2' },
    // error
    { name: 'error',   value: '#B3261E', group: 'error', usageCount: 67, semanticRole: 'feedback/error' },
    { name: 'error-1', value: '#FFD8D8', group: 'error', usageCount: 30, semanticRole: 'surface/error' },
    { name: 'error-2', value: '#EA8282', group: 'error', usageCount: 6,  semanticRole: 'feedback/error-muted' },
    { name: 'error-3', value: '#FF4A4A', group: 'error', usageCount: 1,  semanticRole: 'feedback/error-bold' },
    { name: 'error-4', value: '#FC5555', group: 'error', usageCount: 5,  semanticRole: 'feedback/error-bold' },
    { name: 'error-5', value: '#FF3B30', group: 'error', usageCount: 4,  semanticRole: 'feedback/error-bold' },
    { name: 'error-6', value: '#FFE9E9', group: 'error', usageCount: 2,  semanticRole: 'surface/error-faint' },
    // success
    { name: 'success-1', value: '#16B413', group: 'success', usageCount: 15, semanticRole: 'feedback/success' },
    { name: 'success-2', value: '#C7F9C6', group: 'success', usageCount: 8,  semanticRole: 'surface/success' },
    { name: 'success-3', value: '#29CC6A', group: 'success', usageCount: 29, semanticRole: 'feedback/success-bold' },
    { name: 'success-4', value: '#1C6A50', group: 'success', usageCount: 10, semanticRole: 'text/success · feedback/success-deep' },
    { name: 'success-5', value: '#88D987', group: 'success', usageCount: 8,  semanticRole: 'feedback/success-muted' },
    { name: 'success-6', value: '#ECFFE9', group: 'success', usageCount: 2,  semanticRole: 'surface/success-faint' },
    { name: 'success-7', value: '#4B8A17', group: 'success', usageCount: 2,  semanticRole: 'feedback/success-dark' },
    // outline
    { name: 'outline-1', value: '#98E9AB', group: 'outline', usageCount: 1, semanticRole: 'border/success' },
    { name: 'outline-2', value: '#AE7AFF', group: 'outline', usageCount: 1, semanticRole: 'border/accent' },
    { name: 'outline-3', value: '#E99898', group: 'outline', usageCount: 1, semanticRole: 'border/error-muted' },
    // yellow
    { name: 'yellow-1',  value: '#FFC900', group: 'yellow', usageCount: 77, semanticRole: 'action/secondary ⟵ duplicate of secondary-1' },
    { name: 'yellow-2',  value: '#f5ff7c', group: 'yellow', usageCount: 0  },
    { name: 'yellow-3',  value: '#fbfdd8', group: 'yellow', usageCount: 0  },
    { name: 'yellow-4',  value: '#FAE8A4', group: 'yellow', usageCount: 0  },
    { name: 'yellow-5',  value: '#FFD25C', group: 'yellow', usageCount: 8,  semanticRole: 'feedback/warning' },
    { name: 'yellow-6',  value: '#885B00', group: 'yellow', usageCount: 6,  semanticRole: 'text/warning' },
    { name: 'yellow-7',  value: '#FFE6B3', group: 'yellow', usageCount: 6,  semanticRole: 'surface/warning' },
    { name: 'yellow-8',  value: '#FAE184', group: 'yellow', usageCount: 6,  semanticRole: 'surface/warning' },
    { name: 'yellow-9',  value: '#FDE047', group: 'yellow', usageCount: 5,  semanticRole: 'feedback/warning-bold' },
    { name: 'yellow-10', value: '#FEFCE8', group: 'yellow', usageCount: 10, semanticRole: 'surface/warning-faint' },
    { name: 'yellow-11', value: '#CA8A04', group: 'yellow', usageCount: 11, semanticRole: 'text/warning' },
    // green
    { name: 'green-1', value: '#98E9AB', group: 'green', usageCount: 14, semanticRole: 'feedback/success-muted · border/success' },
    { name: 'green-2', value: '#EAFBEE', group: 'green', usageCount: 1,  semanticRole: 'surface/success-faint' },
    // purple (legacy — todo remove)
    { name: 'purple-1', value: '#FF90E8', group: 'purple (legacy)', usageCount: 0 },
    { name: 'purple-2', value: '#dc78b5', group: 'purple (legacy)', usageCount: 0 },
    { name: 'purple-3', value: '#fffae8', group: 'purple (legacy)', usageCount: 0 },
    { name: 'purple-4', value: '#AE7AFF', group: 'purple (legacy)', usageCount: 0 },
    { name: 'purple-5', value: '#EDE4FD', group: 'purple (legacy)', usageCount: 0 },
    { name: 'purple-6', value: '#9D7EFE', group: 'purple (legacy)', usageCount: 0 },
    // violet
    { name: 'violet-3', value: '#6340DF', group: 'violet', usageCount: 6, semanticRole: 'action/accent-bold' },
    { name: 'violet-9', value: '#F1EBF8', group: 'violet', usageCount: 1, semanticRole: 'surface/accent-faint' },
    // teal
    { name: 'teal-1', value: '#23A094', group: 'teal', usageCount: 6, semanticRole: 'feedback/info-alt' },
    { name: 'teal-3', value: '#00577d', group: 'teal', usageCount: 1, semanticRole: 'feedback/info-dark' },
    // gray (unused custom variants)
    { name: 'gray-1', value: '#5F646D', group: 'gray', usageCount: 0 },
    { name: 'gray-2', value: '#9CA3AF', group: 'gray', usageCount: 0 },
    { name: 'gray-3', value: '#e5e7eb', group: 'gray', usageCount: 0 },
    { name: 'gray-4', value: '#d1d5db', group: 'gray', usageCount: 0 },
    { name: 'gray-5', value: '#60646C', group: 'gray', usageCount: 0 },
    // cyan / orange (unused)
    { name: 'cyan-1',   value: '#4CCCEF', group: 'cyan',   usageCount: 0 },
    { name: 'orange-1', value: '#FE8E3E', group: 'orange', usageCount: 0 },
    { name: 'orange-2', value: '#FF5656', group: 'orange', usageCount: 0 },
    // standalone
    { name: 'white',      value: '#FFFFFF', group: 'base', usageCount: 30,  semanticRole: 'surface/default' },
    { name: 'black',      value: '#000000', group: 'base', usageCount: 15,  semanticRole: 'text/primary · border/default' },
    { name: 'red',        value: '#FF0000', group: 'base', usageCount: 3,   semanticRole: 'feedback/error-pure' },
    { name: 'background', value: '#FAF4F0', group: 'base', usageCount: 213, semanticRole: 'surface/page' },
    { name: 'kyc-red',    value: '#C80000', group: 'base', usageCount: 2,   semanticRole: 'feedback/kyc-error' },
    { name: 'kyc-green',  value: '#00C800', group: 'base', usageCount: 2,   semanticRole: 'feedback/kyc-success' },
]

export const FONT_SCALE: FontScale[] = [
    { name: 'h1',           size: '3rem',    lineHeight: '3.5rem',    weight: '800', usageCount: 3   },
    { name: 'h2',           size: '2.25rem', lineHeight: '2.875rem',  weight: '800', usageCount: 4   },
    { name: 'h3',           size: '1.875rem',lineHeight: '2.375rem',  weight: '800', usageCount: 9   },
    { name: 'h4',           size: '1.5rem',  lineHeight: '2rem',      weight: '800', usageCount: 1   },
    { name: 'h5',           size: '1.25rem', lineHeight: '1.75rem',   weight: '800', usageCount: 1   },
    { name: 'h6',           size: '1.125rem',lineHeight: '1.5rem',    weight: '800', usageCount: 3   },
    { name: 'h7',           size: '1rem',    lineHeight: '1.25rem',   weight: '800', usageCount: 0   },
    { name: 'h8',           size: '0.875rem',lineHeight: '1rem',      weight: '800', usageCount: 4   },
    { name: 'h9',           size: '0.75rem', lineHeight: '0.875rem',  weight: '800', usageCount: 0   },
    { name: 'h10',          size: '0.625rem',lineHeight: '0.75rem',   weight: '800', usageCount: 0   },
    { name: 'sm',           size: '0.875rem',lineHeight: '1.3125rem', weight: '400', usageCount: 509 },
    { name: 'headingLarge', size: '7rem',    lineHeight: '6.5rem',    weight: '400', usageCount: 0   },
    { name: 'headingMedium',size: '5rem',    lineHeight: '4rem',      weight: '400', usageCount: 6   },
    { name: 'heading',      size: '3.75rem', lineHeight: '2.875rem',  weight: '400', usageCount: 4   },
]

export const SPACING_TOKENS: SpacingToken[] = [
    { name: '0.25', value: '0.0625rem', remValue: 0.0625 },
    { name: '0.75', value: '0.1875rem', remValue: 0.1875 },
    { name: '4.5', value: '1.125rem', remValue: 1.125 },
    { name: '5.5', value: '1.375rem', remValue: 1.375 },
    { name: '6.5', value: '1.75rem', remValue: 1.75 },
    { name: '7.5', value: '1.875rem', remValue: 1.875 },
    { name: '8.5', value: '2.125rem', remValue: 2.125 },
    { name: '9.5', value: '2.375rem', remValue: 2.375 },
    { name: '13', value: '3.25rem', remValue: 3.25 },
    { name: '15', value: '3.75rem', remValue: 3.75 },
    { name: '17', value: '4.25rem', remValue: 4.25 },
    { name: '18', value: '4.5rem', remValue: 4.5 },
    { name: '19', value: '4.75rem', remValue: 4.75 },
    { name: '21', value: '5.25rem', remValue: 5.25 },
    { name: '22', value: '5.5rem', remValue: 5.5 },
    { name: '26', value: '6.5rem', remValue: 6.5 },
    { name: '30', value: '7.5rem', remValue: 7.5 },
    { name: '34', value: '8.5rem', remValue: 8.5 },
    { name: '38', value: '9.5rem', remValue: 9.5 },
    { name: '42', value: '10.5rem', remValue: 10.5 },
    { name: '58', value: '14.5rem', remValue: 14.5 },
]

export const HARDCODED_INSTANCES: HardcodedInstance[] = [
    {
        value: '#6340df',
        file: 'src/components/Marketing/mdx/FAQ.tsx',
        line: 69,
        context: "backgroundColor: '#6340df'",
        category: 'color',
        severity: 'warn',
        tokenEquivalent: 'violet-3 (#6340DF)',
    },
    {
        value: '#90A8ED',
        file: 'src/components/Marketing/mdx/ExchangeWidget.tsx',
        line: 36,
        context: "style={{ backgroundColor: '#90A8ED' }}",
        category: 'color',
        severity: 'warn',
        tokenEquivalent: 'secondary-3 (#90A8ED)',
    },
    {
        value: 'caret-[#FF90E8]',
        file: 'src/components/SearchInput/index.tsx',
        line: 34,
        context: "className=\"... caret-[#FF90E8] ...\"",
        category: 'color',
        severity: 'warn',
        tokenEquivalent: 'primary-1 (#FF90E8) — use caret-primary-1',
    },
    {
        value: '#fe91e6',
        file: 'src/components/og/ProfileCardOG.tsx',
        line: 8,
        context: "const pink = '#fe91e6'",
        category: 'color',
        severity: 'warn',
        tokenEquivalent: 'primary-1 (#FF90E8)',
    },
    {
        value: '#fe91e6',
        file: 'src/components/og/PaymentCardOG.tsx',
        line: 8,
        context: "const pink = '#fe91e6'",
        category: 'color',
        severity: 'warn',
        tokenEquivalent: 'primary-1 (#FF90E8)',
    },
    {
        value: '#fe91e6',
        file: 'src/components/og/ReceiptCardOG.tsx',
        line: 8,
        context: "const pink = '#fe91e6'",
        category: 'color',
        severity: 'warn',
        tokenEquivalent: 'primary-1 (#FF90E8)',
    },
    {
        value: '#fe91e6',
        file: 'src/components/og/InviteCardOG.tsx',
        line: 8,
        context: "const pink = '#fe91e6'",
        category: 'color',
        severity: 'warn',
        tokenEquivalent: 'primary-1 (#FF90E8)',
    },
    {
        value: '#F9F4F0',
        file: 'src/components/LandingPage/Manteca.tsx',
        line: 32,
        context: "style={{ backgroundColor: '#F9F4F0' }}",
        category: 'color',
        severity: 'warn',
        tokenEquivalent: 'background (#FAF4F0) — near match',
    },
    {
        value: '#FFC900',
        file: 'src/components/AddWithdraw/AddWithdrawCountriesList.tsx',
        line: 68,
        context: "backgroundColor: '#FFC900'",
        category: 'color',
        severity: 'warn',
        tokenEquivalent: 'secondary-1 (#FFC900)',
    },
    {
        value: "fontSize: '49px'",
        file: 'src/components/Global/ImageGeneration/LinkPreview.tsx',
        line: 103,
        context: "style={{ fontSize: '49px' }}",
        category: 'font',
        severity: 'warn',
    },
    {
        value: 'fontSize: 250',
        file: 'src/components/og/PaymentCardOG.tsx',
        line: 44,
        context: 'fontSize: 250 (OG image generation)',
        category: 'font',
        severity: 'info',
    },
    {
        value: "fontSize: '16px'",
        file: 'src/components/Global/ImageGeneration/LinkPreview.tsx',
        line: 89,
        context: "style={{ fontSize: '16px' }}",
        category: 'font',
        severity: 'warn',
        tokenEquivalent: 'text-base (1rem)',
    },
    {
        value: "borderRadius: '5.35%'",
        file: 'src/components/LandingPage/PioneerCard3D.tsx',
        line: 22,
        context: "style={{ borderRadius: '5.35%' }}",
        category: 'radius',
        severity: 'info',
    },
    {
        value: 'border-radius: 8px',
        file: 'src/components/Global/InvitesGraph/index.tsx',
        line: 89,
        context: 'border-radius: 8px (inline HTML string)',
        category: 'radius',
        severity: 'warn',
        tokenEquivalent: 'rounded-md (Tailwind)',
    },
    {
        value: "borderRadius: '0 0 2px 2px'",
        file: 'src/components/Home/PerkClaimModal.tsx',
        line: 55,
        context: "style={{ borderRadius: '0 0 2px 2px' }}",
        category: 'radius',
        severity: 'warn',
    },
    {
        value: "marginLeft: '-8px'",
        file: 'src/components/Global/ImageGeneration/LinkPreview.tsx',
        line: 95,
        context: "style={{ marginLeft: '-8px' }}",
        category: 'spacing',
        severity: 'warn',
        tokenEquivalent: '-ml-2 (Tailwind)',
    },
    {
        value: "height: '400px'",
        file: 'src/components/Global/Layout/index.tsx',
        line: 12,
        context: "style={{ height: '400px' }}",
        category: 'spacing',
        severity: 'warn',
    },
    {
        value: 'padding: 12px 14px',
        file: 'src/components/Global/InvitesGraph/index.tsx',
        line: 78,
        context: 'padding: 12px 14px (inline HTML string)',
        category: 'spacing',
        severity: 'warn',
        tokenEquivalent: 'p-3 px-3.5 (Tailwind)',
    },
]

export const AUDIT_SUMMARY = {
    colors: { tokenUsages: 520, hardcodedInstances: 10 },
    fonts: { tokenUsages: 280, hardcodedInstances: 3 },
    spacing: { tokenUsages: 440, hardcodedInstances: 3 },
    radius: { tokenUsages: 190, hardcodedInstances: 3 },
}
