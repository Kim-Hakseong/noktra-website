import Link from "next/link";

export default function NotFound() {
  return (
    <section className="band band--hero">
      <div className="wrap band__in">
        <div className="t-label">404 / Not found</div>
        <h1 className="masthead__title" style={{ marginTop: 24 }}>
          No such ref.
        </h1>
        <p className="masthead__lead">
          The page you asked for is not in the index.
        </p>
        <div style={{ marginTop: 40 }}>
          <Link className="btn" href="/">
            Back to the index
          </Link>
        </div>
      </div>
    </section>
  );
}
