import { Ecosystem } from "@buf/safedep_api.bufbuild_es/safedep/messages/package/v1/ecosystem_pb.js";

export interface PackageIdentifier {
  ecosystem: string;
  name: string;
  version: string;
}

export function mapEcosystemToEnum(ecosystem: string): Ecosystem {
  const ecosystemMap: Record<string, Ecosystem> = {
    npm: Ecosystem.NPM,
    pypi: Ecosystem.PYPI,
    maven: Ecosystem.MAVEN,
    go: Ecosystem.GO,
    cargo: Ecosystem.CARGO,
    nuget: Ecosystem.NUGET,
  };
  
  return ecosystemMap[ecosystem.toLowerCase()] || Ecosystem.UNSPECIFIED;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}
