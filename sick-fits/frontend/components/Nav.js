import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "../components/User";

const Nav = () => (
  <User>
    {({ data }) => (
      <NavStyles>
        <>
        <Link href="/items">
          <a>Shop</a>
        </Link>
        {console.log(1, data, 2)}
        </>
        {data.me && (
          <>
            <Link href="/me">
              <a>Account</a>
            </Link>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
          </>
        )}
        {!data.me && (
          <Link href="/signup">
            <a>Signup</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
