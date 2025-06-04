import { useDroppable } from '@dnd-kit/core';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { ComponentData } from '@/types/builder';
import { RenderComponent } from './RenderComponent';

interface CanvasProps {
  components: ComponentData[];
  selectedComponent: ComponentData | null;
  onSelectComponent: (component: ComponentData | null) => void;
  onUpdateComponent: (id: string, updates: Partial<ComponentData>) => void;
  onDeleteComponent: (id: string) => void;
}

export const Canvas = ({
  components,
  selectedComponent,
  onSelectComponent,
  onUpdateComponent,
  onDeleteComponent
}: CanvasProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Canvas</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">1920 × 1080</span>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div
          ref={setNodeRef}
          className={`
            min-h-full p-8 transition-colors duration-200
            ${isOver ? 'bg-blue-50 border-2 border-dashed border-blue-300' : 'bg-white'}
          `}
          style={{ minHeight: 'calc(100vh - 140px)' }}
          onClick={() => onSelectComponent(null)}
        >
          {components.length === 0 ? (
            <div className="flex items-center justify-center h-96 text-center">
              <div className="text-gray-400">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">Start Building</h3>
                <p className="text-sm">Drag components from the library to start creating your website</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {components.map((component) => (
                <div
                  key={component.id}
                  className={`
                    relative group rounded-lg transition-all duration-200
                    ${selectedComponent?.id === component.id 
                      ? 'ring-2 ring-blue-500 ring-opacity-50' 
                      : 'hover:ring-2 hover:ring-gray-300'
                    }
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectComponent(component);
                  }}
                >
                  <RenderComponent component={component} />
                  
                  {selectedComponent?.id === component.id && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteComponent(component.id);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};