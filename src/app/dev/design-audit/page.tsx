import { notFound } from 'next/navigation'
import { DesignAuditShell } from './DesignAuditShell'

export default function DesignAuditPage() {
    // This fork exists to host the design audit, so it's enabled in local dev and on any
    // Vercel deployment (preview or production). Still notFound() on a non-Vercel prod server.
    const enabled =
        process.env.NODE_ENV === 'development' ||
        process.env.VERCEL_ENV === 'preview' ||
        process.env.VERCEL_ENV === 'production'
    if (!enabled) notFound()
    return <DesignAuditShell />
}
