export function Footer() {
  return (
    <footer className="grid h-36 place-items-center bg-violet-600 text-center text-white">
      <div>
        <p className="mb-6">
          Check out the{" "}
          <a
            href="https://github.com/mauriciorobayo/colombian-holidays"
            className="underline"
          >
            colombian-holidays
          </a>{" "}
          npm package to calculate colombian holidays.
        </p>
        <p>
          This is an{" "}
          <a
            href="https://github.com/mauriciorobayo/is-colombian-holiday"
            className="underline"
          >
            open source
          </a>{" "}
          project.
        </p>
      </div>
    </footer>
  );
}
