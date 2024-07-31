import { Link } from "@remix-run/react";

export default function Fuga() {
  return (
    <div>
      <h1>fuga</h1>
      <ul>
        <li>
          <Link to="albums">albums</Link>
        </li>
      </ul>
    </div>
  );
}
