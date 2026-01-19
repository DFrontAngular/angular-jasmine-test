import { MayusPipe } from "./mayus-pipe";
describe('MayusPipe', () => {
  let pipe: MayusPipe;

  beforeEach(() => {
    pipe = new MayusPipe(); // no estar constantemente probando pipes
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('debería convertir a mayúsculas', () => {
    const result = pipe.transform('hola');
    expect(result).toBe('HOLA');
  })
});

