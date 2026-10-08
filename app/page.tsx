import ScrollVideo from "./components/ScrollVideo";
import SiteContent from "./components/SiteContent";
import { LanguageProvider } from "./context/LanguageContext";
import SkipLink from "./components/SkipLink";

export default function Home() {
  return <LanguageProvider><SkipLink /><main className="site-shell"><ScrollVideo /><SiteContent /></main></LanguageProvider>;
}
