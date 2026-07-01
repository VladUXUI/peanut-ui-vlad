export type ComponentVariant = {
    label: string
    props: Record<string, unknown>
}

export type ComponentEntry = {
    name: string
    importPath: string
    category: string
    group: 'primitive' | 'global'
    usageCount: number
    description?: string
    variants?: ComponentVariant[]
    canRender: boolean
    renderNote?: string
}

export const COMPONENT_REGISTRY: ComponentEntry[] = [
    // ── 0_Bruddle Primitives ──────────────────────────────────────────────────
    {
        name: 'Button',
        importPath: '@/components/0_Bruddle/Button',
        category: 'Buttons',
        group: 'primitive',
        usageCount: 157,
        description: 'Primary interaction component with variant, size, shadow, loading, icon, and long-press support.',
        canRender: true,
        variants: [
            { label: 'purple', props: { variant: 'purple', children: 'Send money' } },
            { label: 'purple + shadow', props: { variant: 'purple', shadowSize: '4', children: 'Send money' } },
            { label: 'stroke', props: { variant: 'stroke', children: 'Cancel' } },
            { label: 'primary-soft', props: { variant: 'primary-soft', children: 'Soft action' } },
            { label: 'dark', props: { variant: 'dark', children: 'Dark CTA' } },
            { label: 'transparent-dark', props: { variant: 'transparent-dark', children: 'Link' } },
            { label: 'transparent-light', props: { variant: 'transparent-light', children: 'Light link' } },
            { label: 'small', props: { variant: 'purple', size: 'small', children: 'Small' } },
            { label: 'loading', props: { variant: 'purple', loading: true, children: 'Loading…' } },
            { label: 'disabled', props: { variant: 'purple', disabled: true, children: 'Disabled' } },
        ],
    },
    {
        name: 'BaseInput',
        importPath: '@/components/0_Bruddle/BaseInput',
        category: 'Inputs',
        group: 'primitive',
        usageCount: 14,
        description: 'Base text input with size variants (sm/md/lg) and optional right-slot content.',
        canRender: true,
        variants: [
            { label: 'sm', props: { variant: 'sm', placeholder: 'Small input' } },
            { label: 'md (default)', props: { placeholder: 'Enter amount…' } },
            { label: 'lg', props: { variant: 'lg', placeholder: 'Large input' } },
        ],
    },
    {
        name: 'Card (Bruddle)',
        importPath: '@/components/0_Bruddle/Card',
        category: 'Cards',
        group: 'primitive',
        usageCount: 25,
        description: 'Primitive container with optional drop shadow in primary or secondary direction.',
        canRender: true,
        variants: [
            { label: 'no shadow', props: { children: 'No shadow' } },
            { label: 'shadow-4', props: { shadowSize: '4', children: 'Shadow 4' } },
            { label: 'shadow-primary-8', props: { shadowSize: '8', color: 'primary', children: 'Shadow 8 primary' } },
            { label: 'shadow-secondary-4', props: { shadowSize: '4', color: 'secondary', children: 'Shadow 4 secondary' } },
        ],
    },
    {
        name: 'Checkbox',
        importPath: '@/components/0_Bruddle/Checkbox',
        category: 'Inputs',
        group: 'primitive',
        usageCount: 7,
        description: 'Custom styled checkbox with optional label.',
        canRender: true,
        variants: [
            { label: 'unchecked', props: { value: false, label: 'I agree to terms' } },
            { label: 'checked', props: { value: true, label: 'Already checked' } },
        ],
    },
    {
        name: 'Divider',
        importPath: '@/components/0_Bruddle/Divider',
        category: 'Layout',
        group: 'primitive',
        usageCount: 11,
        description: 'Horizontal rule with optional centered text.',
        canRender: true,
        variants: [
            { label: 'plain', props: {} },
            { label: 'with text', props: { text: 'or' } },
        ],
    },
    {
        name: 'Title',
        importPath: '@/components/0_Bruddle/Title',
        category: 'Typography',
        group: 'primitive',
        usageCount: 8,
        description: 'Display title using the knerd-filled / knerd-outline fonts with offset shadow effect.',
        canRender: true,
        variants: [
            { label: 'default', props: { text: 'Peanut' } },
            { label: 'no offset', props: { text: 'No Offset', offset: false } },
        ],
    },
    {
        name: 'BaseSelect',
        importPath: '@/components/0_Bruddle/BaseSelect',
        category: 'Inputs',
        group: 'primitive',
        usageCount: 5,
        description: 'Radix UI-based select dropdown.',
        canRender: true,
        variants: [
            {
                label: 'default',
                props: {
                    options: [
                        { label: 'Argentina', value: 'AR' },
                        { label: 'Brazil', value: 'BR' },
                        { label: 'Mexico', value: 'MX' },
                    ],
                    placeholder: 'Select country',
                },
            },
        ],
    },
    {
        name: 'PageContainer',
        importPath: '@/components/0_Bruddle/PageContainer',
        category: 'Layout',
        group: 'primitive',
        usageCount: 31,
        description: 'Full-width flex wrapper that constrains content to max-w-xl on desktop.',
        canRender: true,
        variants: [
            { label: 'alignItems: start', props: { alignItems: 'start', children: 'Content aligned start' } },
            { label: 'alignItems: center', props: { alignItems: 'center', children: 'Content aligned center' } },
        ],
    },
    {
        name: 'Toast',
        importPath: '@/components/0_Bruddle/Toast',
        category: 'Feedback',
        group: 'primitive',
        usageCount: 22,
        description: 'Context-based toast notification system (ToastProvider + useToast hook). Shown below as static visual mocks.',
        canRender: true,
        renderNote: 'Displayed as static visual mocks — actual toasts are triggered via useToast() hook',
        variants: [
            { label: 'info', props: { type: 'info', message: 'Link copied to clipboard' } },
            { label: 'success', props: { type: 'success', message: 'Payment sent successfully!' } },
            { label: 'error', props: { type: 'error', message: 'Something went wrong. Try again.' } },
            { label: 'warning', props: { type: 'warning', message: 'Your balance is running low' } },
        ],
    },
    {
        name: 'CloudsBackground',
        importPath: '@/components/0_Bruddle/CloudsBackground',
        category: 'Layout',
        group: 'primitive',
        usageCount: 3,
        description: 'Animated floating cloud SVGs as a decorative background layer.',
        canRender: true,
        variants: [{ label: 'default', props: {} }],
    },

    // ── Global Components ─────────────────────────────────────────────────────
    {
        name: 'Loading',
        importPath: '@/components/Global/Loading',
        category: 'Feedback',
        group: 'global',
        usageCount: 18,
        description: 'Minimal CSS spinner. Size controlled via className.',
        canRender: true,
        variants: [
            { label: 'small (default)', props: {} },
            { label: 'large', props: { className: 'h-8 w-8' } },
        ],
    },
    {
        name: 'PeanutLoading',
        importPath: '@/components/Global/PeanutLoading',
        category: 'Feedback',
        group: 'global',
        usageCount: 39,
        description: 'Branded loading state with spinning peanut logo and optional message.',
        canRender: true,
        variants: [
            { label: 'default', props: {} },
            { label: 'with message', props: { message: 'Processing payment…' } },
        ],
    },
    {
        name: 'ErrorAlert',
        importPath: '@/components/Global/ErrorAlert',
        category: 'Feedback',
        group: 'global',
        usageCount: 35,
        description: 'Inline error message with icon. Uses error color token.',
        canRender: true,
        variants: [
            { label: 'default', props: { description: 'Could not load your balance. Please try again.' } },
            { label: 'small icon', props: { description: 'Invalid amount', iconSize: 12 } },
        ],
    },
    {
        name: 'InfoCard',
        importPath: '@/components/Global/InfoCard',
        category: 'Cards',
        group: 'global',
        usageCount: 20,
        description: 'Contextual information card with variant-based color theming.',
        canRender: true,
        variants: [
            { label: 'info', props: { variant: 'info', title: 'Did you know?', description: 'Transfers are instant with zero fees.' } },
            { label: 'warning', props: { variant: 'warning', title: 'Caution', description: 'Network fees apply on this chain.' } },
            { label: 'error', props: { variant: 'error', title: 'Error', description: 'This transaction could not be completed.' } },
            { label: 'success', props: { variant: 'success', title: 'Done', description: 'Funds received in your account.' } },
            { label: 'default', props: { variant: 'default', title: 'Note', description: 'This feature is in beta.' } },
        ],
    },
    {
        name: 'Card (Global)',
        importPath: '@/components/Global/Card',
        category: 'Cards',
        group: 'global',
        usageCount: 66,
        description: 'List card with position-aware border radius for stacked groups (single/first/middle/last).',
        canRender: true,
        variants: [
            { label: 'single', props: { position: 'single', children: 'Single card' } },
            { label: 'first', props: { position: 'first', children: 'First in group' } },
            { label: 'middle', props: { position: 'middle', children: 'Middle in group' } },
            { label: 'last', props: { position: 'last', children: 'Last in group' } },
        ],
    },
    {
        name: 'EmptyState',
        importPath: '@/components/Global/EmptyStates/EmptyState',
        category: 'Feedback',
        group: 'global',
        usageCount: 21,
        description: 'Empty state display with icon, title, description and optional CTA.',
        canRender: true,
        variants: [
            {
                label: 'default',
                props: { icon: 'info', title: 'Nothing here yet', description: 'Send your first payment to get started.' },
            },
        ],
    },
    {
        name: 'StatusBadge',
        importPath: '@/components/Global/Badges/StatusBadge',
        category: 'Badges',
        group: 'global',
        usageCount: 13,
        description: 'Pill badge showing transaction/task status with semantic color coding.',
        canRender: true,
        variants: [
            { label: 'completed', props: { status: 'completed' } },
            { label: 'pending', props: { status: 'pending' } },
            { label: 'processing', props: { status: 'processing' } },
            { label: 'failed', props: { status: 'failed' } },
            { label: 'cancelled', props: { status: 'cancelled' } },
            { label: 'refunded', props: { status: 'refunded' } },
            { label: 'soon', props: { status: 'soon' } },
            { label: 'large', props: { status: 'completed', size: 'large' } },
        ],
    },
    {
        name: 'StatusPill',
        importPath: '@/components/Global/StatusPill',
        category: 'Badges',
        group: 'global',
        usageCount: 8,
        description: 'Compact status pill with icon, used in transaction history rows.',
        canRender: true,
        variants: [
            { label: 'completed', props: { status: 'completed' } },
            { label: 'pending', props: { status: 'pending' } },
            { label: 'failed', props: { status: 'failed' } },
            { label: 'processing', props: { status: 'processing' } },
            { label: 'cancelled', props: { status: 'cancelled' } },
        ],
    },
    {
        name: 'FlowHeader',
        importPath: '@/components/Global/FlowHeader',
        category: 'Navigation',
        group: 'global',
        usageCount: 12,
        description: 'Top navigation header for multi-step flows with optional back button.',
        canRender: true,
        variants: [
            { label: 'with back', props: { onPrev: null } },
            { label: 'no back', props: {} },
        ],
    },
    {
        name: 'ActionModal',
        importPath: '@/components/Global/ActionModal',
        category: 'Overlays',
        group: 'global',
        usageCount: 32,
        description: 'Pre-styled modal with icon, title, description, optional checkbox, and CTA buttons.',
        canRender: true,
        renderNote: 'Click the preview button to open the real component',
        variants: [
            {
                label: 'confirm action',
                props: {
                    title: 'Cancel this payment?',
                    description: 'This action cannot be undone. The link will expire.',
                    icon: 'warning',
                    ctas: [
                        { text: 'Yes, cancel', variant: 'purple' },
                        { text: 'Keep it', variant: 'stroke' },
                    ],
                },
            },
            {
                label: 'success state',
                props: {
                    title: 'Payment sent!',
                    description: '$25 has been sent to @alice',
                    icon: 'success',
                    ctas: [{ text: 'Done', variant: 'purple' }],
                },
            },
        ],
    },
    {
        name: 'Modal',
        importPath: '@/components/Global/Modal',
        category: 'Overlays',
        group: 'global',
        usageCount: 17,
        description: 'Base modal using Headless UI Dialog. Accepts any children content.',
        canRender: true,
        renderNote: 'Click the preview button to open the real component',
        variants: [
            {
                label: 'with title',
                props: { title: 'Confirm your details', children: 'Modal content goes here.' },
            },
        ],
    },
]
