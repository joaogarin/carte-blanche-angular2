import { StringControlComponent } from './base/stringControl/stringControl.component.ts';
import { BooleanControlComponent } from './base/booleanControl/booleanControl.component.ts';

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
};

export { ControlsModule } from './controls.module.ts';