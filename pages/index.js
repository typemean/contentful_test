import { createClient } from 'contentful';
import RecipeCard from '../components/RecipeCard';

export default function Recipes({ recipes }) {
  console.log('recipes', recipes);
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  console.log('space', process.env.CONTENTFUL_SPACE_ID);
  console.log('access', process.env.CONTENTFUL_ACCESS_KEY);

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: 'recipe' });

  return {
    props: {
      recipes: res.items,
    },
  };
}
