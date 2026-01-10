import { Link, useLocation } from 'react-router-dom';

const categories = [
  { 
    id: 'all', 
    name: 'All',
    icon: '🎬'
  },
  { 
    id: 'action', 
    name: 'Action',
    icon: '💥'
  },
  { 
    id: 'adventure', 
    name: 'Adventure',
    icon: '🌍'
  },
  { 
    id: 'comedy', 
    name: 'Comedy',
    icon: '😂'
  },
  { 
    id: 'drama', 
    name: 'Drama',
    icon: '🎭'
  },
  { 
    id: 'horror', 
    name: 'Horror',
    icon: '👻'
  },
  { 
    id: 'romance', 
    name: 'Romance',
    icon: '💖'
  },
  { 
    id: 'sci-fi', 
    name: 'Sci-Fi',
    icon: '🚀'
  },
  { 
    id: 'thriller', 
    name: 'Thriller',
    icon: '🔪'
  }
 
];

function Categories() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category') || 'all';

  return (
    <div className="sticky top-16 z-5 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
      <div className="overflow-x-auto px-4">
        <nav>
          <ul className="flex gap-2 py-2 min-w-max">
            {categories.map((category) => {
              const isActive = currentCategory === category.id;
              return (
                <li key={category.id}>
                  <Link
                    to={`/?category=${category.id}`}
                    className={
                      `inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border transition-all whitespace-nowrap ` +
                      (isActive
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900')
                    }
                  >
                    <span>{category.icon}</span>
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
