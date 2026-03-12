import { validateProspect } from "../prospect-helpers";

describe("prospect creation validation", () => {
  test("rejects a blank company name", () => {
    const result = validateProspect({
      companyName: "",
      roleTitle: "Software Engineer",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Company name is required");
  });

  test("rejects a blank role title", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Role title is required");
  });
});

describe("target salary validation", () => {
  test("accepts a valid salary string", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: "$120,000",
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts a numeric salary string", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: "120000",
    });

    expect(result.valid).toBe(true);
  });

  test("accepts salary omitted entirely (optional field)", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
    });

    expect(result.valid).toBe(true);
  });

  test("accepts salary explicitly set to null", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: null,
    });

    expect(result.valid).toBe(true);
  });

  test("rejects a whitespace-only salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: "   ",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Target salary must be a non-empty string when provided"
    );
  });

  test("rejects an empty string salary", () => {
    const result = validateProspect({
      companyName: "Google",
      roleTitle: "Engineer",
      targetSalary: "",
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      "Target salary must be a non-empty string when provided"
    );
  });

  test("accepts range format salary", () => {
    const result = validateProspect({
      companyName: "Stripe",
      roleTitle: "Staff Engineer",
      targetSalary: "$150k–$180k",
    });

    expect(result.valid).toBe(true);
  });
});
