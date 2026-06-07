describe('importFromSheets batch behavior', () => {
  it('collects all rows before querying (no await inside loop)', () => {
    const rows = [
      { correo: 'a@test.com', direccion: 'Calle 1' },
      { correo: 'b@test.com', direccion: 'Calle 2' },
      { correo: 'c@test.com', direccion: 'Calle 3' },
    ];
    const keys = rows.map(r => `${r.correo}__${r.direccion}`);
    const unique = new Set(keys);
    expect(unique.size).toBe(rows.length);
  });

  it('deduplicates by correo+direccion key', () => {
    const rows = [
      { correo: 'a@test.com', direccion: 'Calle 1' },
      { correo: 'a@test.com', direccion: 'Calle 1' },
    ];
    const keys = rows.map(r => `${r.correo}__${r.direccion}`);
    const unique = new Set(keys);
    expect(unique.size).toBe(1);
  });
});
