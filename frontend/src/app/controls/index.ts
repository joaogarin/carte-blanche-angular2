import { StringControlComponent } from './base/stringControl/stringControl.component.ts';

export const defaultControls = {
  // Basic
  string: {
    control: StringControlComponent,
    nested: false,
  },
};

export { ControlsModule } from './controls.module.ts';