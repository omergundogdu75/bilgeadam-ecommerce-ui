import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.code}>403</h1>
      <h2 style={styles.message}>Yetkisiz Erişim</h2>
      <p>Bu sayfayı görüntülemek için yetkiniz yok.</p>
      <Link href="/login" style={styles.link}>Giriş Yap</Link>
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
    color: "#ff4d4f",
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
