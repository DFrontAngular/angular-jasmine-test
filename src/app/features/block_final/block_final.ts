import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-block-final',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './block_final.html',
  styleUrl: './block_final.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockFinal {
  protected readonly summaryPoints = [
    'Testea comportamiento observable, no detalles internos de Angular.',
    'Prioriza integración desde la UI cuando quieras validar valor real para el usuario.',
    'Usa unit tests de forma selectiva para lógica pura, servicios y casos muy acotados.',
    'Si un test es frágil o cuesta más mantenerlo que el código, probablemente sobra.'
  ];

  protected readonly practicalDecisions = [
    {
      title: 'Empieza por lo visible',
      description: 'Comprueba lo que aparece en pantalla, el flujo que sigue el usuario y el estado final.'
    },
    {
      title: 'Elige pocos tests con mucho valor',
      description: 'Un test que protege un flujo clave vale más que varios tests centrados en implementación.'
    },
    {
      title: 'Haz explícita la intención',
      description: 'Usa selectores estables como data-testid y nombres de spec que expliquen el comportamiento esperado.'
    }
  ];

  protected readonly antiPatterns = [
    'Testear HTML estático o getters triviales solo por subir coverage.',
    'Acoplar el test a selectores frágiles o a la estructura exacta del DOM.',
    'Validar métodos privados en lugar del resultado visible para el usuario.'
  ];

  protected readonly finalChecklist = [
    '¿Estoy validando algo que realmente importa al usuario?',
    '¿El test fallaría ante una regresión funcional real?',
    '¿El selector es estable y semántico?',
    '¿El nombre del test explica el comportamiento esperado?'
  ];

  protected readonly finalRule =
    'Testea comportamientos, no estructuras. Testea valor, no framework.';
}