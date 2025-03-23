import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.message}>Sayfa Bulunamadı</h2>
      <p>Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
      <Link href="/" style={styles.link}>Anasayfaya Dön</Link>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: "center",
    padding: "80px 20px",
    fontFamily: "sans-serif",
  },
  code: {
    fontSize: "72px",
    marginBottom: "20px",
    color: "#1890ff",
  },
  message: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  link: {
    marginTop: "20px",
    display: "inline-block",
    textDecoration: "none",
    color: "#0070f3",
    fontWeight: "bold",
  },
};
