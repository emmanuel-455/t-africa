import { Link } from 'react-router-dom';

const EditorsPicks = ({ products }) => (
  <section>
    <h2 className="text-lg pl-3 rounded-sm py-1 font-bold bg-[#000] text-white mb-2">Editor's Picks</h2>
    <div className="flex space-x-4 overflow-x-auto">
      {products.map((product, index) => (
        <Link
          key={index}
          to={`/product/${product.id}`} // Link to the product details page
          className="w-[200px] bg-white flex flex-col flex-shrink-0 px-4 rounded-md"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <p className="font-semibold text-sm">{product.title}</p>
          <div className="flex flex-col justify-between">
            <p className="text-base text-black font-bold mt-1">₦{product.price}</p>
            <p className="text-green-500 font-medium text-sm">Handpicked for You</p>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default EditorsPicks;
