import { AccountMenu } from "@/components/blog/account-menu";
import { Footer } from "@/components/blog/footer";
import { BlogHeader } from "@/components/blog/header";
import { SearchArticle } from "@/components/blog/search-articles";
import { Suspense } from "react";

export default function BlogLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <BlogHeader className="sticky top-0 z-50 border-b bg-background">
        <div className="flex items-center gap-4">
          <SearchArticle />
          <Suspense fallback={(<div>Loading...</div>)}>
            <AccountMenu />
          </Suspense>
        </div>
      </BlogHeader>
      <main>
        {children}
      </main>
      <Footer className="border-t py-10" />
    </div>
  );
}
