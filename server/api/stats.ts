import lckClient, { LCK_COLUMNS, LCK_TABLES, type RawLckData } from '~/services/lckClient'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const client = new lckClient(
    config.LCK_BASE_PATH,
    config.LCK_DB_UUID,
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
        account[LCK_COLUMNS.ACCOUNTS_TYPE] === 'Plongeur individuel' &&
        account[LCK_COLUMNS.ACCOUNTS_INSCRIPTION_FINALISEE],
    ).length,
    structureCount: rawAccounts.filter(
      (account) =>
        account[LCK_COLUMNS.ACCOUNTS_TYPE] === 'Structure de plongée' &&
        account[LCK_COLUMNS.ACCOUNTS_INSCRIPTION_FINALISEE],
    ).length,
    signatureCount: rawSignatures.length,
    signatureStructureCount: rawSignatures.filter(
      (signature) => signature[LCK_COLUMNS.SIGNATURES_STRUCTURE],
    ).length,
    signaturePlongeurCount: rawSignatures.filter(
      (signature) => !signature[LCK_COLUMNS.SIGNATURES_STRUCTURE],
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
