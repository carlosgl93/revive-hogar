import { buildHeaderIndex, transformRow } from '../transform';

describe('transformRow with RUT', () => {
  it('extracts rut from "rut" column', () => {
    const headerRow = ['correo', 'nombre', 'direccion', 'comuna', 'telefono', 'monto', 'monto pendiente', 'rut', 'dia', 'tipo de pago'];
    const dataRow = ['juan@test.cl', 'Juan', 'dir 1', 'scl', '1234', '15000', '15000', '12.345.678-9', 'lunes', 'transferencia'];
    const headerIndex = buildHeaderIndex(headerRow);
    const result = transformRow(dataRow, headerIndex, 1);
    expect(result.error).toBeNull();
    expect(result.cliente?.rut).toBe('12.345.678-9');
  });

  it('handles missing rut column gracefully', () => {
    const headerRow = ['correo', 'nombre', 'direccion', 'comuna', 'telefono', 'monto', 'monto pendiente', 'dia', 'tipo de pago'];
    const dataRow = ['juan@test.cl', 'Juan', 'dir 1', 'scl', '1234', '15000', '15000', 'lunes', 'transferencia'];
    const headerIndex = buildHeaderIndex(headerRow);
    const result = transformRow(dataRow, headerIndex, 1);
    expect(result.error).toBeNull();
    expect(result.cliente?.rut).toBeUndefined();
  });
});