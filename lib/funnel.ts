// lib/funnel.ts — testbench.tools 퍼널 (제품 → 관련 무료 웹툴).
// 강한 연관만 싣는다. 링크 베이스는 상수 하나로 관리.
export const TB_BASE = "https://testbench.tools";

export interface TbTool {
  slug: string;
  name: string;
  nameKo: string;
}

const MAP: Record<string, TbTool[]> = {
  "icd-refinery": [
    { slug: "bit-field-extractor", name: "Bit Field Extractor", nameKo: "비트 필드 추출기" },
    { slug: "struct-padding", name: "Struct Padding Visualizer", nameKo: "구조체 패딩 시각화" },
    { slug: "endianness-converter", name: "Endianness Converter", nameKo: "엔디안 변환기" },
    { slug: "ieee-754-float", name: "IEEE 754 Float Converter", nameKo: "IEEE 754 변환기" },
  ],
  "protocol-bridge": [
    { slug: "modbus-frame-decoder", name: "Modbus Frame Decoder", nameKo: "Modbus 프레임 디코더" },
    { slug: "modbus-address-converter", name: "Modbus Address Converter", nameKo: "Modbus 주소 변환기" },
    { slug: "crc-16-modbus", name: "CRC-16 Modbus Calculator", nameKo: "CRC-16 Modbus 계산기" },
  ],
  "telemetry-scope": [
    { slug: "csv-waveform-plotter", name: "CSV Waveform Plotter", nameKo: "CSV 파형 플로터" },
    { slug: "tdms-viewer", name: "TDMS Viewer", nameKo: "TDMS 뷰어" },
    { slug: "plc-analog-scaling", name: "PLC Analog Scaling", nameKo: "PLC 아날로그 스케일링" },
  ],
  "ch10-viewer": [
    { slug: "mil-1553-message-decoder", name: "MIL-1553 Message Decoder", nameKo: "MIL-1553 메시지 디코더" },
    { slug: "arinc-429-decoder", name: "ARINC 429 Decoder", nameKo: "ARINC 429 디코더" },
    { slug: "hex-file-viewer", name: "Hex File Viewer", nameKo: "헥스 파일 뷰어" },
  ],
  "test-sequencer": [
    { slug: "modbus-frame-decoder", name: "Modbus Frame Decoder", nameKo: "Modbus 프레임 디코더" },
    { slug: "crc-16-modbus", name: "CRC-16 Modbus Calculator", nameKo: "CRC-16 Modbus 계산기" },
    { slug: "hex-to-ascii", name: "Hex ↔ ASCII Converter", nameKo: "Hex ↔ ASCII 변환기" },
  ],
};

export function tbToolsFor(productSlug: string): TbTool[] {
  return MAP[productSlug] ?? [];
}

// testbench에 한국어 페이지가 존재하는 툴만 /ko로 — 나머지는 영문 폴백 (404 방지)
const TB_KO_TOOLS = new Set([
  "4-20ma-scaling",
  "adc-calculator",
  "bcd-converter",
  "plc-analog-scaling",
  "pt100-calculator",
]);

export function tbUrl(tool: TbTool, lang: "en" | "ko"): string {
  const prefix = lang === "ko" && TB_KO_TOOLS.has(tool.slug) ? "/ko" : "";
  return `${TB_BASE}${prefix}/tools/${tool.slug}/`;
}
