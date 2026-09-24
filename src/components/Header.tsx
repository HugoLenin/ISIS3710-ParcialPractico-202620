"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageContext";

// ssr: false para que se cargue solo en el navegador, donde existe el localStorage
const UserMenu = dynamic(() => import("./UserMenu"), { ssr: false });

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="flex justify-between items-center bg-white border-b border-slate-200 px-24 py-4">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl font-bold text-slate-900">{t("nav.brand")}</span>
        </Link>

        <Link href="/plans" className="text-lg font-semibold text-blue-700">
          {t("nav.explore")}
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1 text-sm font-semibold" role="group" aria-label="Idioma / Language">
          <button
            type="button"
            onClick={() => setLang("es")}
            aria-pressed={lang === "es"}
            className={`px-2 py-1 rounded-md ${lang === "es" ? "bg-blue-100 text-blue-700" : "text-slate-500"}`}
          >
            ES
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            className={`px-2 py-1 rounded-md ${lang === "en" ? "bg-blue-100 text-blue-700" : "text-slate-500"}`}
          >
            EN
          </button>
        </div>

        {/* key={pathname} hace que el menú se vuelva a cargar al cambiar de página,
            así se entera si el usuario acaba de iniciar sesión */}
        <UserMenu key={pathname} />
      </div>
    </header>
  );
}
