import { calculatePointsForAmount } from '../utils/rewards';

describe("calculatePointsForAmount", () => {
  
  test("returns 0 for non-number values", () => {
    expect(calculatePointsForAmount(null)).toBe(0);
    expect(calculatePointsForAmount(undefined)).toBe(0);
    expect(calculatePointsForAmount("100")).toBe(0);
    expect(calculatePointsForAmount(NaN)).toBe(0);
  });

  test("returns 0 for amounts <= 50", () => {
    expect(calculatePointsForAmount(0)).toBe(0);
    expect(calculatePointsForAmount(25)).toBe(0);
    expect(calculatePointsForAmount(50)).toBe(0);
  });

  test("calculates points correctly for amounts between 51 and 100", () => {
    // amount = 70 → (70 - 50) * 1 = 20
    expect(calculatePointsForAmount(70)).toBe(20);

    // amount = 99 → 49 points
    expect(calculatePointsForAmount(99)).toBe(49);
  });

  test("calculates points correctly for amounts over 100", () => {
    // amount = 120 → (120 - 100) * 2 = 40 + 50 = 90
    expect(calculatePointsForAmount(120)).toBe(90);

    // amount = 101 → (1 * 2) + 50 = 52
    expect(calculatePointsForAmount(101)).toBe(52);
  });

  test("floors decimal amounts before calculation", () => {
    // amount = 120.75 → floor = 120 → same as above → 90
    expect(calculatePointsForAmount(120.75)).toBe(90);
  });

});
