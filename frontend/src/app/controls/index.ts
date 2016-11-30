import { StringControlComponent } from './base/stringControl/stringControl.component';
import { BooleanControlComponent } from './base/booleanControl/booleanControl.component';
import { NumberControlComponent } from './base/numberControl/numberControl.component';

export const defaultControls = {
  // Basic
  string: {
    control: StringControlComponent,
    nested: false,
  },
  boolean: {
    control: BooleanControlComponent,
    nested: false,
  },
  number: {
    control: NumberControlComponent,
    nested: false,
  },
};

export { ControlsModule } from './controls.module';