import { proxy as localeProxy } from "./src/lib/localeProxy";

export function proxy(request) {
  return localeProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|.*\\..*).*)"],
};
