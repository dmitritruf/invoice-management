import PropTypes from 'prop-types'
import React from 'react'
import Card from 'components/ui/layout/Card'
import ClientForm, { SaveClientEvent } from './ClientForm'
import { useClientById, useClientList, useUpsertClient, useUpsertClientError, useUpsertClientState } from 'store/ClientSlice'
import ErrorBanner from 'components/utility/ErrorBanner'
import { PayloadAction } from '@reduxjs/toolkit'

type ClientProps = {
    onCancel?: () => void,
    onSave?: () => void,
    clientId: string | null,
}
const ClientPropTypes = {
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    clientId: PropTypes.string,
}
function ClientEdition({ onCancel, onSave, clientId }: ClientProps) {
    const client = useClientById(clientId);
    const upsertClient = useUpsertClient();
    const error = useUpsertClientError();
    const state = useUpsertClientState();
    const saveHandler = async ({ client, clientFormApi }: SaveClientEvent) => {
        let result = await upsertClient(client) as any
        if (result.error === undefined) {
            clientFormApi.reset();
            if (onSave) onSave();
        }
    }
    const loading = state === "loading";
    const title = clientId ? 'Edit Client' : 'Add Client';

    const cancelHandler = () => {
        if (onCancel) {onCancel(); return true;}
    }

    return (
        <Card title={title} fullscreen={true} background={true}>
            <ClientForm onSave={saveHandler} onCancel={cancelHandler} client={client} disabled={loading} />
            {error && <ErrorBanner error={error}>Could not save the client.</ErrorBanner>}
        </Card>
    )
}

ClientEdition.propTypes = ClientPropTypes;

export default ClientEdition
