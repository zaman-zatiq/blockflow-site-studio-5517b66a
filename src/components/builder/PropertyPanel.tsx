import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ComponentData } from '@/types/builder';

interface PropertyPanelProps {
  selectedComponent: ComponentData | null;
  onUpdateComponent: (id: string, updates: Partial<ComponentData>) => void;
}

export const PropertyPanel = ({ selectedComponent, onUpdateComponent }: PropertyPanelProps) => {
  const updateProp = (key: string, value: any) => {
    if (!selectedComponent) return;
    
    onUpdateComponent(selectedComponent.id, {
      props: {
        ...selectedComponent.props,
        [key]: value
      }
    });
  };

  const updateNestedProp = (path: string[], value: any) => {
    if (!selectedComponent) return;
    
    const newProps = { ...selectedComponent.props };
    let current = newProps;
    
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) current[path[i]] = {};
      current = current[path[i]];
    }
    
    current[path[path.length - 1]] = value;
    
    onUpdateComponent(selectedComponent.id, { props: newProps });
  };

  if (!selectedComponent) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
          <h3 className="font-medium mb-2">No Component Selected</h3>
          <p className="text-sm">Select a component to edit its properties</p>
        </div>
      </div>
    );
  }

  const renderPropertyForm = () => {
    const { type, props } = selectedComponent;

    switch (type) {
      case 'navbar':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="brand">Brand Name</Label>
                <Input
                  id="brand"
                  value={props.brand || ''}
                  onChange={(e) => updateProp('brand', e.target.value)}
                  placeholder="Your Brand"
                />
              </div>
              
              <div>
                <Label htmlFor="bgColor">Background Color</Label>
                <Input
                  id="bgColor"
                  type="color"
                  value={props.bgColor || '#ffffff'}
                  onChange={(e) => updateProp('bgColor', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="textColor">Text Color</Label>
                <Input
                  id="textColor"
                  type="color"
                  value={props.textColor || '#374151'}
                  onChange={(e) => updateProp('textColor', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={props.title || ''}
                  onChange={(e) => updateProp('title', e.target.value)}
                  placeholder="Welcome to Our Store"
                />
              </div>
              
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={props.subtitle || ''}
                  onChange={(e) => updateProp('subtitle', e.target.value)}
                  placeholder="Discover amazing products"
                />
              </div>
              
              <div>
                <Label htmlFor="buttonText">Button Text</Label>
                <Input
                  id="buttonText"
                  value={props.buttonText || ''}
                  onChange={(e) => updateProp('buttonText', e.target.value)}
                  placeholder="Shop Now"
                />
              </div>
              
              <div>
                <Label htmlFor="bgColor">Background Color</Label>
                <Input
                  id="bgColor"
                  type="color"
                  value={props.bgColor || '#f3f4f6'}
                  onChange={(e) => updateProp('bgColor', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'product-grid':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="columns">Columns</Label>
                <Input
                  id="columns"
                  type="number"
                  min="1"
                  max="6"
                  value={props.columns || 3}
                  onChange={(e) => updateProp('columns', parseInt(e.target.value))}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showPrices"
                  checked={props.showPrices !== false}
                  onChange={(e) => updateProp('showPrices', e.target.checked)}
                />
                <Label htmlFor="showPrices">Show Prices</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="showRatings"
                  checked={props.showRatings !== false}
                  onChange={(e) => updateProp('showRatings', e.target.checked)}
                />
                <Label htmlFor="showRatings">Show Ratings</Label>
              </div>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={props.companyName || ''}
                  onChange={(e) => updateProp('companyName', e.target.value)}
                  placeholder="Your Company"
                />
              </div>
              
              <div>
                <Label htmlFor="bgColor">Background Color</Label>
                <Input
                  id="bgColor"
                  type="color"
                  value={props.bgColor || '#374151'}
                  onChange={(e) => updateProp('bgColor', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="textColor">Text Color</Label>
                <Input
                  id="textColor"
                  type="color"
                  value={props.textColor || '#ffffff'}
                  onChange={(e) => updateProp('textColor', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            <p>No properties available for this component type.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
          <Badge variant="secondary" className="text-xs">
            {selectedComponent.type}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">Component ID: {selectedComponent.id}</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Component Settings</CardTitle>
            </CardHeader>
            <CardContent>
              {renderPropertyForm()}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};