function replaceBigInts(_key: string, value: unknown): unknown {
  if (typeof value === "bigint") return value.toString();
  return value;
}

function formatHuman(data: unknown, indent = 0): string {
  const pad = "  ".repeat(indent);
  if (data === null || data === undefined) return `${pad}null`;
  if (typeof data === "bigint") return `${pad}${data.toString()}`;
  if (typeof data !== "object") return `${pad}${data}`;
  if (Array.isArray(data)) {
    if (data.length === 0) return `${pad}(empty)`;
    return data.map((item, i) => `${pad}[${i}]:\n${formatHuman(item, indent + 1)}`).join("\n");
  }
  return Object.entries(data)
    .map(([k, v]) => {
      if (typeof v === "object" && v !== null) {
        return `${pad}${k}:\n${formatHuman(v, indent + 1)}`;
      }
      return `${pad}${k}: ${typeof v === "bigint" ? v.toString() : v}`;
    })
    .join("\n");
}

export function outputSuccess(data: unknown, human: boolean): void {
  if (human) {
    console.log(formatHuman(data));
  } else {
    console.log(JSON.stringify({ success: true, data }, replaceBigInts));
  }
}

export function outputError(code: string, message: string, human: boolean): void {
  if (human) {
    console.error(`Error [${code}]: ${message}`);
  } else {
    console.log(JSON.stringify({ success: false, error: { code, message } }));
  }
}
