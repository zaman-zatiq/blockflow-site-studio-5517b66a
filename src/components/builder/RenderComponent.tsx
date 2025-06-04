import { ComponentData } from '@/types/builder';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RenderComponentProps {
  component: ComponentData;
}

export const RenderComponent = ({ component }: RenderComponentProps) => {
  const { type, props } = component;

  switch (type) {
    case 'navbar':
      return (
        <nav 
          className="w-full p-4 shadow-sm"
          style={{ backgroundColor: props.bgColor || '#ffffff', color: props.textColor || '#374151' }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-xl font-bold">{props.brand || 'Your Brand'}</div>
            <div className="hidden md:flex space-x-6">
              {(props.links || ['Home', 'Products', 'About', 'Contact']).map((link: string, index: number) => (
                <a key={index} href="#" className="hover:opacity-75 transition-opacity">
                  {link}
                </a>
              ))}
            </div>
            <Button size="sm">Get Started</Button>
          </div>
        </nav>
      );

    case 'hero':
      return (
        <section 
          className="w-full py-20 px-4"
          style={{ backgroundColor: props.bgColor || '#f3f4f6', color: props.textColor || '#111827' }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              {props.title || 'Welcome to Our Store'}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {props.subtitle || 'Discover amazing products at great prices'}
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              {props.buttonText || 'Shop Now'}
            </Button>
          </div>
        </section>
      );

    case 'product-grid':
      const products = props.products || [
        { id: 1, name: 'Product 1', price: '$29.99', image: '/placeholder.svg' },
        { id: 2, name: 'Product 2', price: '$39.99', image: '/placeholder.svg' },
        { id: 3, name: 'Product 3', price: '$19.99', image: '/placeholder.svg' }
      ];
      
      return (
        <section className="w-full py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div 
              className="grid gap-6"
              style={{ gridTemplateColumns: `repeat(${props.columns || 3}, 1fr)` }}
            >
              {products.map((product: any) => (
                <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-400">Product Image</span>
                  </div>
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  {props.showPrices && (
                    <p className="text-lg font-bold text-green-600 mb-2">{product.price}</p>
                  )}
                  {props.showRatings && (
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {'★★★★☆'}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">(4.0)</span>
                    </div>
                  )}
                  <Button className="w-full">Add to Cart</Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );

    case 'footer':
      return (
        <footer 
          className="w-full py-12 px-4"
          style={{ backgroundColor: props.bgColor || '#374151', color: props.textColor || '#ffffff' }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">{props.companyName || 'Your Company'}</h3>
                <p className="text-gray-300">
                  Building amazing e-commerce experiences for businesses worldwide.
                </p>
              </div>
              {(props.links || [
                { section: 'Company', items: ['About', 'Careers', 'Contact'] },
                { section: 'Products', items: ['Shop', 'Categories', 'New Arrivals'] },
                { section: 'Support', items: ['Help', 'FAQ', 'Returns'] }
              ]).map((section: any, index: number) => (
                <div key={index}>
                  <h4 className="font-semibold mb-4">{section.section}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item: string, itemIndex: number) => (
                      <li key={itemIndex}>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
              <p>&copy; 2024 {props.companyName || 'Your Company'}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      );

    default:
      return (
        <div className="p-8 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 text-center">
          <p className="text-gray-500">Unknown component type: {type}</p>
        </div>
      );
  }
};