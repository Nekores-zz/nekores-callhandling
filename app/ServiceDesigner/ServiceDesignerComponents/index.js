import { createComponent } from './ServiceDesigner';
import { createServiceDesigner } from '../serviceDesigner';
export * from './ServiceDesigner';
export * from './TopPanel';
export * from './TabsPanel';
export * from './ToolsPanel';
export * from './Editor';
export * from './ServiceDesignerContent';
export const ServiceDesigner = createComponent({ createServiceDesigner });