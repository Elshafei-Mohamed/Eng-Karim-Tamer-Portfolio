import Link from "next/link";


export default function NotFound(): React.ReactElement {
  return (
    <main id="main-content" className="page-enter flex flex-1 items-center">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-32 lg:px-10">
        <p className="label-accent text-danger">
          SIGNAL LOST
        </p>
        <h1 className="mt-4 text-display text-primary">404</h1>
        <p className="mt-4 max-w-[52ch] text-body-lg text-secondary">
          This route isn&apos;t in the registry. The work is still where it
          always is.
        </p>
        <Link
          href="/#work"
          className="btn btn-solid mt-10"
        >
          RETURN TO WORK →
        </Link>
      </div>
    </main>
  );
}
