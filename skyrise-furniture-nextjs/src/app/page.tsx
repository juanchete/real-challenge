import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.hero__title}>Welcome to Skyrise Decor</h1>
          <p className={styles.hero__subtitle}>Discover our curated collection of modern furniture and home decor</p>
        </section>

        <section className={styles.products}>
          <div className={styles.products__container}>
            <h2 className={styles.products__title}>Featured Products</h2>
            <ProductGrid />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}