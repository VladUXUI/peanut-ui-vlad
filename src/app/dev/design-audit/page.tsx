import { notFound } from 'next/navigation'
import { DesignAuditShell } from './DesignAuditShell'

export default function DesignAuditPage() {
    // Visible in local dev and on Vercel preview deployments only — hidden on production domains.
    const enabled = process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'
    if (!enabled) notFound()
    return <DesignAuditShell />
}
