import lckClient, { LCK_TABLES, type RawLckData } from '~/services/lckClient'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const client = new lckClient(
    config.LCK_BASE_PATH,
    config.LCK_DB_UUID,
    config.LCK_SETTINGS_UUID,
    config.LCK_USERNAME,
    config.LCK_PASSWORD,
  )

  const rawAccounts = await client.query<Array<RawLckData>>(
    LCK_TABLES.ACCOUNTS,
    {
      $limit: -1,
    },
  )

  const rawSignatures = await client.query<Array<RawLckData>>(
    LCK_TABLES.SIGNATURES,
    {
      $limit: -1,
    },
  )

  const stats = {
    plongeurCount: rawAccounts.filter(
      (account) =>
        account.Type === 'Plongeur individuel' &&
        account['Inscription finalisée'],
    ).length,
    structureCount: rawAccounts.filter(
      (account) =>
        account.Type === 'Structure de plongée' &&
        account['Inscription finalisée'],
    ).length,
    signatureCount: rawSignatures.length,
    signatureStructureCount: rawSignatures.filter(
      ({ 'Structure ?': isStructure }) => isStructure,
    ).length,
    signaturePlongeurCount: rawSignatures.filter(
      ({ 'Structure ?': isStructure }) => !isStructure,
    ).length,
  }

  return stats
})

export type Stats = {
  plongeurCount: number
  structureCount: number
  signatureCount: number
  signatureStructureCount: number
  signaturePlongeurCount: number
}
