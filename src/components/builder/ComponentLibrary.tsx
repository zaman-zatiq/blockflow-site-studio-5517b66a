import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Menu, LayoutGrid, ShoppingCart, FileText } from 'lucide-react';
import { ComponentTemplate } from '@/types/builder';

const componentTemplates: ComponentTemplate[] = [
  {
    id: 'navbar',
    name: 'Navigation Bar',
    category: 'Navigation',
    icon: Menu,
    description: 'Responsive navigation header',
    defaultProps: {
      brand: 'Your Brand',
      links: ['Home', 'Products', 'About', 'Contact'],
      bgColor: '#ffffff',
      textColor: '#374151'
    }
  },
  {
    id: 'hero',
    name: 'Hero Section',
    category: 'Headers',
    icon: LayoutGrid,
    description: 'Eye-catching hero section',
    defaultProps: {
      title: 'Welcome to Our Store',
      subtitle: 'Discover amazing products at great prices',
      buttonText: 'Shop Now',
      bgColor: '#f3f4f6',
      textColor: '#111827'
    }
  },
  {
    id: 'product-grid',
    name: 'Product Grid',
    category: 'E-commerce',
    icon: ShoppingCart,
    description: 'Grid layout for products',
    defaultProps: {
      columns: 3,
      showPrices: true,
      showRatings: true,
      products: [
        { id: 1, name: 'Product 1', price: '$29.99', image: '/placeholder.svg' },
        { id: 2, name: 'Product 2', price: '$39.99', image: '/placeholder.svg' },
        { id: 3, name: 'Product 3', price: '$19.99', image: '/placeholder.svg' }
      ]
    }
  },
  {
    id: 'footer',
    name: 'Footer',
    category: 'Navigation',
    icon: FileText,
    description: 'Site footer with links',
    defaultProps: {
      companyName: 'Your Company',
      links: [
        { section: 'Company', items: ['About', 'Careers', 'Contact'] },
        { section: 'Products', items: ['Shop', 'Categories', 'New Arrivals'] },
        { section: 'Support', items: ['Help', 'FAQ', 'Returns'] }
      ],
      bgColor: '#374151',
      textColor: '#ffffff'
    }
  }
];

const DraggableComponent = ({ template }: { template: ComponentTemplate }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: template.id,
  });

  const Icon = template.icon;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        p-4 bg-white rounded-lg border border-gray-200 cursor-grab active:cursor-grabbing
        hover:shadow-md transition-all duration-200 group
        ${isDragging ? 'opacity-50 scale-95' : 'hover:scale-105'}
      `}
    >
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
          <Icon size={16} className="text-blue-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
          <Badge variant="secondary" className="text-xs mt-1">
            {template.category}
          </Badge>
        </div>
      </div>
      <p className="text-xs text-gray-500">{template.description}</p>
    </div>
  );
};

export const ComponentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...new Set(componentTemplates.map(t => t.category))];
  
  const filteredTemplates = componentTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Components</h2>
        
        <Input
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
        />
        
        <div className="flex flex-wrap gap-1">
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className="cursor-pointer text-xs"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {filteredTemplates.map(template => (
            <DraggableComponent key={template.id} template={template} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};