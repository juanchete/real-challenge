import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductDetail from '@/components/ProductDetail/ProductDetail';
import SimilarProducts from '@/components/SimilarProducts/SimilarProducts';
import { getProductById } from '@/lib/api';
import styles from './page.module.css';

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
      <nav className={styles.productPage__nav}>
        <div className={styles.productPage__navContainer}>
          <Link href="http://localhost:4200" className={styles.productPage__logo}>
            <span className={styles.productPage__logoText}>skyrise</span>
            <span className={styles.productPage__logoAccent}>decor</span>
          </Link>
          <button className={styles.productPage__cartButton}>
            Let&apos;s Talk!
          </button>
        </div>
      </nav>

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

      <footer className={styles.productPage__footer}>
        <div className={styles.productPage__footerContainer}>
          <div className={styles.productPage__footerContent}>
            <p className={styles.productPage__footerCopyright}>
              ©2023. All right reserved.
            </p>
            <p className={styles.productPage__footerBrand}>
              BEATRIZ DIGITAL
            </p>
            <div className={styles.productPage__footerLinks}>
              <a href="#" className={styles.productPage__footerLink}>Facebook</a>
              <a href="#" className={styles.productPage__footerLink}>Instagram</a>
              <a href="#" className={styles.productPage__footerLink}>Twitter</a>
              <a href="#" className={styles.productPage__footerLink}>LinkedIn</a>
            </div>
            <address className={styles.productPage__footerAddress}>
              36 East 73th street<br />
              NEW YORK, NY
            </address>
          </div>
        </div>
      </footer>
    </main>
  );
}