import { describe, expect, it } from "vitest";

import { setNestedValue } from "./nested";

describe("setNestedValue", () => {
  it("sets ordinary nested values", () => {
    expect(setNestedValue({}, "model.name", "hermes")).toEqual({
      model: { name: "hermes" },
    });
  });

  it("rejects prototype paths", () => {
    expect(() => setNestedValue({}, "__proto__.polluted", true)).toThrow(
      "Unsafe config path",
    );
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
});
