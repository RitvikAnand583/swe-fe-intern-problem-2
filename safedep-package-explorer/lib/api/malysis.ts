"use server";

import { createPromiseClient } from "@connectrpc/connect";
import { MalwareAnalysisService } from "@buf/safedep_api.connectrpc_es/safedep/services/malysis/v1/malysis_connect.js";
import { createApiTransport } from "./client";
import { mapEcosystemToEnum, type PackageIdentifier, type ApiError } from "./types";
import { shouldUseMockData, getMockMalysis } from "./mock";

export async function getPackageAnalysis(pkg: PackageIdentifier) {
  if (shouldUseMockData()) {
    return getMockMalysis();
  }

  try {
    const transport = createApiTransport();
    const client = createPromiseClient(MalwareAnalysisService, transport);
    
    const response = await client.queryPackageAnalysis({
      target: {
        packageVersion: {
          package: {
            ecosystem: mapEcosystemToEnum(pkg.ecosystem),
            name: pkg.name,
          },
          version: pkg.version,
        },
      },
    });

    return {
      success: true,
      data: response.toJson(),
    };
  } catch (error: any) {
    const apiError: ApiError = {
      message: error.message || "Failed to fetch package analysis",
      code: error.code,
      status: error.status,
    };
    
    return {
      success: false,
      error: apiError,
    };
  }
}
