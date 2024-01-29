import path from 'path'
import {type ManifestData} from '../resolver-module/types'

type SandboxType = Record<
  string,
  | {
      css: string[]
      js: string[]
      static: string[]
      html: string
    }
  | undefined
>

export default function sandbox(
  manifestPath: string,
  manifest: ManifestData
): SandboxType {
  if (!manifest || !manifest.sandbox || !manifest.sandbox.pages) {
    return {[`sandbox-0`]: undefined}
  }

  const sandboxPages = manifest.sandbox.pages as string[]

  const sandboxedData: any = {}

  for (const [index, page] of sandboxPages.entries()) {
    const sandboxPageAbsolutePath = path.join(path.dirname(manifestPath), page)

    sandboxedData[`sandbox-${index}`] = sandboxPageAbsolutePath
  }

  return sandboxedData
}