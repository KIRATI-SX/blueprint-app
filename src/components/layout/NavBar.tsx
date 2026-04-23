import logo from "../../assets/icons/logo.svg";
import Button from "../common/Button";

export default function NavBar() {
const isLoggedIn = false;

  return (
    <header className="h-[80px] w-full border-b border-brown-300 px-[120px] py-[16px] bg-brown-100">
      <nav className="flex h-full items-center justify-between" aria-label="Main navigation">
        <a href="/" aria-label="Homepage">
          <img src={logo} alt="hh logo" className="h-12 w-12" />
        </a>

        <section className="flex items-center gap-3">
          {isLoggedIn ? (<>
          </>
          ) : (
            <>
            <Button variant="outline" className="w-auto px-8">
              Log in
            </Button>
            <Button variant="solid" className="w-auto px-8">
              Sign up
            </Button>
            </>
          )}
        </section>
      </nav>
    </header>
  );
}
