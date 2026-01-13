import { Link, useLocation } from 'react-router-dom';

function Categories({ categories }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = (searchParams.get('category') || 'all').toLowerCase();

  const backendCategories = Array.isArray(categories) ? categories : [];

  // Always use categories from the backend, with a synthetic "All" option
  const allCategories = [{ id: 'all', name: 'All' }, ...backendCategories];

  return (
    <div className="sticky top-16 z-5 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="overflow-x-auto px-4">
        <nav>
          <ul className="flex gap-2 py-2 min-w-max">
            {allCategories.map((category) => {
              const value = category.id === 'all'
                ? 'all'
                : String(category.name || '').toLowerCase();
              const isActive = currentCategory === value;
              return (
                <li key={category.id}>
                  <Link
                    to={`/?category=${encodeURIComponent(value)}`}
                    className={
                      `inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border transition-all whitespace-nowrap ` +
                      (isActive
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900')
                    }
                  >
                    {category.icon && <span>{category.icon}</span>}
                    <span className="capitalize">{category.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Categories;
