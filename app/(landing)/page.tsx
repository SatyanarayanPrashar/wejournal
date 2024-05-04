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
      <div className="flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Heading />
        <Heroes />
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
        <stripe-pricing-table pricing-table-id="prctbl_1PCli6SBXOKMwIx1g61R1FWm"
          publishable-key="pk_test_51PClCsSBXOKMwIx17TcAAmbDrdqkNYzjSIUK8sZsr4EN1x6jV23rXia8ekbwC3SDUhOrCPznQU6VZ4O5mhO6VS6F00MwUyjHzb">
        </stripe-pricing-table>
      </div>
      <Footer />
    </div>
  );
}

export default MarketingPage;