export interface ComponentData {
  id: string;
  type: string;
  props: Record<string, any>;
  position: {
    x: number;
    y: number;
  };
}

export interface ComponentTemplate {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<any>;
  description: string;
  defaultProps: Record<string, any>;
}

export interface CanvasComponent extends ComponentData {
  selected?: boolean;
}