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
    <div className="categories">
      <div className="categories-container">
        <nav>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to={`/?category=${category.id}`}
                  className={`category-link ${currentCategory === category.id ? 'active' : ''}`}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-text">{category.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Categories;
