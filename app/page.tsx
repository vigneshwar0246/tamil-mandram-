import ScrollVideo from "./components/ScrollVideo";
import SiteContent from "./components/SiteContent";
import { LanguageProvider } from "./context/LanguageContext";

export default function Home() {
  return <LanguageProvider><main className="site-shell"><ScrollVideo /><SiteContent /></main></LanguageProvider>;
}
