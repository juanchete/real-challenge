import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Skyrise Decor - Product Details</h1>
        <p>Welcome to Skyrise Decor Next.js Application</p>
        
        <div className={styles.productLinks}>
          <h2>Sample Products:</h2>
          <ul>
            <li>
              <Link href="/product/1">Fjallraven - Foldsack No. 1 Backpack</Link>
            </li>
            <li>
              <Link href="/product/2">Mens Casual Premium Slim Fit T-Shirts</Link>
            </li>
            <li>
              <Link href="/product/3">Mens Cotton Jacket</Link>
            </li>
            <li>
              <Link href="/product/4">Mens Casual Slim Fit</Link>
            </li>
          </ul>
        </div>

        <div className={styles.info}>
          <p>This is the Next.js product detail application with:</p>
          <ul>
            <li>Server-side rendering (SSR)</li>
            <li>Dynamic routing</li>
            <li>Zustand state management</li>
            <li>BEM CSS methodology</li>
            <li>Inter font</li>
          </ul>
        </div>
      </main>
    </div>
  );
}