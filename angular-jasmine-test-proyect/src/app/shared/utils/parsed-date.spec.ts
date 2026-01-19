import { isPast, parseDate } from "./parsed-date";

describe('parseDate', () => {
    it('should return a string', () => {
        expect(parseDate('2025-03-21T00:00:00.000Z')).toEqual('2025-03-21');
    });
});

describe('isPast', () => {
  it('should return true when date is in the past', () => {
    const pastDate = new Date('2000-01-01');
    const result = isPast(pastDate);
    expect(result).toBeTrue();
  });

  it('should return false when date is in the future', () => {
    const futureDate = new Date('2999-01-01');
    const result = isPast(futureDate);
    expect(result).toBeFalse();
  });
});
