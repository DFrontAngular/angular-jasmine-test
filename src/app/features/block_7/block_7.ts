import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-block-7',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './block_7.html',
  styleUrl: './block_7.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class block_7 {

  readonly badExampleCode = `
export class PaymentComponent {

  getMessage(status: string, isAdmin: boolean): string {

    if (status === 'pending') {
      if (isAdmin) {
        return 'Admin reviewing payment';
      } else {
        return 'Payment pending approval';
      }
    }

    if (status === 'approved') {
      return 'Payment approved';
    }

    if (status === 'rejected') {
      return 'Payment rejected';
    }

    return 'Unknown status';
  }
}
`;

  readonly manyTestsExample = `
it('should return admin reviewing when pending and admin', () => {});
it('should return pending approval when pending and not admin', () => {});
it('should return approved', () => {});
it('should return rejected', () => {});
it('should return unknown', () => {});
`;

  readonly refactoredExample = `
type PaymentStatus = 'pending' | 'approved' | 'rejected';

const STATUS_MESSAGES: Record<PaymentStatus, string> = {
  pending: 'Payment pending approval',
  approved: 'Payment approved',
  rejected: 'Payment rejected'
};

export class PaymentComponent {

  getMessage(status: PaymentStatus, isAdmin: boolean): string {

    if (status === 'pending' && isAdmin) {
      return 'Admin reviewing payment';
    }

    return STATUS_MESSAGES[status] ?? 'Unknown status';
  }
}
`;

  readonly pureFunctionExample = `
export function getPaymentMessage(
  status: PaymentStatus,
  isAdmin: boolean
): string {

  if (status === 'pending' && isAdmin) {
    return 'Admin reviewing payment';
  }

  return STATUS_MESSAGES[status] ?? 'Unknown status';
}
`;

  readonly coverageConcept = `
Statements   → Líneas ejecutadas
Functions    → Funciones llamadas
Branches     → Condiciones evaluadas (if, switch, ternarios)
Lines        → Cobertura general
`;
}