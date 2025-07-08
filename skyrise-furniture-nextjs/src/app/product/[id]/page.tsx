import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductDetail from '@/components/ProductDetail/ProductDetail';
import { getProductById } from '@/lib/api';
import { SkeletonBox } from '@/components/Skeletons';
import styles from './page.module.css';

const SimilarProducts = dynamic(() => import('@/components/SimilarProducts/SimilarProducts'), {
  loading: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
      {[1, 2, 3, 4].map((i) => <SkeletonBox key={i} height={300} />)}
    </div>
  ),
});

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const product = await getProductById(id);
    
    return {
      title: `${product.title} - Skyrise Decor`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    };
  } catch {
    return {
      title: 'Product Not Found - Skyrise Decor',
      description: 'The product you are looking for could not be found.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  let product;
  
  try {
    product = await getProductById(id);
  } catch {
    notFound();
  }

  return (
    <main className={styles.productPage}>
      <Header />

      <section className={styles.productPage__content}>
        <ProductDetail product={product} />
      </section>

      <section className={styles.productPage__similarSection}>
        <div className={styles.productPage__similarContainer}>
          <h2 className={styles.productPage__similarTitle}>Similar Furnitures</h2>
          <SimilarProducts currentProductId={product.id} category={product.category} />
        </div>
      </section>

      <section className={styles.productPage__ctaSection}>
        <div className={styles.productPage__ctaContainer}>
          <div className={styles.productPage__ctaContent}>
            <span className={styles.productPage__ctaSubtitle}>Build custom furniture</span>
            <h2 className={styles.productPage__ctaTitle}>Craft Own Furniture</h2>
            <button className={styles.productPage__ctaButton}>Let&apos;s Talk!</button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}