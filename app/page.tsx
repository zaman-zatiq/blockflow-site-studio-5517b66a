'use client'

import { useState } from 'react';
import { DndContext, DragOverlay, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { ComponentLibrary } from '@/components/builder/ComponentLibrary';
import { Canvas } from '@/components/builder/Canvas';
import { PropertyPanel } from '@/components/builder/PropertyPanel';
import { Header } from '@/components/builder/Header';
import { ComponentData } from '@/types/builder';

export default function Home() {
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (!over || !active) {
      setActiveId(null);
      return;
    }

    if (over.id === 'canvas') {
      const newComponent: ComponentData = {
        id: `${active.id}-${Date.now()}`,
        type: active.id,
        props: {},
        position: { x: 0, y: components.length * 100 }
      };
      
      setComponents(prev => [...prev, newComponent]);
    }
    
    setActiveId(null);
  };

  const updateComponent = (id: string, updates: Partial<ComponentData>) => {
    setComponents(prev => 
      prev.map(comp => 
        comp.id === id ? { ...comp, ...updates } : comp
      )
    );
    
    if (selectedComponent?.id === id) {
      setSelectedComponent({ ...selectedComponent, ...updates });
    }
  };

  const deleteComponent = (id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="h-screen flex flex-col bg-gray-50">
        <Header />
        
        <div className="flex-1 flex overflow-hidden">
          <ComponentLibrary />
          
          <Canvas
            components={components}
            selectedComponent={selectedComponent}
            onSelectComponent={setSelectedComponent}
            onUpdateComponent={updateComponent}
            onDeleteComponent={deleteComponent}
          />
          
          <PropertyPanel
            selectedComponent={selectedComponent}
            onUpdateComponent={updateComponent}
          />
        </div>
        
        <DragOverlay>
          {activeId ? (
            <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-400 opacity-90">
              <div className="text-sm font-medium text-gray-700 capitalize">
                {activeId.replace('-', ' ')}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}