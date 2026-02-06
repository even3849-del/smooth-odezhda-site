import { StoreProvider } from "./store/StoreContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { FeaturedProducts } from "./components/FeaturedProducts";
import { PriceList } from "./components/PriceList";
import { Lookbook } from "./components/Lookbook";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonials";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";
import { SearchModal } from "./components/SearchModal";
import { FavoritesDrawer } from "./components/FavoritesDrawer";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { CartToast } from "./components/CartToast";

export function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <Hero />
        <Categories />
        <FeaturedProducts />
        <PriceList />
        <Lookbook />
        <About />
        <Testimonials />
        <Newsletter />
        <Footer />

        {/* Overlays */}
        <SearchModal />
        <FavoritesDrawer />
        <CartDrawer />
        <CheckoutModal />
        <CartToast />
      </div>
    </StoreProvider>
  );
}
