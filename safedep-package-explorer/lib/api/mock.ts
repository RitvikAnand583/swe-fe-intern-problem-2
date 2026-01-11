import insightsSample from "@/../public/insights-sample.json";
import malysisSample from "@/../public/malysis-sample.json";

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export function getMockInsights() {
  return {
    success: true,
    data: insightsSample,
  };
}

export function getMockMalysis() {
  return {
    success: true,
    data: malysisSample,
  };
}

export function shouldUseMockData() {
  return USE_MOCK_DATA;
}
