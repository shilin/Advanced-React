import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "../components/User";

const Nav = () => (
  <NavStyles>
    <Link href="/me">
      <a>
        <User>
          {({ data: { me }}) => {
            if (me) {
              return <p>{me.name}</p>;
            }
            return null;
          }}
        </User>
      </a>
    </Link>
    <Link href="/items">
      <a>Shop</a>
    </Link>
    <Link href="/sell">
      <a>Sell</a>
    </Link>
    <Link href="/signup">
      <a>Signup</a>
    </Link>
    <Link href="/orders">
      <a>Orders</a>
    </Link>
    <Link href="/me">
      <a>Me</a>
    </Link>
  </NavStyles>
);

export default Nav;
