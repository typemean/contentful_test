import { createClient } from 'contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function RecipeDetails({ recipe }) {
  console.log('first recipe', recipe);

  return (
    <div>
      <div>{documentToReactComponents(recipe.fields.method)}</div>
    </div>
  );
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: 'recipe' });

  const paths = res.items.map((recipe) => ({
    params: { slug: recipe.fields.slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const res = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug,
  });

  return { props: { recipe: res.items[0] } };
};
