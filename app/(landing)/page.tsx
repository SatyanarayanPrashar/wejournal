import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { Footer } from "./_components/footer";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

const MarketingPage = () => {
  return (
    <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
      <div className="flex flex-col items-center justify-center md:justify-start text-center">
        <Heading />
      </div>
      <Footer />
    </div>
  );
}

export default MarketingPage;