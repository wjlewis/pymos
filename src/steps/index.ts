import step1 from './step1';
import step2 from './step2';
import step3 from './step3';
import step4 from './step4';
import step5 from './step5';
import step6 from './step6';
import step7 from './step7';
import step8 from './step8';
import step9 from './step9';

export * as Locations from './locations';

export const steps: Step[] = [
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
  step8,
  step9,
];

export interface Step {
  section: React.FC;
  graphics: React.FC;
}
