"use server";

import { createPromiseClient } from "@connectrpc/connect";
import { InsightService } from "@buf/safedep_api.connectrpc_es/safedep/services/insights/v2/insights_connect.js";
import { createApiTransport } from "./client";
import { mapEcosystemToEnum, type PackageIdentifier, type ApiError } from "./types";
import { shouldUseMockData, getMockInsights } from "./mock";

export async function getPackageInsights(pkg: PackageIdentifier) {
  if (shouldUseMockData()) {
    return getMockInsights();
  }

  try {
    const transport = createApiTransport();
    const client = createPromiseClient(InsightService, transport);
    
    const response = await client.getPackageVersionInsight({
      packageVersion: {
        package: {
          ecosystem: mapEcosystemToEnum(pkg.ecosystem),
          name: pkg.name,
        },
        version: pkg.version,
      },
    });

    return {
      success: true,
      data: response.toJson(),
    };
  } catch (error: any) {
    const apiError: ApiError = {
      message: error.message || "Failed to fetch package insights",
      code: error.code,
      status: error.status,
    };
    
    return {
      success: false,
      error: apiError,
    };
  }
}
