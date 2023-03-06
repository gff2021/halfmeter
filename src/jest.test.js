test('commmon matcher', () => {
    expect(2 + 2).toBe(4)
    expect(2 + 2).not.toBe(5)
})

test('to be true or false', () => {
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
})

test('greater than or less than', () => {
    expect(4).toBeGreaterThan(3);
    expect(4).toBeLessThan(5);
})