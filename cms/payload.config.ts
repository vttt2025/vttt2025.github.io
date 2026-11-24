import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

// Collections
import { TrkiTests } from './collections/TrkiTests';
import { TrkiQuestionBank } from './collections/TrkiQuestionBank';
import { Vocabularies } from './collections/Vocabularies';
import { VocabJars } from './collections/VocabJars';
import { GrammarLessons } from './collections/GrammarLessons';
import { TopicArticles } from './collections/TopicArticles';
import { ListeningLessons } from './collections/ListeningLessons';
import { SpeakingSets } from './collections/SpeakingSets';
import { WritingTasks } from './collections/WritingTasks';
import { ShopProducts } from './collections/ShopProducts';
import { Packages } from './collections/Packages';
import { BlogPosts } from './collections/BlogPosts';
import { Users } from './collections/Users';

// Globals
import { SiteSettings } from './globals/SiteSettings';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadSecret = process.env.PAYLOAD_SECRET;
if (!payloadSecret && process.env.NODE_ENV === 'production') {
  throw new Error('PAYLOAD_SECRET environment variable is required in production.');
}

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— RUSI TRKI Headless CMS',
      favicon: '/assets/rusi-logo.svg',
      ogImage: '/assets/og-preview.png',
    },
    theme: 'dark',
  },
  collections: [
    TrkiTests,
    TrkiQuestionBank,
    Vocabularies,
    VocabJars,
    GrammarLessons,
    TopicArticles,
    ListeningLessons,
    SpeakingSets,
    WritingTasks,
    ShopProducts,
    Packages,
    BlogPosts,
    Users,
  ],
  globals: [
    SiteSettings,
  ],
  editor: lexicalEditor({}),
  secret: payloadSecret || 'dev-only-insecure-payload-secret-do-not-use-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://postgres:postgres@127.0.0.1:54322/postgres',
    },
  }),
});
